import Link from "next/link";

import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { QUIZZEZ_CATEGORY } from "~/lib/constants";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/components/ui/card";

export default function Quizes({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const t = useTranslations("quiz_categories");

  return (
    <main className="mx-auto w-full px-8">
      <div className="container mx-auto py-8">
        <h1 className="mb-6 text-center text-3xl font-bold">
          {t("available_quizzes")}
        </h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {QUIZZEZ_CATEGORY.map((quiz) => (
            <Link
              href={`/quiz/${quiz.id}`}
              key={quiz.id}
              className="transition-transform hover:scale-105"
            >
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <quiz.icon className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>{t(quiz.t)}</CardTitle>
                    <CardDescription>{t(quiz.t_desc)}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
