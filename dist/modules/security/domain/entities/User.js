"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(employee, role, credential, _id) {
        this.employee = employee;
        this.role = role;
        this.credential = credential;
        this._id = _id;
    }
}
exports.User = User;
