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
    console.log("fucking error", error);
  }

  return data;
}
