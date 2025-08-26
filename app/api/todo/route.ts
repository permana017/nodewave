import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const BE_URL = process.env.NEXT_PUBLIC_API_URL + "/todos";

export async function GET(req: NextRequest) {
  // Ambil token dari cookies
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json(
      { success: false, message: "No token found" },
      { status: 401 }
    );
  }
  const { searchParams } = new URL(req.url);
  const params: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });
  try {
    const { data } = await axios.get(BE_URL, {
      headers: { Authorization: `Bearer ${token}` },
      params,
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

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json(
      { success: false, message: "No token found" },
      { status: 401 }
    );
  }
  const body = await req.json();
  try {
    const { data } = await axios.post(BE_URL, body, {
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

export async function PUT(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json(
      { success: false, message: "No token found" },
      { status: 401 }
    );
  }
  const body = await req.json();
  try {
    const { data } = await axios.put(BE_URL + `/${body?.id}/mark`, body, {
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

export async function DELETE(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const body = await req.json();
  if (!token) {
    return NextResponse.json(
      { success: false, message: "No token found" },
      { status: 401 }
    );
  }
  try {
    const { data } = await axios.delete(BE_URL + `/${body?.id}`, {
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