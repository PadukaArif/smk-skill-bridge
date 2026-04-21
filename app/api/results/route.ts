import { NextResponse } from "next/server";
import result from "./Result";
export async function GET() {
  try {
    return NextResponse.json({ data: result });
  } catch (err: unknown) {
    return NextResponse.json({ data: err });
  }
}
export async function POST(request: Request) {
  try {
    const comment = await request.json();
    // const comment = {text:"nigga"}
    if (comment.text) {
      const newComment = {
        id: result.length + 1,
        text: comment.text,
      };
      result.push(newComment);
      NextResponse.json(JSON.stringify(result), { status: 201 });
      return NextResponse.json({data:"Berhasil menambahkan hasil"})
    } else {
      return NextResponse.json({data:"Tidak ada komen"});
    }
  } catch (err: any) {
    return NextResponse.json({ data: "Terjadi error" }, { status: 500 });
  }
}
