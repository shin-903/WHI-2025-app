import { Employee, NewEmployee } from "./Employee";

export interface EmployeeDatabase {
  getEmployee(id: string): Promise<Employee | undefined>;
  getEmployees(filters: EmployeeFilters): Promise<Employee[]>;
  addEmployee(employee: NewEmployee): Promise<void>
}

export interface EmployeeFilters {
  name?: string;
  position?: string;
  skills?: string;
    addEmployee(employee: NewEmployee): Promise<void>
}
