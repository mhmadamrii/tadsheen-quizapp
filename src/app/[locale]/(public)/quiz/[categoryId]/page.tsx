import Link from "next/link";

import { api } from "~/trpc/server";
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
  const quizByCategory = await api.quiz.getQuizByCategory({
    categoryId,
  });
  return (
    <section className="flex flex-row flex-wrap items-center justify-center gap-2">
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
            <Button className="w-full" asChild>
              <Link href={`/answer/${quiz.id}`}>Take Quiz</Link>
            </Button>
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
    <main className="mx-auto">
      <Suspense fallback={<div>Loading...</div>}>
        <QuizByCategoryWithServerData categoryId={categoryId} />
      </Suspense>
    </main>
  );
}
