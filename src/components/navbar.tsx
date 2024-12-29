"use client";

import Link from "next/link";

import { SchoolIcon as MortarBoardIcon } from "lucide-react";
import { LanguageSwitcher } from "./language-switcher";
import { api } from "~/trpc/react";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { cn } from "~/lib/utils";

export function Navbar({ currentLang }: { currentLang: string }) {
  const pathname = usePathname();
  const { data: user } = api.spAuth.getCurrentUser.useQuery();

  return (
    <header className="flex h-14 items-center justify-between border-b px-4 lg:px-6">
      <Link href="/" className="flex items-center justify-center">
        <MortarBoardIcon className="h-6 w-6" />
        <span className="ml-2 text-2xl font-bold">QuizMaster</span>
      </Link>

      <div className={cn("flex items-center gap-2")}>
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
        <LanguageSwitcher currentLang={currentLang} />
      </div>
    </header>
  );
}
