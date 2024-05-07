import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function GET(
  request: NextRequest,
  { params }: { params: { email: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data } = await supabase
      .from("profiles")
      .select("email")
      .eq("email", params.email)
      .single();

    return NextResponse.json({ emailInUse: data === null }, { status: 200 });
  } catch (error) {
    console.error("email in use", error);
    return NextResponse.json({ emailInUse: false }, { status: 200 });
  }
}
