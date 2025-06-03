import { DynamoDBClient, GetItemCommand, GetItemCommandInput, PutItemCommand, PutItemCommandInput, ScanCommand, ScanCommandInput } from "@aws-sdk/client-dynamodb";
import { isLeft } from "fp-ts/Either";
import { EmployeeDatabase, EmployeeFilters } from "./EmployeeDatabase";
import { Employee, EmployeeT, NewEmployee } from "./Employee";
import { UUID, randomUUID } from "crypto";

export class EmployeeDatabaseDynamoDB implements EmployeeDatabase {
  private client: DynamoDBClient;
  private tableName: string;

  constructor(client: DynamoDBClient, tableName: string) {
    this.client = client;
    this.tableName = tableName;
  }

  async getEmployee(id: string): Promise<Employee | undefined> {
    const input: GetItemCommandInput = {
      TableName: this.tableName,
      Key: {
        id: { S: id },
      },
    };
    const output = await this.client.send(new GetItemCommand(input));
    const item = output.Item;
    if (item == null) {
      return;
    }
    const employee = {
      id: id,
      name: item["name"].S,
      age: mapNullable(item["age"].N, (value) => parseInt(value, 10)),
      ...(item["position"] && { position: item["position"].S }),
      ...(item["skills"] && { skills: item["skills"].S }),
    };
    const decoded = EmployeeT.decode(employee);
    if (isLeft(decoded)) {
      throw new Error(
        `Employee ${id} is missing some fields. ${JSON.stringify(employee)}`
      );
    } else {
      return decoded.right;
    }
  }

  async getEmployees(filters: EmployeeFilters): Promise<Employee[]> {
    const input: ScanCommandInput = {
      TableName: this.tableName,
    };
    const output = await this.client.send(new ScanCommand(input));
    const items = output.Items;
    if (items == null) {
      return [];
    }
    return items
      .filter((item) => {
        if (filters.name && item["name"].S !== filters.name) {
          return false;
        }

        if (
          filters.position &&
          (!item["position"] || item["position"].S !== filters.position)
        ) {
          return false;
        }

        if (
          filters.skills &&
          (!item["skills"] ||
            (item["skills"].S && item["skills"].S.includes(filters.skills)))
        ) {
          return false;
        }

        return true;
      })
      .map((item) => {
        const employee = {
          id: item["id"].S,
          name: item["name"].S,
          age: mapNullable(item["age"].N, (value) => parseInt(value, 10)),
          ...(item["position"] && { position: item["position"].S }),
          ...(item["skills"] && { skills: item["skills"].S }),
        };
        return employee;
      })
      .flatMap((employee) => {
        const decoded = EmployeeT.decode(employee);
        if (isLeft(decoded)) {
          console.error(
            `Employee ${
              employee.id
            } is missing some fields and skipped. ${JSON.stringify(employee)}`
          );
          return [];
        } else {
          return [decoded.right];
        }
      });
  }

    async addEmployee(employee: NewEmployee): Promise<void> {
        const newId = randomUUID();

        const input: PutItemCommandInput = {
            TableName: this.tableName,
            Item: {
                //一番大きいidをとってくる
                id: { S: newId.toString() },
                name: { S: employee.name },
                age: { N: employee.age.toString() },
            },
        };
        await this.client.send(new PutItemCommand(input));
    }
}

function mapNullable<T, U>(
  value: T | null | undefined,
  mapper: (value: T) => U
): U | undefined {
  if (value != null) {
    return mapper(value);
  }
}
