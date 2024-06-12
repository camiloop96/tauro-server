import { IEmployeeRepository } from "@modules/staff/domain/repositories/IEmployeeRepository";
import { ISellerRepository } from "@modules/staff/domain/repositories/ISellerRepository";
import { IBranchStoreRepository } from "@modules/store/domain/repositories/IBranchStoreRepository";
import { AppError } from "@shared/errors/AppError";
import { Types } from "mongoose";

interface IEmployeeRequest {
  name: string;
  lastName: string;
  DNI: number;
  branchStore: string;
  position: string;
}

export interface ICreateEmployeeUseCase {
  execute(employeeData: IEmployeeRequest): Promise<void>;
}

export class CreateEmployeeUseCase implements ICreateEmployeeUseCase {
  constructor(
    private readonly employeeRepository: IEmployeeRepository,
    private readonly sellerRepository: ISellerRepository,
    private readonly branchStoreRepository: IBranchStoreRepository
  ) {}

  async execute(employeeData: IEmployeeRequest): Promise<void> {
    const { name, lastName, DNI, branchStore, position } = employeeData || {};

    // Parse Branch Store ID
    const parsedBranchStoreID =
      await this.branchStoreRepository.checkAndParseID(branchStore);

    // Check if branch store exist
    const branchStoreExist =
      await this.branchStoreRepository.checkIfBranchStoreExist(
        parsedBranchStoreID
      );

    if (!branchStoreExist) {
      throw new AppError("Branch Store not found", 404);
    }

    // Check if employee exist
    const employeeExist = await this.employeeRepository.employeeExist(DNI);
    if (employeeExist) {
      throw new AppError("Employee is already exist", 400);
    }

    // Initialize create employee
    const createEmployee = await this.employeeRepository.createEmployee({
      name,
      lastName,
      DNI,
      branchStore: parsedBranchStoreID,
      position,
    });

    // Create seller
    if (position === "seller") {
      await this.sellerRepository.createSeller(createEmployee._id);
    }

    // Save employee
    await this.employeeRepository.saveEmployee(createEmployee);
  }
}
