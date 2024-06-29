import RoleModel from "../infrastructure/models/RoleModel";
import { generateHashPassword } from "./passwordManager";
import UserModel from "../infrastructure/models/UserModel";
import CredentialModel from "../infrastructure/models/CredentialModel";

const usernameMaster = process.env.MASTER_USERNAME;
const passwordMaster = process.env.MASTER_PASSWORD;
const roleMaster = process.env.MASTER_ROLE;

export const createRootUser = async () => {
  let usernameMaster = "master@simora.co";
  let passwordMaster = "Empanada04$";
  let rolMaster = "master";
  let hashPassword = await generateHashPassword(passwordMaster);

  try {
    let existingRole = await RoleModel.exists({
      name: rolMaster,
    });

    let idRole;
    if (!existingRole) {
      idRole = new RoleModel({
        name: rolMaster,
      });
      idRole.save();
      console.log("Master role created succesfully");
    } else {
      console.log("Master role is now existing");
      idRole = await RoleModel.findOne({
        name: rolMaster,
      });
    }
    const existMaster = await CredentialModel.exists({
      username: usernameMaster,
    });

    if (!existMaster) {
      const masterUser = new UserModel({
        fullName: "Master",
        role: idRole && idRole._id,
      });

      if (masterUser) {
        const masterCredential = new CredentialModel({
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
