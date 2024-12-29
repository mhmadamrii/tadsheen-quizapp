"use client";

import { useRouter } from "nextjs-toploader/app";
import { useEffect } from "react";
import { createClient } from "~/lib/supabase/client";

export default function SignOut() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    // sleep(3000).then(() => router.refresh());
    supabase.auth.signOut().then(() => router.refresh());
  }, []);

  return (
    <main className="h-screen">
      <h1>Signing out...</h1>
    </main>
  );
}
