"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBranch = void 0;
const BranchModel_1 = require("../models/BranchModel");
const CreateBranch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, state, city } = req.body || {};
    try {
        const newBranch = new BranchModel_1.BranchStoreModel({ name, state, city });
        yield newBranch.save();
        res.status(200).json(newBranch);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.CreateBranch = CreateBranch;
