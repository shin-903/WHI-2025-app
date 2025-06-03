"use client";
import { useEffect } from "react";
import useSWR from "swr";
import * as t from "io-ts";
import { isLeft } from "fp-ts/Either";
import { EmployeeListItem } from "./EmployeeListItem";
import { Employee, EmployeeT } from "../models/Employee";

export type EmployeesContainerProps = {
  filters: {
    name?: string;
    position?: string;
    skills?: string;
  };
};

const EmployeesT = t.array(EmployeeT);

const employeesFetcher = async (url: string): Promise<Employee[]> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch employees at ${url}`);
  }
  const body = await response.json();
  const decoded = EmployeesT.decode(body);
  if (isLeft(decoded)) {
    throw new Error(`Failed to decode employees ${JSON.stringify(body)}`);
  }
  return decoded.right;
};

export function EmployeeListContainer({ filters }: EmployeesContainerProps) {
  const queryParams = new URLSearchParams();
  if (filters.name) queryParams.append("name", filters.name);
  if (filters.position) queryParams.append("position", filters.position);
  if (filters.skills) queryParams.append("skills", filters.skills);

  const queryString = queryParams.toString();
  const url = `/api/employees${queryString ? `?${queryString}` : ""}`;

  const { data, error, isLoading } = useSWR<Employee[], Error>(
    url,
    employeesFetcher
  );

  useEffect(() => {
    if (error != null) {
      console.error(`Failed to fetch employees with filters`, error);
    }
  }, [error, filters]);

  if (data != null) {
    return data.map((employee) => (
      <EmployeeListItem employee={employee} key={employee.id} />
    ));
  }
  if (isLoading) {
    return <p>Loading employees...</p>;
  }
}
