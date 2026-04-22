import Lomba from '@/models/Testdb'
import { NextResponse } from 'next/server'

export async function GET(){
    return NextResponse.json({data:Lomba.all()})
}