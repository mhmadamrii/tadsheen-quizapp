import Link from "next/link";

import { ModeToggle } from "./theme-toggle";
import { AlignJustify } from "lucide-react";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./language-switcher";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { cn } from "~/lib/utils";

export function MobileNav({
  user,
  currentLang,
}: {
  user: any;
  currentLang: string;
}) {
  const t = useTranslations("HomePage");

  return (
    <Sheet>
      <SheetTrigger
        className="flex items-center justify-center sm:hidden"
        asChild
      >
        <Button variant="outline" size="icon">
          <AlignJustify />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>QuizMaster</SheetTitle>
          <SheetDescription></SheetDescription>
          <div className="flex w-full flex-col justify-center gap-4">
            {!user && (
              <>
                <Link href="/auth">
                  <Button
                    variant="outline"
                    className={cn("flex w-full justify-start")}
                  >
                    {t("login")}
                  </Button>
                </Link>
                <ModeToggle />
              </>
            )}
            {user && (
              <>
                <Link href="/dashboard">
                  <Button
                    variant="outline"
                    className="flex w-full justify-start"
                  >
                    {t("dashboard")}
                  </Button>
                </Link>

                <Link href="/quiz-category">
                  <Button
                    variant="outline"
                    className="flex w-full justify-start"
                  >
                    {t("quizzes")}
                  </Button>
                </Link>

                <Link href="/signout">
                  <Button
                    variant="outline"
                    className="flex w-full justify-start"
                  >
                    {t("logout")}
                  </Button>
                </Link>
              </>
            )}
            <div className="flex w-full justify-center gap-2">
              <LanguageSwitcher currentLang={currentLang} />
            </div>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
