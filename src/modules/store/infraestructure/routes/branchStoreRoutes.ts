// Modules
import { Request, Response, Router } from "express";
import { CreateBranchStoreController } from "../controllers/CreateBranchStoreController";
import { ListBranchStoreController } from "../controllers/ListBranchStoreController";
import { UpdateBranchStoreController } from "../controllers/UpdateBranchStoreController";
import { DetailBranchStoreController } from "../controllers/DetailBranchStoreController";
import { DeleteBranchStoreController } from "../controllers/DeleteBranchStoreController";

// Branch Store routes instance router
const branchStoreRoutes = Router();

// Create Branch Store controller instances
const createBranchStoreController = new CreateBranchStoreController();
const listBranchStroreController = new ListBranchStoreController();
const detailBranchStroreController = new DetailBranchStoreController();
const deleteBranchStroreController = new DeleteBranchStoreController();
const updateBranchStroreController = new UpdateBranchStoreController();

// Routes
branchStoreRoutes.post("/create/", async (req: Request, res: Response) => {
  await createBranchStoreController.execute(req, res);
});
branchStoreRoutes.get("/list/", async (req: Request, res: Response) => {
  await listBranchStroreController.execute(req, res);
});
branchStoreRoutes.get("/detail/:id/", async (req: Request, res: Response) => {
  await detailBranchStroreController.execute(req, res);
});
branchStoreRoutes.put("/update/:id/", async (req: Request, res: Response) => {
  await updateBranchStroreController.execute(req, res);
});
branchStoreRoutes.delete(
  "/delete/:id/",
  async (req: Request, res: Response) => {
    await deleteBranchStroreController.execute(req, res);
  }
);
// Export routes
export default branchStoreRoutes;
