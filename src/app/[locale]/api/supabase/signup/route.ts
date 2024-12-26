import { NextRequest, NextResponse } from "next/server";
import { createClient } from "~/lib/supabase/server";

export async function POST(req: NextRequest) {
  const requestBody = await req.json();
  console.log("requestBody", requestBody);
  const supabase = await createClient();

  const data = {
    email: requestBody.email,
    password: requestBody.password,
  };

  const { error } = await supabase.auth.signUp(data);
  console.log("error supabase suuu", error);

  if (error) {
    return NextResponse.json({ error: error.message });
  }

  return NextResponse.json({ message: "Successfully signed up!" });
}
