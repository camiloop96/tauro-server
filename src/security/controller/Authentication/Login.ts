import { Request, Response } from "express";
import CredentialsModel from "../../models/CredentialModel";
import { compareHashPassword } from "../../utils/passwordManager";
import UserModel from "../../models/UserModel";
import { createToken } from "../../utils/tokenManager";

export const LoginController = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Verificar si se proporcionó un correo electrónico
    if (!username) {
      return res.status(400).json({ message: "Por favor, ingrese un usuario" });
    }

    // Verificar si se proporcionó una contraseña
    if (!password) {
      return res
        .status(400)
        .json({ message: "Por favor, ingrese una contraseña" });
    }

    // Verificar si el correo electrónico existe
    const credentials = await CredentialsModel.findOne({ username });
    if (!credentials) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Verificar la contraseña
    const passwordMatch = await compareHashPassword(
      password,
      credentials.password
    );
    if (!passwordMatch) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Obtener el usuario asociado a las credenciales
    const user = await UserModel.findById(credentials.user);

    // Validar existencia de usuario
    if (!user) {
      return res.status(403).json({
        message: "Credenciales inválidas",
      });
    }

    // Creacción del token
    let token;
    if (user !== null) {
      let payload = { userId: user._id };
      token = createToken(payload);
    }

    // Respuesta
    res.status(200).json({ token });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

