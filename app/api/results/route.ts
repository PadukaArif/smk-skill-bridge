import connectMongoDB from "@/app/lib/mongodb";
import Result from "@/app/models/resultSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connectMongoDB();
  const {
    username,
    answer_1,
    answer_2,
    answer_3,
    answer_4,
    answer_5,
    answer_6,
    answer_7,
    answer_8,
    answer_9,
    answer_10,
    answer_11,
    answer_12,
    answer_13,
    answer_14,
    answer_15,
    answer_16,
    answer_17,
    answer_18,
    answer_19,
    answer_20,
    answer_21,
    answer_22,
    answer_23,
    answer_24,
    answer_25,
    answer_26,
    answer_27,
    answer_28,
    answer_29,
    answer_30,
  } = await request.json();
  const result = {
    answer_1: answer_1,
    answer_2: answer_2,
    answer_3: answer_3,
    answer_4: answer_4,
    answer_5: answer_5,
    answer_6: answer_6,
    answer_7: answer_7,
    answer_8: answer_8,
    answer_9: answer_9,
    answer_10: answer_10,
    answer_11: answer_11,
    answer_12: answer_12,
    answer_13: answer_13,
    answer_14: answer_14,
    answer_15: answer_15,
    answer_16: answer_16,
    answer_17: answer_17,
    answer_18: answer_18,
    answer_19: answer_19,
    answer_20: answer_20,
    answer_21: answer_21,
    answer_22: answer_22,
    answer_23: answer_23,
    answer_24: answer_24,
    answer_25: answer_25,
    answer_26: answer_26,
    answer_27: answer_27,
    answer_28: answer_28,
    answer_29: answer_29,
    answer_30: answer_30,
  };
  const total = Object.values(result).reduce((acc,curr)=>acc+curr,0)
  await Result.create({ username, result ,total });
  return NextResponse.json({"status":"success","data":{"username":username,"result":result , "total":total}})
}
export async function GET(){
  await connectMongoDB()
  const Results = await Result.find()
  return NextResponse.json({"status":"success","data":Results})
}