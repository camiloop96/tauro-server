import { BranchStore } from "@modules/store/domain/entities/BranchStore";
import { IBranchStoreRepository } from "@modules/store/domain/repositories/IBranchStoreRepository";
import { AppError } from "@shared/errors/AppError";

export interface IDetailBranchStoreUseCase {
  execute(branchStoreID: string): Promise<BranchStore>;
}

export class DetailBranchStoreUseCase implements IDetailBranchStoreUseCase {
  constructor(private readonly branchStoreRepository: IBranchStoreRepository) {}

  async execute(branchStoreID: string): Promise<BranchStore> {
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

    // Get Detail
    const detailBranchStore =
      await this.branchStoreRepository.detailBranchStore(checkedAndParsedID);

    // return
    if (detailBranchStore) {
      return detailBranchStore;
    } else {
      throw new AppError("Error fetching Branch Store", 500);
    }
  }
}
