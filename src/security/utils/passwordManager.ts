import bcrypt from "bcrypt";

const saltRounds = 10;

export const generateHashPassword = async (
  password: string
): Promise<string> => {
  try {
    const hash: string = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    throw new Error("Error al generar el hash de la contraseña");
  }
};

export const compareHashPassword = async (
  password: string,
  userExistPassword: string
): Promise<boolean> => {
  try {
    const compare: boolean = await bcrypt.compare(password, userExistPassword);
    return compare;
  } catch (error) {
    throw new Error("Error al comparar las contraseñas");
  }
};
