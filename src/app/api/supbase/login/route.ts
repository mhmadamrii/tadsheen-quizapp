import { NextResponse } from "next/server";
import { createClient } from "~/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  const formData = await req.formData();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return NextResponse.redirect("/error");
  }

  return NextResponse.redirect("/");
}
