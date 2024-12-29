"use client";

import Link from "next/link";

import { SchoolIcon as MortarBoardIcon } from "lucide-react";
import { LanguageSwitcher } from "./language-switcher";
import { api } from "~/trpc/react";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { cn } from "~/lib/utils";
import { ModeToggle } from "./theme-toggle";
import { useTranslations } from "next-intl";

export function Navbar({ currentLang }: { currentLang: string }) {
  const t = useTranslations("HomePage");
  const pathname = usePathname();
  const { data: user } = api.spAuth.getCurrentUser.useQuery();

  return (
    <header className="flex items-center justify-between border-b px-4 py-4 lg:px-6">
      <Link
        href="/dashboard"
        className="flex items-center justify-center gap-2"
      >
        <MortarBoardIcon className="h-6 w-6" />
        <span className="text-2xl font-bold">QuizMaster</span>
      </Link>

      <div className={cn("flex items-center gap-7")}>
        <div className="flex items-center gap-2">
          {!user?.user && (
            <Button
              className={cn("", {
                hidden: pathname === "/en" || pathname === "/ar",
              })}
              variant="ghost"
              asChild
            >
              <Link href="/auth">Login</Link>
            </Button>
          )}
          {user?.user && (
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link href="/dashboard">
                    <Button variant="ghost">{t("dashboard")}</Button>
                  </Link>
                </li>
                <li>
                  <Link href="/quiz-category">
                    <Button variant="ghost">{t("quizzes")}</Button>
                  </Link>
                </li>
                <li>
                  <Button variant="outline" asChild>
                    <Link href="/signout">{t("logout")}</Link>
                  </Button>
                </li>
              </ul>
            </nav>
          )}
          <ModeToggle />
        </div>
        <LanguageSwitcher currentLang={currentLang} />
      </div>
    </header>
  );
}
