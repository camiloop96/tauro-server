import mongoose, { Document, Schema } from "mongoose";

export interface IGuide extends Document {
  number: string;
}

const guideSchema: Schema = new Schema({
  number: {
    type: String,
    required: true,
    unique: true,
  },
});

const GuideModel = mongoose.model<IGuide>("Guide", guideSchema);

export default GuideModel;
