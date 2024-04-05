import { Model, Schema, model } from "mongoose";

// Interface de Usuario
export interface IUser extends Document {
  fullName: string;
}

// Interface el modelo
interface IUserModel extends Model<IUser> {}

// Esquema de usuario
const userSchema = new Schema<IUser, IUserModel>({
  fullName: { type: String, required: true },
});

// Creación del modelo
const UserModel = model<IUser, IUserModel>("User", userSchema);

// Export del componente
export default UserModel;
