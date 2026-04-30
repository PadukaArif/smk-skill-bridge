import Vocation from "../../../public/majors.json";
import connectMongoDB from "@/app/lib/mongodb";
import Result from "@/app/models/resultSchema";
import { NextRequest, NextResponse } from "next/server";

export interface Data {
  ID: number;
  uuid: string;
  name: string;
  description: string;
  skills: string[];
  projects: string[];
  careers: string[];
  colors: Colors;
}

export interface Colors {
  base_color: string;
  primary_color: string;
  secondary_color: string;
  subtle_color: string;
}

export async function POST(request: NextRequest) {
  await connectMongoDB();
  try {
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
    const total = Object.values(result).reduce((acc, curr) => acc + curr, 0);
    const calculate = () => {
      let countRPL: number = 0;
      let countDKV: number = 0;
      let countMM: number = 0;
      let countTKJ: number = 0;
      let countSIJA: number = 0;
      Object.values(result).forEach((a) => {
        if (a == 1) countRPL += 1;
        else if (a == 2) countDKV += 1;
        else if (a == 3) countMM += 1;
        else if (a == 4) countTKJ += 1;
        else if (a == 5) countSIJA += 1;
      });
      const countObj = [
        {
          vocation: "RPL",
          count: countRPL,
          data: Vocation[0],
        },
        {
          vocation: "DKV",
          count: countDKV,
          data: Vocation[4],
        },
        {
          vocation: "MM",
          count: countMM,
          data: Vocation[3],
        },
        {
          vocation: "TKJ",
          count: countTKJ,
          data: Vocation[1],
        },
        {
          vocation: "SIJA",
          count: countSIJA,
          data: Vocation[2],
        },
      ];
      return countObj.sort((a, b) => {
        return b.count - a.count;
      })[0];
    };
    const match = calculate();
    const newResult = new Result({
      username: username,
      result: result,
      total: total,
      match: {match},
    });
    const newData = await newResult.save();
    return NextResponse.json({
      status: "success",
      id: newData._id,
      data: {
        username: username,
        result: result,
        total: total,
        match: match,
      },
    });
  } catch (e) {
    return NextResponse.json({
      status: "error",
      data: e,
    });
  }
}
export async function GET() {
  await connectMongoDB();
  const Results = await Result.find();
  return NextResponse.json({ status: "success", data: Results });
}
