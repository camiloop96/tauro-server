import bcrypt from "bcrypt";
import { AppError } from "@shared/errors/AppError";

// Configuration
const saltRounds = 10;

/**
 * Generate a hash for given password
 *
 * @param password . Password in plain text
 * @returns Hash of password
 * @throws Error if occurs a trouble during hash generation
 */

export const generateHashPassword = async (
  password: string
): Promise<string> => {
  try {
    const hash: string = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    throw new AppError("Error generating hash", 500, error);
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
    throw new AppError("Error comparing hash", 500, error);
  }
};
