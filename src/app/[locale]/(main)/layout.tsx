import Link from "next/link";

import { redirect } from "next/navigation";
import { createClient } from "~/lib/supabase/server";
import { OnboardingDialog } from "./dashboard/_components/onboarding-dialog";
import { api } from "~/trpc/server";
import { SchoolIcon as MortarBoardIcon } from "lucide-react";
import { MainNavbar } from "../_components/main-navbar";
import { MainFooter } from "../_components/main-footer";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const currentLang = (await params).locale;
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  const user = await api.spAuth.getUser({ email: data?.user?.email ?? "" });

  if (!data.user) {
    redirect("/");
  }
  return (
    <div className="flex min-h-screen flex-col">
      {!user && <OnboardingDialog user={data.user} />}
      <header className="w-full border-b px-5">
        <div className="container mx-auto flex items-center justify-between py-4">
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 text-2xl font-bold"
          >
            <MortarBoardIcon className="h-6 w-6" />
            QuizMaster
          </Link>
          <MainNavbar currentLang={currentLang} />
        </div>
      </header>
      <main className="flex-grow px-5">{children}</main>
      <MainFooter />
    </div>
  );
}
