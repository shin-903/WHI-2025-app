import * as t from "io-ts";

const RequiredFields = t.type({
  id: t.string,
  name: t.string,
  age: t.number,
});

const OptionalFields = t.partial({
  position: t.string,
  skills: t.string,
});

export const EmployeeT = t.intersection([RequiredFields, OptionalFields]);

export type Employee = t.TypeOf<typeof EmployeeT>;
