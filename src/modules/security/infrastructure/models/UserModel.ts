import { Schema, model } from "mongoose";

interface IUser extends Document {
  employee: Schema.Types.ObjectId;
  role: Schema.Types.ObjectId;
  credential: Schema.Types.ObjectId;
}

// Esquema de usuario
const userSchema = new Schema<IUser>({
  employee: {
    type: Schema.ObjectId,
    required: true,
    ref: "Employee",
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: "Role",
  },
  credential: {
    type: Schema.Types.ObjectId,
    ref: "Credential",
  },
});

// Creación del modelo
export default model<IUser>("User", userSchema);
