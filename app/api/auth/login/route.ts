import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const { data } = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/login",
      body,
      { headers: { "Content-Type": "application/json" } }
    );
    if (data.content.token) {
      const response = NextResponse.json({ success: true, ...data });
      response.cookies.set("token", data.content.token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });
      return response;
    }
    return NextResponse.json({ success: false, ...data }, { status: 400 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    const data = err.response?.data || { message: "Internal error" };
    return NextResponse.json(
      { success: false, ...data },
      { status: err.response?.status || 500 }
    );
  }
}
