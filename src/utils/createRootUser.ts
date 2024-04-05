import CredentialsModel from "../security/models/CredentialModel";
import UserModel, { IUser } from "../security/models/UserModel";
import { generateHashPassword } from "../security/utils/passwordManager";

export const createRootUser = async () => {
  let usernameMaster = "master@simora.co";
  let passwordMaster = "Empanada04$";
  let hashPassword = await generateHashPassword(passwordMaster);
  try {
    const existMaster = await CredentialsModel.exists({
      username: usernameMaster,
    });
    if (!existMaster) {
      const masterUser = new UserModel({
        fullName: "Master",
      });
      if (masterUser) {
        const masterCredential = new CredentialsModel({
          username: usernameMaster,
          password: hashPassword,
          user: masterUser._id,
        });
        await masterCredential.save();
      }
      await masterUser.save();
      console.log("Master user created succesfully");
    } else {
      console.log("Master user is now existing");
    }
  } catch (error) {
    console.error("Error for create master user:", error);
  }
};
