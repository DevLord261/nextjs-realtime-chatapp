import { NextResponse } from "next/server";
import { context } from "../DBContext";
import { signer, validatetoken } from "../JWT-Validator";

export async function GET(req) {
  const accessToken = req.headers.get("Authorization")?.split(" ")[1];

  if (!accessToken) return NextResponse.json("Unauthorized", { status: 401 });

  const user = await validatetoken(accessToken);

  if (!user)
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });

  return NextResponse.json({ result: true, user: user.username });
}
