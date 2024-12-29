"use client";

import Link from "next/link";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import { Navbar } from "~/components/navbar";

export function LandingPageClient({ currentLang }: { currentLang: string }) {
  const t = useTranslations("HomePage");
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar currentLang={currentLang} />
      <main className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md px-4 py-8">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-4xl font-bold">{t("welcome")}</h1>
            <p className="text-xl text-gray-600">{t("test_your_knowledge")}</p>
          </div>
          <div className="flex flex-col gap-2 rounded-lg bg-gray-100 p-8 shadow-md">
            <div className="flex flex-col gap-4">
              <Button
                onClick={() => router.push("/quiz-category")}
                className="group flex items-center justify-center gap-2 rounded-lg px-4 py-2 transition-all hover:gap-4"
              >
                <span>{t("getting_started")}</span>
                <span className="transform transition-transform duration-300 group-hover:translate-x-2">
                  <ArrowRight />
                </span>
              </Button>
            </div>
            <div className="flex flex-col gap-4">
              <Button
                variant="outline"
                onClick={() => router.push("/auth")}
                className="group flex items-center justify-center gap-2 rounded-lg px-4 py-2 transition-all hover:gap-4"
              >
                {t("login")}
              </Button>
            </div>
          </div>
        </div>
      </main>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 QuizMaster. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <Link className="text-xs underline-offset-4 hover:underline" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs underline-offset-4 hover:underline" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
