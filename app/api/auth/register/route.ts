import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body);
  try {
    const { data } = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/register",
      body,
      { headers: { "Content-Type": "application/json" } }
    );
    return NextResponse.json({ success: true, ...data }, { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    const data = err.response?.data || { message: "Internal error" };
    return NextResponse.json(
      { success: false, ...data },
      { status: err.response?.status || 500 }
    );
  }
}
