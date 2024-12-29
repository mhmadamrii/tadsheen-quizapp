"use client";

import Link from "next/link";

import { PlusCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import { DashboardTable } from "./_components/dashboard-table";
import { useTranslations } from "next-intl";

export default function DashboardPage() {
  const t = useTranslations("dashboard");
  return (
    <div className="mx-auto w-full py-8 sm:max-w-4xl">
      <div className="mb-6 flex items-center justify-between">
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
}
