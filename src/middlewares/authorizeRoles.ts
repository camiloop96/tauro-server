import { NextFunction, Request as ExpressRequest, Response } from "express";
import RoleModel from "../security/roles/models/RolesModel";

interface CustomRequest<T = any> extends ExpressRequest {
  user?: T;
  role?: string;
}

const authorizeRoles = (allowedRoles: string[]) => {
  return async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      let userRoleId: string | undefined;
      if (req.role) {
        userRoleId = req.role;
      }
      if (!userRoleId) {
        return res.status(403).json({
          message:
            "Acceso prohibido: No tienes permiso para acceder a este recurso",
        });
      }

      const userRole = await RoleModel.findById(userRoleId);

      if (userRole && allowedRoles.includes(userRole.name)) {
        next();
      } else {
        return res.status(403).json({
          message:
            "Acceso prohibido: No tienes permiso para acceder a este recurso",
        });
      }
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: "Error al autorizar acceso", error: error.message });
    }
  };
};

export default authorizeRoles;
