import { Request, Response } from "express";
import CredentialsModel from "../../models/CredentialModel";
import UserModel from "../models/UserModel";
import { generateHashPassword } from "../../utils/passwordManager";
import RoleModel from "../../roles/models/RolesModel";

export const CreateUser = async (req: Request, res: Response) => {
  try {
    const { fullName, username, password, role } = req.body;

    // Verificar si se proporcionó la contraseña
    if (!fullName) {
      return res.status(400).json({
        message: "El nombre es obligatorio",
      });
    }
    // Verificar si se proporcionó la contraseña
    if (!username) {
      return res.status(400).json({
        message: "El usuario es obligatorio",
      });
    }
    // Verificar si se proporcionó la contraseña
    if (!password) {
      return res.status(400).json({
        message: "La contraseña es obligatoria",
      });
    }

    // Verificar si se proporcionó la contraseña
    if (!role) {
      return res.status(400).json({
        message: "El rol es obligatoria",
      });
    }

    // Verificar si existe el rol
    let existingRole = await RoleModel.findOne({
      name: role,
    });

    if (!existingRole) {
      return res.status(400).json({
        error: "El rol de usuario no existe",
      });
    }
    // Verificar si ya existe un usuario con el correo electrónico
    const existingCredentials = await CredentialsModel.findOne({ username });
    if (existingCredentials) {
      res.status(400).json({ message: "El correo electrónico ya está en uso" });
      return;
    }

    // Cifrar la contraseña con bcrypt
    const hashedPassword = await generateHashPassword(password);

    // Crear el usuario
    const user = new UserModel({ fullName, role: existingRole._id });
    const newUser = await user.save();

    // Crear las credenciales con la contraseña cifrada
    const credentials = new CredentialsModel({
      username,
      password: hashedPassword,
      user: newUser._id,
    });
    await credentials.save();

    res.status(200).json({ ok: true, message: "Usuario creado" });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
