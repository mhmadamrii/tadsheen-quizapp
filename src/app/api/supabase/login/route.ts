import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "~/lib/supabase/server";

export async function POST(req: NextRequest) {
  const requestBody = await req.json();
  const supabase = await createClient();
  console.log("request body", requestBody);

  const data = {
    email: requestBody.email,
    password: requestBody.password,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.log("fucking error", error);
  }

  revalidatePath("/", "layout");
  return NextResponse.json({ message: "Successfully signed in!" });
}
