"use client";

import Link from "next/link";

import { SchoolIcon as MortarBoardIcon } from "lucide-react";
import { LanguageSwitcher } from "./language-switcher";

export function Navbar({ currentLang }: { currentLang: string }) {
  return (
    <header className="flex h-14 items-center px-4 lg:px-6">
      <Link href="/" className="flex items-center justify-center">
        <MortarBoardIcon className="h-6 w-6" />
        <span className="ml-2 text-2xl font-bold">QuizMaster</span>
      </Link>
      <LanguageSwitcher currentLang={currentLang} />
    </header>
  );
}
