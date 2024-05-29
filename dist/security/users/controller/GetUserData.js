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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserData = void 0;
const tokenManager_1 = require("../../utils/tokenManager");
const UserModel_1 = __importDefault(require("../models/UserModel"));
const dateManager_1 = require("../../../utils/dateManager");
const EmployeeModel_1 = require("../../../staff/Employee/models/EmployeeModel");
const BranchModel_1 = require("../../../store/branch/models/BranchModel");
const SellerModel_1 = require("../../../staff/Seller/models/SellerModel");
const GetUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`${(0, dateManager_1.getCurrentDate)()} ${req.method} simora/api/authentication/security/user/data/by-token`);
    let { token } = req.body;
    try {
        let decodedToken = yield (0, tokenManager_1.decodeToken)(token);
        let user = yield UserModel_1.default.findById(decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.userId).select("_id employee");
        if (!user) {
            return res.status(400).json({
                error: "No hay usuario asociado",
            });
        }
        // Validacion de empleado
        let findEmployee = yield EmployeeModel_1.EmployeeModel.findById(user === null || user === void 0 ? void 0 : user.employee);
        if (!findEmployee) {
            return res.status(400).json({
                error: "No hay empleado asociado",
            });
        }
        // Busqueda de Vendedor y Sucursal
        let findBranchStore = yield BranchModel_1.BranchStoreModel.findById(findEmployee === null || findEmployee === void 0 ? void 0 : findEmployee.branchStore);
        let findSeller = yield SellerModel_1.SellerModel.findOne({
            employee: findEmployee._id,
        });
        let userData = {
            _id: findEmployee === null || findEmployee === void 0 ? void 0 : findEmployee._id,
            fullName: `${findEmployee === null || findEmployee === void 0 ? void 0 : findEmployee.name} ${findEmployee === null || findEmployee === void 0 ? void 0 : findEmployee.lastName}`,
            cityBranchStore: {
                name: findBranchStore === null || findBranchStore === void 0 ? void 0 : findBranchStore.name,
                city: findBranchStore === null || findBranchStore === void 0 ? void 0 : findBranchStore.city,
            },
            sellerID: findSeller ? findSeller === null || findSeller === void 0 ? void 0 : findSeller._id : null,
        };
        return res.status(200).json(userData);
    }
    catch (error) {
        return res.status(500).json({
            error: "Error interno en el servidor",
        });
    }
});
exports.GetUserData = GetUserData;
