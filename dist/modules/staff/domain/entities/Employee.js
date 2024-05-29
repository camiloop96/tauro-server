"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
class Employee {
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
