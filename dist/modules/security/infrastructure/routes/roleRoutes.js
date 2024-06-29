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
const CreateRoleController_1 = require("../controllers/roles/CreateRoleController");
const ListRolesController_1 = require("../controllers/roles/ListRolesController");
const DetailRoleController_1 = require("../controllers/roles/DetailRoleController");
const DeleteRoleController_1 = require("../controllers/roles/DeleteRoleController");
const UpdateRoleController_1 = require("../controllers/roles/UpdateRoleController");
// Role routes instance router
const roleRoutes = (0, express_1.Router)();
// Create roles controller instances
const createRoleController = new CreateRoleController_1.CreateRoleController();
const listRoleController = new ListRolesController_1.ListRolesController();
const detailRoleController = new DetailRoleController_1.DetailRoleController();
const deleteRoleController = new DeleteRoleController_1.DeleteRoleController();
const updateRoleController = new UpdateRoleController_1.UpdateRoleController();
// Routes
roleRoutes.post("/create/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield createRoleController.execute(req, res);
}));
roleRoutes.get("/detail/:id/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield detailRoleController.execute(req, res);
}));
roleRoutes.get("/list/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield listRoleController.execute(req, res);
}));
roleRoutes.delete("/delete/:id/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield deleteRoleController.execute(req, res);
}));
roleRoutes.put("/update/:id/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield updateRoleController.execute(req, res);
}));
// Role export router
exports.default = roleRoutes;
