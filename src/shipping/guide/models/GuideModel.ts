import { Schema, model } from "mongoose";

interface IGuide {
  number: string;
}
const guideSchema = new Schema<IGuide>({
  number: {
    type: String,
    require: true,
    unique: true,
  },
});

const GuideModel = model<IGuide>("Guide", guideSchema);

export default GuideModel;
