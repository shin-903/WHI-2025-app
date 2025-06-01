import * as t from 'io-ts';

export const EmployeeT = t.type({
    id: t.string,
    name: t.string,
    age: t.number,
});

export const newEmployeeT = t.type({
    name: t.string,
    age: t.number,
});

export type Employee = t.TypeOf<typeof EmployeeT>;
export type NewEmployee = t.TypeOf<typeof newEmployeeT>;