import mongoose from "mongoose";
import { Schema } from "mongoose";
const resultSchema = new Schema(
  {
    username: { type: String, required: true },
    total: { type: Number, required: true },
    result: {
      answer_1: Number,
      answer_2: Number,
      answer_3: Number,
      answer_4: Number,
      answer_5: Number,
      answer_6: Number,
      answer_7: Number,
      answer_8: Number,
      answer_9: Number,
      answer_10: Number,
      answer_11: Number,
      answer_12: Number,
      answer_13: Number,
      answer_14: Number,
      answer_15: Number,
      answer_16: Number,
      answer_17: Number,
      answer_18: Number,
      answer_19: Number,
      answer_20: Number,
      answer_21: Number,
      answer_22: Number,
      answer_23: Number,
      answer_24: Number,
      answer_25: Number,
      answer_26: Number,
      answer_27: Number,
      answer_28: Number,
      answer_29: Number,
      answer_30: Number,
    },
    match:{type:Object , required:true},
  },
  {
    timestamps: true,
  },
);

const Result = mongoose.models.Result || mongoose.model("Result", resultSchema);

export default Result;
