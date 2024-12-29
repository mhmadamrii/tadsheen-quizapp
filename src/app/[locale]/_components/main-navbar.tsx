import Link from "next/link";

import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "~/components/language-switcher";
import { Button } from "~/components/ui/button";
import { ModeToggle } from "~/components/theme-toggle";

export function MainNavbar({ currentLang }: { currentLang: string }) {
  const t = useTranslations("HomePage");
  return (
    <div className="flex items-center gap-7">
      <div className="flex items-center gap-2">
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
        <ModeToggle />
      </div>
      <LanguageSwitcher currentLang={currentLang} />
    </div>
  );
}
