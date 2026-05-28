import { NextRequest, NextResponse } from "next/server"
import dataInformatika from '@/app/data/question/informatika.json'
import dataBangunan from '@/app/data/question/bangunan.json'
import dataMesin from '@/app/data/question/mesin.json'
import { Data } from "@/app/questions/page"
export async function GET(request:NextRequest,{params}:{params:Promise<{division:string}>}){
    const {division} = await params
    let data:Data
    if(division.toLowerCase() == "informatika"){
        data = dataInformatika as Data
        return NextResponse.json({"status":true,"result":data})
    }else if(division.toLowerCase() == "bangunan"){
        data = dataBangunan as Data
        return NextResponse.json({"status":true,"result":data})
    }else if(division.toLowerCase() == "mesin"){
        data = dataMesin as Data
        return NextResponse.json({"status":true,"result":data})
    }else{
        return NextResponse.json({"status":true,"result":"Tidak dapat menemukan data"})
    }
}