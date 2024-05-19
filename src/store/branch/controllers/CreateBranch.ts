import { Request, Response } from "express";
import { BranchStoreModel } from "../models/BranchModel";

export const CreateBranch = async (req: Request, res: Response) => {
  const { name, state, city } = req.body || {};

  try {
    const newBranch = new BranchStoreModel({ name, state, city });
    await newBranch.save();
    res.status(200).json(newBranch);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
