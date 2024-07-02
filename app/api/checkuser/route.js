import { context } from "../DBContext";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { username } = await req.json();
  try {
    const exists = await context.checkifexists(username);
    console.log(exists);
    return NextResponse.json({ exists: exists });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
