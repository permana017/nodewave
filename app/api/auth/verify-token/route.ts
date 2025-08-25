import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  // Ambil token dari cookies
  const token = req.cookies.get("token")?.value;
  console.log({token});
  
  if (!token) {
    return NextResponse.json(
      { success: false, message: "No token found" },
      { status: 401 }
    );
  }
  try {
    // Kirim token ke BE untuk verifikasi
    const { data } = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/verify-token",
      { token },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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
