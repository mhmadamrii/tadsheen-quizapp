import Link from "next/link";

import { api } from "~/trpc/server";
import { useTranslations } from "next-intl";
import { QuizCardSkeleton } from "../../_components/quiz-card-skeleton";
import { NoQuiz } from "../../_components/no-quiz";
import { DialogOfferLogin } from "../../_components/dialog-offer-login";
import { Suspense } from "react";
import { Button } from "~/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { cn } from "~/lib/utils";

const QuizCategoryCard = ({
  currentUser,
  quizByCategory,
  isRTL,
}: {
  currentUser: any;
  quizByCategory: any;
  isRTL: boolean;
}) => {
  const t = useTranslations("quiz_categories");
  return (
    <section className="mt-[20px] flex min-h-[80vh] flex-row flex-wrap items-center justify-center gap-2 rounded-md border py-4">
      {quizByCategory.map((quiz: any) => (
        <Card key={quiz.id} className="w-full sm:w-[300px]">
          <CardHeader>
            <CardTitle>{quiz.title}</CardTitle>
            <CardDescription
              className={cn("flex items-center gap-2", {
                "flex-row-reverse": isRTL,
              })}
            >
              <span>{t("by")}</span>
              <span>{quiz.user.name}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col justify-between">
            <div>
              <h1 className={cn("text-xl", { "text-right": isRTL })}>
                {t("questions")}:{" "}
                {isRTL
                  ? new Intl.NumberFormat("ar-EG").format(quiz._count.questions)
                  : quiz._count.questions}
              </h1>
              <h1 className={cn("text-xl", { "text-right": isRTL })}>
                {t("submissions")}:{" "}
                {isRTL
                  ? new Intl.NumberFormat("ar-EG").format(
                      quiz._count.submissions,
                    )
                  : quiz._count.submissions}
              </h1>
            </div>

            <div></div>
          </CardContent>
          <CardFooter className="h-full">
            {currentUser?.user ? (
              <Button className="w-full" asChild>
                <Link href={`/answer/${quiz.id}`}>{t("take_quiz")}</Link>
              </Button>
            ) : (
              <DialogOfferLogin redirecTo={`/answer/${quiz.id}` ?? ""} />
            )}
          </CardFooter>
        </Card>
      ))}
    </section>
  );
};

const QuizByCategoryWithServerData = async ({
  locale,
  categoryId,
}: {
  locale: string;
  categoryId: string;
}) => {
  const [quizByCategory, currentUser] = await Promise.all([
    api.quiz.getQuizByCategory({ categoryId }),
    api.spAuth.getCurrentUser(),
  ]);

  if (quizByCategory.length === 0) {
    return <NoQuiz />;
  }

  return (
    <QuizCategoryCard
      quizByCategory={quizByCategory}
      currentUser={currentUser}
      isRTL={locale === "ar"}
    />
  );
};

export default async function QuizByCategoryId({
  params,
}: {
  params: Promise<{ categoryId: string; locale: string }>;
}) {
  const locale = (await params).locale;
  const categoryId = (await params).categoryId;

  console.log("locale", locale);

  return (
    <main className="mx-auto w-full sm:max-w-4xl">
      <Suspense fallback={<QuizCardSkeleton />}>
        <QuizByCategoryWithServerData locale={locale} categoryId={categoryId} />
      </Suspense>
    </main>
  );
}
