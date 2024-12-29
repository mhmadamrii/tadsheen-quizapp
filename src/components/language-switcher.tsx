"use client";

import { Languages } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { Switch } from "./ui/switch";
import { useState } from "react";

export function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecked, setChecked] = useState(currentLang === "ar");

  const changeLang = (lang: string) => {
    const pathWithoutLang = pathname.replace(/^\/(en|ar)/, "");
    const newPath = `/${lang}${pathWithoutLang}`;
    router.push(newPath);
    router.refresh();
  };

  return (
    <div className="ml-auto flex items-center gap-4">
      <Languages className="h-6 w-6" />
      <div>
        <Switch
          onClick={() => changeLang(currentLang === "en" ? "ar" : "en")}
          checked={isChecked}
          onCheckedChange={setChecked}
        />
      </div>
    </div>
  );
}
