"use client";

import { Languages } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

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
    <div className="ml-0 flex items-center gap-4 sm:ml-auto">
      <Languages className="h-6 w-6" />
      <Select
        onValueChange={(value) => {
          changeLang(value);
        }}
        defaultValue={currentLang}
      >
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="ar">العربية</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
