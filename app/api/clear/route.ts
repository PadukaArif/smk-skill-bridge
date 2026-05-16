import { NextResponse } from "next/server";

export async function GET(){
    return NextResponse.json({status:true,data:"Hello, Welcome to SMK SKILL BRIDGE"},)
}