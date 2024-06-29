/**
 * @file CreateEmployeeUseCase.ts
 * @description Defines the CreateEmployeeUseCase class responsible for creating an employee and optionally a seller.
 */

import { IEmployeeRepository } from "@modules/staff/domain/repositories/IEmployeeRepository";
import { ISellerRepository } from "@modules/staff/domain/repositories/ISellerRepository";
import { IBranchStoreRepository } from "@modules/store/domain/repositories/IBranchStoreRepository";
import { AppError } from "@shared/errors/AppError";

/**
 * Interface representing the request object for creating an employee.
 */
export interface IEmployeeRequest {
  name: string;
  lastName: string;
  DNI: number;
  branchStore: string;
  position: string;
}

/**
 * Interface defining the contract for the create employee use case.
 */
export interface ICreateEmployeeUseCase {
  /**
   * Executes the create employee use case.
   *
   * @param {IEmployeeRequest} employeeData - The data of the employee to be created.
   * @returns {Promise<void>} A promise that resolves when the employee is created.
   * @throws {AppError} Throws an application-specific error if the creation fails.
   */
  execute(employeeData: IEmployeeRequest): Promise<void>;
}

/**
 * Class implementing the create employee use case.
 */
export class CreateEmployeeUseCase implements ICreateEmployeeUseCase {
  /**
   * Creates an instance of CreateEmployeeUseCase.
   *
   * @param {IEmployeeRepository} employeeRepository - The repository for employee operations.
   * @param {ISellerRepository} sellerRepository - The repository for seller operations.
   * @param {IBranchStoreRepository} branchStoreRepository - The repository for branch store operations.
   */
  constructor(
    private readonly employeeRepository: IEmployeeRepository,
    private readonly sellerRepository: ISellerRepository,
    private readonly branchStoreRepository: IBranchStoreRepository
  ) {}

  /**
   * Executes the create employee use case.
   *
   * @param {IEmployeeRequest} employeeData - The data of the employee to be created.
   * @returns {Promise<void>} A promise that resolves when the employee is created.
   * @throws {AppError} Throws an application-specific error if the creation fails.
   */
  async execute(employeeData: IEmployeeRequest): Promise<void> {
    const { name, lastName, DNI, branchStore, position } = employeeData || {};

    // Parse Branch Store ID
    const parsedBranchStoreID =
      await this.branchStoreRepository.checkAndParseID(branchStore);

    // Check if branch store exists
    const branchStoreExist =
      await this.branchStoreRepository.checkIfBranchStoreExist(
        parsedBranchStoreID
      );

    if (!branchStoreExist) {
      throw new AppError("Branch Store not found", 404);
    }

    // Check if employee already exists
    const employeeExist = await this.employeeRepository.employeeExist(DNI);
    if (employeeExist) {
      throw new AppError("Employee already exists", 400);
    }

    // Create employee
    const createEmployee = await this.employeeRepository.createEmployee({
      name,
      lastName,
      DNI,
      branchStore: parsedBranchStoreID,
      position,
    });

    // Create seller if position is "seller"
    if (position === "seller") {
      await this.sellerRepository.createSeller(createEmployee._id);
    }

    // Save employee
    await this.employeeRepository.saveEmployee(createEmployee);
  }
}
