import mongoose, { Document, Schema } from "mongoose";

export interface IResource extends Document {
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const resourceSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IResource>("Resource", resourceSchema);
