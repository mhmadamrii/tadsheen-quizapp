"use client";

import { Languages } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const changeLang = (lang: string) => {
    const pathWithoutLang = pathname.replace(/^\/(en|ar)/, "");
    const newPath = `/${lang}${pathWithoutLang}`;
    router.push(newPath);
    router.refresh();
  };

  return (
    <div
      onClick={() => changeLang(currentLang === "en" ? "ar" : "en")}
      className="ml-auto flex cursor-pointer items-center gap-4"
    >
      <Languages className="h-6 w-6" />
    </div>
  );
}
