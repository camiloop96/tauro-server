"use strict";
/**
 * @file Employee.ts
 * @description Defines the Employee class representing an employee entity.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
/**
 * Class representing an employee.
 */
class Employee {
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
    constructor(name, lastName, DNI, branchStore, position, _id) {
        this.name = name;
        this.lastName = lastName;
        this.DNI = DNI;
        this.branchStore = branchStore;
        this.position = position;
        this._id = _id;
    }
}
exports.Employee = Employee;
