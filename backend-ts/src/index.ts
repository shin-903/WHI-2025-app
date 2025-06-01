import express, { Request, Response } from "express";
import { EmployeeDatabaseInMemory } from "./employee/EmployeeDatabaseInMemory";
import { EmployeeFilters } from "./employee/EmployeeDatabase";

const app = express();
const port = process.env.PORT ?? 8080;
const database = new EmployeeDatabaseInMemory();

app.get("/api/employees", async (req: Request, res: Response) => {
  try {
    const filters: EmployeeFilters = {};

    if (req.query.name && typeof req.query.name === "string") {
      filters.name = req.query.name;
    }

    if (req.query.position && typeof req.query.position === "string") {
      filters.position = req.query.position;
    }

    if (req.query.skills && typeof req.query.skills === "string") {
      filters.skills = req.query.skills;
    }

    const employees = await database.getEmployees(filters);
    res.status(200).send(JSON.stringify(employees));
  } catch (e) {
    console.error("Failed to load the users with filters.", e);
    res.status(500).send();
  }
});

app.get("/api/employees/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const employee = await database.getEmployee(userId);
    if (employee == undefined) {
      res.status(404).send();
      return;
    }
    res.status(200).send(JSON.stringify(employee));
  } catch (e) {
    console.error(`Failed to load the user ${userId}.`, e);
    res.status(500).send();
  }
});

app.listen(port, () => {
  console.log(`App listening on the port ${port}`);
});
