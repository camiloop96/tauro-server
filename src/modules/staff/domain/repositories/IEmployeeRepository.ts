/**
 * @file IEmployeeRepository.ts
 * @description Interface defining the contract for employee repository methods. Provides methods for creating, retrieving, and checking the existence of employees in the database.
 */

import { Types, Document } from "mongoose";
import { Employee } from "../entities/Employee";

/**
 * Interface representing the employee repository.
 * Defines methods for interacting with employee data.
 */
export interface IEmployeeRepository {
  /**
   * Creates a new employee in the repository.
   *
   * @param {Employee} employee - The employee entity to create.
   * @returns {Promise<Document>} A promise that resolves to the created employee document.
   */
  createEmployee(employee: Employee): Promise<Document>;

  /**
   * Retrieves an employee by their ID.
   *
   * @param {Types.ObjectId} id - The ID of the employee to retrieve.
   * @returns {Promise<Types.ObjectId>} A promise that resolves to the ID of the employee.
   */
  getEmployeeById(id: Types.ObjectId): Promise<Types.ObjectId>;

  /**
   * Checks if an employee exists by their ID.
   *
   * @param {number} id - The ID of the employee to check.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the employee exists.
   */
  employeeExist(id: number): Promise<boolean>;

  /**
   * Saves an employee document.
   *
   * @param {Document} employee - The employee document to save.
   * @returns {Promise<void>} A promise that resolves when the employee document is saved.
   */
  saveEmployee(employee: Document): Promise<void>;

  /**
   * Checks if an employee exists by their DNI (National Identification Document).
   *
   * @param {number} DNI - The DNI of the employee to check.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the employee exists.
   */
  employeeExistByDNI(DNI: number): Promise<boolean>;

  /**
   * Retrieves the details of an employee by their ID.
   *
   * @param {Types.ObjectId} id - The ID of the employee to retrieve details for.
   * @returns {Promise<Employee>} A promise that resolves to the employee entity.
   */
  getEmployeeDetail(id: Types.ObjectId): Promise<Employee>;
}
