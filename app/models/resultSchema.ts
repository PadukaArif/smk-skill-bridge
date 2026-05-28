import mongoose from "mongoose";
import { Schema } from "mongoose";
const resultSchema = new Schema(
  {
    username: { type: String, required: true },
    result:{type:Object , required:true},
  },
  {
    timestamps: true,
  },
);

const Result = mongoose.models.Result || mongoose.model("Result", resultSchema);

export default Result;
