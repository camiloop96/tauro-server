import { IBranchStoreRepository } from "@modules/store/domain/repositories/IBranchStoreRepository";
import { AppError } from "@shared/errors/AppError";

export interface IDeleteBranchStoreUseCase {
  execute(branchStoreID: string): Promise<void>;
}

export class DeleteBranchStoreUseCase implements IDeleteBranchStoreUseCase {
  constructor(private readonly branchStoreRepository: IBranchStoreRepository) {}

  async execute(branchStoreID: string): Promise<void> {
    // Check and parse ID
    const checkedAndParsedID = await this.branchStoreRepository.checkAndParseID(
      branchStoreID
    );

    // Check if exist
    const branchStoreExist =
      await this.branchStoreRepository.checkIfBranchStoreExist(
        checkedAndParsedID
      );

    if (!branchStoreExist) {
      throw new AppError("Branch Store not found", 404);
    }

    // Delete Branch Store
    await this.branchStoreRepository.deleteBranchStore(checkedAndParsedID);
  }
}
