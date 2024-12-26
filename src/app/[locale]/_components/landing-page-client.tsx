import Link from "next/link";

import { Languages } from "lucide-react";
import { SchoolIcon as MortarBoardIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { LoginButton } from "./login-button";
import { RegisterButton } from "./register-button";

export function LandingPageClient({ currentLang }: { currentLang: string }) {
  const t = useTranslations("HomePage");

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-14 items-center px-4 lg:px-6">
        <Link href="/" className="flex items-center justify-center">
          <MortarBoardIcon className="h-6 w-6" />
          <span className="ml-2 text-2xl font-bold">QuizMaster</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Link href={currentLang === "en" ? "/ar" : "/en"}>
            <Languages className="h-6 w-6" />
          </Link>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md px-4 py-8">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-4xl font-bold">{t("welcome")}</h1>
            <p className="text-xl text-gray-600">{t("test_your_knowledge")}</p>
          </div>
          <div className="rounded-lg bg-gray-100 p-8 shadow-md">
            <div className="flex flex-col gap-4">
              <LoginButton />
              <RegisterButton />
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
