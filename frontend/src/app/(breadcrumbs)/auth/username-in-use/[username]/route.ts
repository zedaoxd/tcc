import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data } = await supabase
      .from("profiles")
      .select("username")
      .eq("username", params.username)
      .single();

    return NextResponse.json({ usernameInUse: data === null }, { status: 200 });
  } catch (error) {
    console.error("username existis", error);
    return NextResponse.json({ usernameInUse: false }, { status: 200 });
  }
}
