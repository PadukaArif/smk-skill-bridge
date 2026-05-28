import { NextResponse } from "next/server"
import vocationsData from "../../../data/vocation/division.json"
export async function GET(){
    return NextResponse.json({status:true , data:vocationsData })
}
