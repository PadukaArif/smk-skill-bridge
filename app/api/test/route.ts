import connectMongoDB from "@/app/lib/mongodb";
import Test from "@/app/models/testSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    await connectMongoDB()
    const datas = await Test.find()
    return NextResponse.json({"status":"success","data":datas})
}

export async function POST(request:NextRequest){
    await connectMongoDB()
    const {text,description} = await request.json()
    const result = {
        text:text,
        description:description
    }
    await Test.create({text, description})
    return NextResponse.json({"status":"success","data":result})
}

