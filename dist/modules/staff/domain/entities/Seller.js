"use strict";
/**
 * @file Seller.ts
 * @description Defines the Seller class representing a seller entity.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Seller = void 0;
/**
 * Class representing a seller.
 */
class Seller {
    /**
     * Creates an instance of Seller.
     *
     * @param {Types.ObjectId} employee - The ID of the employee associated with the seller.
     * @param {boolean} [active] - Optional: Whether the seller is active.
     * @param {Types.ObjectId} [_id] - Optional: The ID of the seller.
     */
    constructor(employee, active, _id) {
        this.employee = employee;
        this.active = active;
        this._id = _id;
    }
}
exports.Seller = Seller;
