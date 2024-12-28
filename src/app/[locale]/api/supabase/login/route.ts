import { NextRequest, NextResponse } from "next/server";
import { createClient } from "~/lib/supabase/server";

export async function POST(req: NextRequest) {
  const requestBody = await req.json();
  const supabase = await createClient();

  const data = {
    email: requestBody.email,
    password: requestBody.password,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return NextResponse.json(
      {
        message: "Invalid credentials",
      },
      {
        status: 400,
      },
    );
  }

  return NextResponse.json("Successfully signed in!");
}
