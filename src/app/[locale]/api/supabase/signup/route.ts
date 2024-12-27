import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "~/lib/supabase/server";

export async function POST(req: NextRequest) {
  const requestBody = await req.json();
  const supabase = await createClient();

  const data = {
    email: requestBody.email,
    password: requestBody.password,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return NextResponse.json({ error: error.message });
  }

  revalidatePath("/", "layout");
  return NextResponse.json({ message: "Successfully signed up!" });
}
