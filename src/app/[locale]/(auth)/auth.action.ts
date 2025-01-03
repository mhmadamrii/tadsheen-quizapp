"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "~/lib/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);
  console.log("error auth", error);

  if (error) {
    return {
      status: 401,
      message: "Invalid credentials",
    };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  console.log("data", data);

  const { error } = await supabase.auth.signUp(data);
  console.log("error auth", error);

  if (error) {
    return {
      status: 409,
      message: "User already exist",
    };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}
