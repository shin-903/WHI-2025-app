import { Employee } from "./Employee";

export interface EmployeeDatabase {
  getEmployee(id: string): Promise<Employee | undefined>;
  getEmployees(filters: EmployeeFilters): Promise<Employee[]>;
}

export interface EmployeeFilters {
  name?: string;
  position?: string;
  skills?: string;
}
