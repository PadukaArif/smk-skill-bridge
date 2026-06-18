import { checkBangunan, checkInfor, checkMesin } from "@/app/lib/checkdata";
import connectMongoDB from "@/app/lib/mongodb";
import Result from "@/app/models/resultSchema";
import { NextRequest, NextResponse } from "next/server";

interface Ipost {
  username: string;
  answer_array: number[];
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectMongoDB();
  const { id } = await params;
  const results = await Result.findById(id);
  return NextResponse.json({ status: "success", data: results });
}
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectMongoDB()
  const { id } = await params;
  const data: Ipost = await request.json();
  try {
    if (id.toLowerCase() == "informatika") {
      const result = checkInfor(data.answer_array);
      const newResult = new Result({
        username: data.username,
        result: result,
      });
      const newData = await newResult.save();
      return NextResponse.json({
        status: true,
        id: newData._id,
        data: newData,
      });
    } else if (id.toLowerCase() == "bangunan") {
      const result = checkBangunan(data.answer_array);
      const newResult = new Result({
        username: data.username,
        result: result,
      });
      const newData = await newResult.save();
      return NextResponse.json({
        status: true,
        id: newData._id,
        data: newData,
      });
    } else if (id.toLowerCase() == "mesin") {
      const result = checkMesin(data.answer_array);
      const newResult = new Result({
        username: data.username,
        result: result,
      });
      const newData = await newResult.save();
      return NextResponse.json({
        status: true,
        id: newData._id,
        data: newData,
      });
    }
  } catch (e) {
    const errMsg: string = e instanceof Error ? e.message : "Unkown Error";
    return NextResponse.json({
      status: false,
      data: { id: id, result: { errMsg } },
    });
  }
}
