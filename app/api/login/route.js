import { NextResponse } from "next/server";
import { context } from "../DBContext";
import { signer } from "../JWT-Validator";

export async function POST(req) {
  const { username, password } = await req.json();

  try {
    const result = await context.signin(username, password);
    if (result) {
      const token = signer(username);
      return NextResponse.json({ result: true, accessToken: token });
    }
    return NextResponse.json({ result: false });
  } catch (e) {
    console.error(e.message);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
