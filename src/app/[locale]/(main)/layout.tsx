import Link from "next/link";

import { redirect } from "next/navigation";
import { LanguageSwitcher } from "~/components/language-switcher";
import { Button } from "~/components/ui/button";
import { createClient } from "~/lib/supabase/server";
import { OnboardingDialog } from "./dashboard/_components/onboarding-dialog";
import { api } from "~/trpc/server";

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
  // console.log(error);

  if (!data.user) {
    redirect("/");
  }
  return (
    <div className="flex min-h-screen flex-col">
      {!user && <OnboardingDialog user={data.user} />}

      <header className="border-b px-5">
        <div className="container mx-auto flex items-center justify-between py-4">
          <Link href="/dashboard" className="text-2xl font-bold">
            QuizMaster
          </Link>
          <div className="flex items-center gap-2">
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link href="/dashboard">
                    <Button variant="ghost">Dashboard</Button>
                  </Link>
                </li>
                <li>
                  <Link href="/quiz-category">
                    <Button variant="ghost">Quizzes</Button>
                  </Link>
                </li>
                <li>
                  <Link href="/profile">
                    <Button variant="ghost">Profile</Button>
                  </Link>
                </li>
                <li>
                  <Button variant="outline" asChild>
                    <Link href="/signout">Logout</Link>
                  </Button>
                </li>
              </ul>
            </nav>
            <LanguageSwitcher currentLang={currentLang} />
          </div>
        </div>
      </header>
      <main className="flex-grow px-5">{children}</main>
      <footer className="border-t">
        <div className="container mx-auto py-4 text-center text-sm text-gray-500">
          © 2023 QuizMaster. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
