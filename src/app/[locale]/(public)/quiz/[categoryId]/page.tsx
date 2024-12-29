import Link from "next/link";

import { api } from "~/trpc/server";
import { QuizCardSkeleton } from "../../_components/quiz-card-skeleton";
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

const QuizByCategoryWithServerData = async ({
  categoryId,
}: {
  categoryId: string;
}) => {
  const [quizByCategory, currentUser] = await Promise.all([
    api.quiz.getQuizByCategory({ categoryId }),
    api.spAuth.getCurrentUser(),
  ]);

  console.log("current user", currentUser);

  if (quizByCategory.length === 0) {
    return (
      <div className="flex h-[80vh] w-full flex-1 items-center justify-center text-center">
        <h1 className="text-3xl">No quizzes found for this category</h1>
      </div>
    );
  }

  return (
    <section className="mt-[20px] flex min-h-[80vh] flex-row flex-wrap items-center justify-center gap-2 rounded-md border py-4">
      {quizByCategory.map((quiz) => (
        <Card key={quiz.id} className="w-full sm:w-[300px]">
          <CardHeader>
            <CardTitle>{quiz.title}</CardTitle>
            <CardDescription>by {quiz.user.name}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col justify-between">
            <div>
              <h1 className="text-xl">Questions: {quiz._count.questions}</h1>
              <h1 className="text-xl">Submission: {quiz._count.submissions}</h1>
            </div>

            <div></div>
          </CardContent>
          <CardFooter className="h-full">
            {currentUser?.user ? (
              <Button className="w-full" asChild>
                <Link href={`/answer/${quiz.id}`}>Take Quiz</Link>
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

export default async function QuizByCategoryId({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const categoryId = (await params).categoryId;

  return (
    <main className="mx-auto w-full sm:max-w-4xl">
      <Suspense fallback={<QuizCardSkeleton />}>
        <QuizByCategoryWithServerData categoryId={categoryId} />
      </Suspense>
    </main>
  );
}
