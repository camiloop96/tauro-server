import { BranchStore } from "@modules/store/domain/entities/BranchStore";
import { IBranchStoreRepository } from "@modules/store/domain/repositories/IBranchStoreRepository";
import { AppError } from "@shared/errors/AppError";

export interface ICreateBranchStoreUseCase {
  execute(branchStoreData: BranchStore): Promise<void>;
}

export class CreateBranchStoreUseCase implements ICreateBranchStoreUseCase {
  constructor(private readonly branchStoreRepository: IBranchStoreRepository) {}

  async execute(branchStoreData: BranchStore): Promise<void> {
    // Destructing request
    const { name, state, city } = branchStoreData || {};

    // Save Branch Store
    await this.branchStoreRepository.createBranchStore({ name, state, city });
  }
}
