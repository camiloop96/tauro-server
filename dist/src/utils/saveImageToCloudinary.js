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
exports.deleteImagefromCloudinary = exports.saveImageToCloudinary = void 0;
const cloudinaryConfig_1 = require("../../config/cloudinaryConfig");
const dateManager_1 = require("./dateManager");
const saveImageToCloudinary = (image, path, name) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`${(0, dateManager_1.getCurrentDate)()} API cloudinary-save_source`);
    let imageFile = image;
    try {
        let optionsUpload = {
            folder: path,
            public_id: name,
        };
        let imageBufferToString = imageFile === null || imageFile === void 0 ? void 0 : imageFile.buffer.toString("base64");
        // JSON a buffer
        const dataURI = "data:" + (imageFile === null || imageFile === void 0 ? void 0 : imageFile.mimetype) + ";base64," + imageBufferToString;
        const cloudinary = (0, cloudinaryConfig_1.cloudinaryConfig)();
        const response = yield cloudinary.uploader.upload(dataURI, optionsUpload);
        return {
            url: response.url,
            asset_id: response.asset_id,
        };
    }
    catch (error) {
        throw error;
    }
});
exports.saveImageToCloudinary = saveImageToCloudinary;
const deleteImagefromCloudinary = (path, public_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`${(0, dateManager_1.getCurrentDate)()} API cloudinary-detele_source`);
        const cloudinary = (0, cloudinaryConfig_1.cloudinaryConfig)();
        let url = `${path}${public_id}`;
        const response = yield cloudinary.uploader.destroy(url);
        return response;
    }
    catch (error) {
        throw error;
    }
});
exports.deleteImagefromCloudinary = deleteImagefromCloudinary;
