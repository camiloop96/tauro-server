import { BranchStore } from "@modules/store/domain/entities/BranchStore";
import { IBranchStoreRepository } from "@modules/store/domain/repositories/IBranchStoreRepository";

export interface IListBranchStoreUseCase {
  execute(): Promise<BranchStore[]>;
}

export class ListBranchStoreUseCase implements IListBranchStoreUseCase {
  constructor(private readonly branchSotreRepository: IBranchStoreRepository) {}

  async execute(): Promise<BranchStore[]> {
    return this.branchSotreRepository.getBranchList();
  }
}
