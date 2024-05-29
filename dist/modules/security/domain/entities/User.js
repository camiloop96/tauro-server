"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(_id, employee, role, username, password) {
        this._id = _id;
        this.employee = employee;
        this.role = role;
        this.username = username;
        this.password = password;
    }
}
exports.User = User;
