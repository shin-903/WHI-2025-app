import { Employee, NewEmployee } from "./Employee";

export interface EmployeeDatabase {
    getEmployee(id: string): Promise<Employee | undefined>
    getEmployees(filterText: string): Promise<Employee[]>
    addEmployee(employee: NewEmployee): Promise<void>
}
