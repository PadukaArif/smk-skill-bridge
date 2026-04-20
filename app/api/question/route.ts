import { NextResponse } from "next/server"
import QuestionData from "../../../public/questions.json"
export async function GET(){
    return NextResponse.json({status:true , data:QuestionData })
}