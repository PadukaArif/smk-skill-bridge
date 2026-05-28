import { NextRequest, NextResponse } from "next/server";

export interface IdivisionResultPost {
  status: boolean;
}

interface IPostData {
  result: number[];
  username: string;
}
export async function POST(request: NextRequest) {
  const data: IPostData = await request.json();
  return NextResponse.json({
    status: true,
    data: data,
  });
  const dataInfor = {
    total: 0,
    name: "informatika",
  };
  const dataBangunan = {
    total: 0,
    name: "bangunan",
  };
  const dataMesin = {
    total: 0,
    name: "mesin",
  };
  const dataNull = {
    total: 0,
    name: "Tidak Yakin",
  };
  data.result.map((a) => {
    if (a == 1) {
      dataInfor.total += 1;
    } else if (a == 2) {
      dataBangunan.total += 1;
    } else if (a == 3) {
      dataMesin.total += 1;
    } else {
      dataNull.total += 1;
    }
  });
  const dataArray = [dataInfor, dataBangunan, dataMesin, dataNull];
  return NextResponse.json({
    status: true,
    data: dataArray.sort((a, b) => b.total - a.total)[0],
  });
}
