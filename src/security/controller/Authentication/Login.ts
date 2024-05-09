import { Request, Response } from "express";
import CredentialsModel from "../../models/CredentialModel";
import { compareHashPassword } from "../../utils/passwordManager";
import UserModel from "../../users/models/UserModel";
import { createToken } from "../../utils/tokenManager";
import { getCurrentDate } from "../../../utils/dateManager";
import RoleModel from "../../roles/models/RolesModel";
import { io } from "../../../server";

export const LoginController = async (req: Request, res: Response) => {
  console.log(
    `${getCurrentDate()} ${
      req.method
    } simora/api/authentication/security/authentication/login/`
  );
  try {
    const { username, password } = req.body;

    // Verificar si se proporcionó un correo electrónico
    if (!username) {
      return res.status(400).json({ error: "Por favor, ingrese un usuario" });
    }

    // Verificar si se proporcionó una contraseña
    if (!password) {
      return res
        .status(400)
        .json({ error: "Por favor, ingrese una contraseña" });
    }

    // Verificar si el correo electrónico existe
    const credentials = await CredentialsModel.findOne({ username });
    if (!credentials) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Verificar la contraseña
    const passwordMatch = await compareHashPassword(
      password,
      credentials.password
    );
    if (!passwordMatch) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Obtener el usuario asociado a las credenciales
    const user = await UserModel.findById(credentials.user);

    // Validar existencia de usuario
    if (!user) {
      return res.status(403).json({
        error: "Credenciales inválidas",
      });
    }

    // Creacción del token
    let token;
    if (user !== null) {
      let payload = { userId: user._id, role: user?.role };
      token = createToken(payload);
    }

    // Busqueda de nombre de rol
    let existingRole = await RoleModel.findById(user?.role);

    // Username
    let userName = await UserModel.findById(user._id);

    // Respuesta
    res.status(200).json({ token, role: existingRole && existingRole?.name });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
