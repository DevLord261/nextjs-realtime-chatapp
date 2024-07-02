import { NextRequest, NextResponse } from "next/server";
import { signer } from "../JWT-Validator";
import { context } from "../DBContext";

export async function POST(request) {
  const { username, password } = await request.json();
  const hashedpassword = await context.hashPassword(password);
  try {
    const result = await context.newuser(username, hashedpassword);
    if (result) {
      const token = signer(username, hashedpassword);
      return NextResponse.json({ result: true, accessToken: token });
    }
    return NextResponse.json({ result: false });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "user already exists" }, { status: 500 });
  }
}
