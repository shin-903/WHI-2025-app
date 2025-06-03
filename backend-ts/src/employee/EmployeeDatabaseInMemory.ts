import { EmployeeDatabase, EmployeeFilters } from "./EmployeeDatabase";
import { Employee, NewEmployee } from "./Employee";

export class EmployeeDatabaseInMemory implements EmployeeDatabase {
  private employees: Map<string, Employee>;

  constructor() {
    this.employees = new Map<string, Employee>();
    this.employees.set("1", {
      id: "1",
      name: "Jane Doe",
      age: 22,
      position: "Software Engineer",
      skills: "JavaScript, TypeScript",
    });
    this.employees.set("2", {
      id: "2",
      name: "John Smith",
      age: 28,
      position: "Data Scientist",
      skills: "Python, Ruby",
    });
    this.employees.set("3", {
      id: "3",
      name: "山田 太郎",
      age: 27,
      position: "Web Developer",
      skills: "HTML, CSS, JavaScript",
    });
  }

  async getEmployee(id: string): Promise<Employee | undefined> {
    return this.employees.get(id);
  }

  async getEmployees(filters: EmployeeFilters): Promise<Employee[]> {
    const employees = Array.from(this.employees.values());

    if (!filters.name && !filters.position && !filters.skills) {
      return employees;
    }

    return employees.filter((employee) => {
      if (filters.name && employee.name !== filters.name) {
        return false;
      }

      if (
        filters.position &&
        (!employee.position || employee.position !== filters.position)
      ) {
        return false;
      }

      if (
        filters.skills &&
        (!employee.skills || !employee.skills.includes(filters.skills))
      ) {
        return false;
      }

      return true;
    });
  }

    async addEmployee(employee: NewEmployee): Promise<void> {
        console.log("test");
    }
}
