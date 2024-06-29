"use strict";
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
// Modules
const express_1 = require("express");
const CreateBranchStoreController_1 = require("../controllers/CreateBranchStoreController");
const ListBranchStoreController_1 = require("../controllers/ListBranchStoreController");
const UpdateBranchStoreController_1 = require("../controllers/UpdateBranchStoreController");
const DetailBranchStoreController_1 = require("../controllers/DetailBranchStoreController");
const DeleteBranchStoreController_1 = require("../controllers/DeleteBranchStoreController");
// Branch Store routes instance router
const branchStoreRoutes = (0, express_1.Router)();
// Create Branch Store controller instances
const createBranchStoreController = new CreateBranchStoreController_1.CreateBranchStoreController();
const listBranchStroreController = new ListBranchStoreController_1.ListBranchStoreController();
const detailBranchStroreController = new DetailBranchStoreController_1.DetailBranchStoreController();
const deleteBranchStroreController = new DeleteBranchStoreController_1.DeleteBranchStoreController();
const updateBranchStroreController = new UpdateBranchStoreController_1.UpdateBranchStoreController();
// Routes
branchStoreRoutes.post("/create/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield createBranchStoreController.execute(req, res);
}));
branchStoreRoutes.get("/list/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield listBranchStroreController.execute(req, res);
}));
branchStoreRoutes.get("/detail/:id/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield detailBranchStroreController.execute(req, res);
}));
branchStoreRoutes.put("/update/:id/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield updateBranchStroreController.execute(req, res);
}));
branchStoreRoutes.delete("/delete/:id/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield deleteBranchStroreController.execute(req, res);
}));
// Export routes
exports.default = branchStoreRoutes;
