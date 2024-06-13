/**
 * @file GetUserDataUseCase.ts
 * @description Implements the use case for retrieving user data, including user details, employee details, and branch store information.
 */

import { IUserRepository } from "@modules/security/domain/repositories/IUserRepository";
import { IEmployeeRepository } from "@modules/staff/domain/repositories/IEmployeeRepository";
import { ISellerRepository } from "@modules/staff/domain/repositories/ISellerRepository";
import { IBranchStoreRepository } from "@modules/store/domain/repositories/IBranchStoreRepository";
import { Types } from "mongoose";

/**
 * Interface representing the use case for getting user data.
 */
export interface IGetUserDataUseCase {
  /**
   * Executes the use case.
   *
   * @param {string} token - The token used to identify the user.
   * @returns {Promise<IUserQueryData>} The user data.
   */
  execute(token: string): Promise<IUserQueryData>;
}

/**
 * Interface representing the data returned by the user query.
 */
export interface IUserQueryData {
  _id: Types.ObjectId;
  fullName: string;
  cityBranchStore: {
    name: string | undefined;
    city: string | undefined;
  };
  sellerID?: Types.ObjectId | null;
}

/**
 * Class implementing the use case for getting user data.
 * @implements {IGetUserDataUseCase}
 */
export class GetUserDataUseCase implements IGetUserDataUseCase {
  /**
   * Creates an instance of GetUserDataUseCase.
   *
   * @param {IUserRepository} userRepository - The user repository.
   * @param {IEmployeeRepository} employeeRepository - The employee repository.
   * @param {IBranchStoreRepository} branchStoreRepository - The branch store repository.
   * @param {ISellerRepository} sellerRepository - The seller repository.
   */
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly employeeRepository: IEmployeeRepository,
    private readonly branchStoreRepository: IBranchStoreRepository,
    private readonly sellerRepository: ISellerRepository
  ) {}

  /**
   * Executes the use case to get user data.
   *
   * @param {string} token - The token used to identify the user.
   * @returns {Promise<IUserQueryData>} The user data.
   * @throws Will throw an error if the user data cannot be retrieved.
   */
  async execute(token: string): Promise<IUserQueryData> {
    // Read User Data
    const userData = await this.userRepository.getUserByToken(token!);

    // Get User Data Detail
    const userDataDetail = await this.userRepository.getUserDetail(userData);

    // Find Employee
    const employeeDataDetail = await this.employeeRepository.getEmployeeDetail(
      userDataDetail?.employee!
    );

    // Detail Branch Store
    const branchStoreDetail =
      await this.branchStoreRepository.detailBranchStore(
        employeeDataDetail?.branchStore!
      );

    let queryDataResponse: IUserQueryData = {
      _id: employeeDataDetail._id!,
      fullName: `${employeeDataDetail.name} ${employeeDataDetail.lastName}`,
      cityBranchStore: {
        name: branchStoreDetail?.name,
        city: branchStoreDetail?.city,
      },
    };

    // Find Seller
    let sellerDetail;
    if (employeeDataDetail.position === "seller") {
      sellerDetail = await this.sellerRepository.getSellerByEmployeeID(
        employeeDataDetail?._id!
      );
      queryDataResponse.sellerID = sellerDetail?._id;
    }
    return queryDataResponse;
  }
}
