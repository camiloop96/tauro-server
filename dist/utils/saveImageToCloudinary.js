"use strict";
// import { cloudinaryConfig } from "@config/cloudinary";
// import { getCurrentDate } from "./dateManager";
// export const saveImageToCloudinary = async (
//   image: any,
//   path: string,
//   name: string
// ) => {
//   console.log(`${getCurrentDate()} API cloudinary-save_source`);
//   let imageFile = image;
//   try {
//     let optionsUpload = {
//       folder: path,
//       public_id: name,
//     };
//     let imageBufferToString = imageFile?.buffer.toString("base64");
//     // JSON a buffer
//     const dataURI =
//       "data:" + imageFile?.mimetype + ";base64," + imageBufferToString;
//     const cloudinary = cloudinaryConfig();
//     const response = await cloudinary.uploader.upload(dataURI, optionsUpload);
//     return {
//       url: response.url,
//       asset_id: response.asset_id,
//     };
//   } catch (error: any) {
//     throw error;
//   }
// };
// export const deleteImagefromCloudinary = async (
//   path: string,
//   public_id: string
// ) => {
//   try {
//     console.log(`${getCurrentDate()} API cloudinary-detele_source`);
//     const cloudinary = cloudinaryConfig();
//     let url = `${path}${public_id}`;
//     const response = await cloudinary.uploader.destroy(url);
//     return response;
//   } catch (error: any) {
//     throw error;
//   }
// };
