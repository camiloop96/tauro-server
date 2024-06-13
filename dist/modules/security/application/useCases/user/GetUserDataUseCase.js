"use strict";
/**
 * @file GetUserDataUseCase.ts
 * @description Implements the use case for retrieving user data, including user details, employee details, and branch store information.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserDataUseCase = void 0;
/**
 * Class implementing the use case for getting user data.
 * @implements {IGetUserDataUseCase}
 */
class GetUserDataUseCase {
    /**
     * Creates an instance of GetUserDataUseCase.
     *
     * @param {IUserRepository} userRepository - The user repository.
     * @param {IEmployeeRepository} employeeRepository - The employee repository.
     * @param {IBranchStoreRepository} branchStoreRepository - The branch store repository.
     * @param {ISellerRepository} sellerRepository - The seller repository.
     */
    constructor(userRepository, employeeRepository, branchStoreRepository, sellerRepository) {
        this.userRepository = userRepository;
        this.employeeRepository = employeeRepository;
        this.branchStoreRepository = branchStoreRepository;
        this.sellerRepository = sellerRepository;
    }
    /**
     * Executes the use case to get user data.
     *
     * @param {string} token - The token used to identify the user.
     * @returns {Promise<IUserQueryData>} The user data.
     * @throws Will throw an error if the user data cannot be retrieved.
     */
    execute(token) {
        return __awaiter(this, void 0, void 0, function* () {
            // Read User Data
            const userData = yield this.userRepository.getUserByToken(token);
            // Get User Data Detail
            const userDataDetail = yield this.userRepository.getUserDetail(userData);
            // Find Employee
            const employeeDataDetail = yield this.employeeRepository.getEmployeeDetail(userDataDetail === null || userDataDetail === void 0 ? void 0 : userDataDetail.employee);
            // Detail Branch Store
            const branchStoreDetail = yield this.branchStoreRepository.detailBranchStore(employeeDataDetail === null || employeeDataDetail === void 0 ? void 0 : employeeDataDetail.branchStore);
            let queryDataResponse = {
                _id: employeeDataDetail._id,
                fullName: `${employeeDataDetail.name} ${employeeDataDetail.lastName}`,
                cityBranchStore: {
                    name: branchStoreDetail === null || branchStoreDetail === void 0 ? void 0 : branchStoreDetail.name,
                    city: branchStoreDetail === null || branchStoreDetail === void 0 ? void 0 : branchStoreDetail.city,
                },
            };
            // Find Seller
            let sellerDetail;
            if (employeeDataDetail.position === "seller") {
                sellerDetail = yield this.sellerRepository.getSellerByEmployeeID(employeeDataDetail === null || employeeDataDetail === void 0 ? void 0 : employeeDataDetail._id);
                queryDataResponse.sellerID = sellerDetail === null || sellerDetail === void 0 ? void 0 : sellerDetail._id;
            }
            return queryDataResponse;
        });
    }
}
exports.GetUserDataUseCase = GetUserDataUseCase;
