import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const BE_URL = process.env.NEXT_PUBLIC_API_URL + "/todos";

type Params = {
  params: { id: string };
};

export async function PUT(req: NextRequest, { params }: Params) {
  const token = req.cookies.get("token")?.value;
  console.log('id', params?.id);
  
  if (!token) {
      return NextResponse.json(
          { success: false, message: "No token found" },
          { status: 401 }
        );
    }
    const body = await req.json();
    console.log('id', body);
  try {
    const { data } = await axios.put(BE_URL+`/${params?.id}/mark`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return NextResponse.json({ success: true, ...data });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    const data = err.response?.data || { message: "Internal error" };
    return NextResponse.json(
      { success: false, ...data },
      { status: err.response?.status || 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { 
  params }: Params) {
  const id = params.id;
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json(
      { success: false, message: "No token found" },
      { status: 401 }
    );
  }
  try {
    const { data } = await axios.delete(BE_URL + `/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return NextResponse.json({ success: true, ...data });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    const data = err.response?.data || { message: "Internal error" };
    return NextResponse.json(
      { success: false, ...data },
      { status: err.response?.status || 500 }
    );
  }
}
