import * as t from "io-ts";

export const EmployeeT = t.intersection([
  t.type({
    id: t.string,
    name: t.string,
    age: t.number,
  }),
  t.partial({
    position: t.string,
    skills: t.string,
  }),
]);

export type Employee = t.TypeOf<typeof EmployeeT>;
