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
const authorizeRoles = (allowedRoles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let userRoleId;
            if (req.role) {
                userRoleId = req.role;
            }
            if (!userRoleId) {
                return res.status(403).json({
                    message: "Acceso prohibido: No tienes permiso para acceder a este recurso",
                });
            }
            // const userRole = await RoleModel.findById(userRoleId);
            // if (userRole && allowedRoles.includes(userRole.name)) {
            //   next();
            // } else {
            //   return res.status(403).json({
            //     message:
            //       "Acceso prohibido: No tienes permiso para acceder a este recurso",
            //   });
            // }
        }
        catch (error) {
            return res
                .status(500)
                .json({ message: "Error al autorizar acceso", error: error.message });
        }
    });
};
exports.default = authorizeRoles;
