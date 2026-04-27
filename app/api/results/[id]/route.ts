import connectMongoDB from "@/app/lib/mongodb";
import Result from "@/app/models/resultSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest ,{params}:{params: {id:string}}){
    await connectMongoDB()
    const {id} = await params
    const results = await Result.findById(id)
    return NextResponse.json({"status":"success","data":results})
}