import { BranchStore } from "@modules/store/domain/entities/BranchStore";
import { IBranchStoreRepository } from "@modules/store/domain/repositories/IBranchStoreRepository";
import { AppError } from "@shared/errors/AppError";

export interface IUpdateBranchStoreUseCase {
  execute(branchStoreID: string, payload: BranchStore): Promise<void>;
}

export class UpdateBranchStoreUseCase implements IUpdateBranchStoreUseCase {
  constructor(private readonly branchStoreRepository: IBranchStoreRepository) {}

  async execute(branchStoreID: string, payload: BranchStore): Promise<void> {
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

    // Update Branch Store
    await this.branchStoreRepository.updateBranchStore(
      checkedAndParsedID,
      payload
    );
  }
}
