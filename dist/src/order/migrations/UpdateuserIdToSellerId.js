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
exports.updateUserIdToSeller = void 0;
const OrderBySeller_1 = __importDefault(require("../models/OrderBySeller"));
function updateUserIdToSeller(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield OrderBySeller_1.default.updateMany({ userId: { $exists: true } }, { $rename: { userId: "sellerID" } });
            // await OrderBySellerModel.updateMany(
            //   { sellerID: "6634034872c58ed17640493e" },
            //   { $set: { sellerID: "Miami" } }
            // );
            yield OrderBySeller_1.default.updateMany({ orderId: { $exists: true } }, { $rename: { orderId: "orderID" } });
            return res.status(200).json({ message: "Actualizado" });
        }
        catch (error) {
            console.error("Error al actualizar documentos:", error);
        }
    });
}
exports.updateUserIdToSeller = updateUserIdToSeller;
