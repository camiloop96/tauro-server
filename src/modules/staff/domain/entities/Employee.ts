/**
 * @file Employee.ts
 * @description Defines the Employee class representing an employee entity.
 */

import { Types } from "mongoose";

/**
 * Class representing an employee.
 */
export class Employee {
  /**
   * Creates an instance of Employee.
   *
   * @param {string} name - The name of the employee.
   * @param {string} lastName - The last name of the employee.
   * @param {number} DNI - The DNI (National Identification Document) number of the employee.
   * @param {Types.ObjectId} branchStore - The ID of the branch store where the employee works.
   * @param {string} position - The position or role of the employee.
   * @param {Types.ObjectId} [_id] - Optional: The ID of the employee.
   */
  constructor(
    public name: string,
    public lastName: string,
    public DNI: number,
    public branchStore: Types.ObjectId,
    public position: string,
    public _id?: Types.ObjectId
  ) {}
}
