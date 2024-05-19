import { Schema, model } from "mongoose";
import { IUser } from "../types/UserTypes";

// Esquema de usuario
const userSchema = new Schema<IUser>({
  employee: { type: String, required: true },
  role: {
    type: Schema.Types.ObjectId,
    ref: "Role",
  },
});

// Creación del modelo
const UserModel = model<IUser>("User", userSchema);

// Export del componente
export default UserModel;
