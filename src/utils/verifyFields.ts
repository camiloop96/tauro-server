import { Response } from "express";

export const verifyFields = (
  requiredFields: string[],
  request: any,
  res: Response
) => {
  const missingFields: string[] = requiredFields.filter((field: string) => {
    !request[field];
  });
  if (missingFields.length > 0) {
    return res.status(400).json({
      error: `Los campos ${missingFields.join(", ")} son obligatorios`,
    });
  }
};
