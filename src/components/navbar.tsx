"use client";

import Link from "next/link";

import { Languages } from "lucide-react";
import { SchoolIcon as MortarBoardIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export function Navbar({ currentLang }: { currentLang: string }) {
  const router = useRouter();
  const pathname = usePathname();

  console.log("pathname", pathname);

  const changeLang = (lang: string) => {
    console.log("changing lang", lang);

    const pathWithoutLang = pathname.replace(/^\/(en|ar)/, "");

    const newPath = `/${lang}${pathWithoutLang}`;
    router.push(newPath);
    router.refresh();
  };

  return (
    <header className="flex h-14 items-center px-4 lg:px-6">
      <Link href="/" className="flex items-center justify-center">
        <MortarBoardIcon className="h-6 w-6" />
        <span className="ml-2 text-2xl font-bold">QuizMaster</span>
      </Link>
      <div
        onClick={() => changeLang(currentLang === "en" ? "ar" : "en")}
        className="ml-auto flex cursor-pointer items-center gap-4"
      >
        <Languages className="h-6 w-6" />
      </div>
    </header>
  );
}
