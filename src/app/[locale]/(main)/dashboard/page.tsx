import Link from "next/link";

import { PlusCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import { DashboardTable } from "./_components/dashboard-table";
import { useTranslations } from "next-intl";
import { cn } from "~/lib/utils";
import { ForceRefresh } from "~/components/force-refresh";

const DashboardContent = ({ isRTL }: { isRTL: boolean }) => {
  const t = useTranslations("dashboard");
  return (
    <div className="mx-auto w-full py-8 sm:max-w-4xl">
      <ForceRefresh />
      <div
        className={cn("mb-6 flex items-center justify-between", {
          "flex-row-reverse": isRTL,
        })}
      >
        <h1 className="text-3xl font-bold">{t("your_quizzes")}</h1>
        <Link href="/quiz/create">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> {t("create_new_quiz")}
          </Button>
        </Link>
      </div>
      <DashboardTable />
    </div>
  );
};

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;

  return <DashboardContent isRTL={locale === "ar"} />;
}
