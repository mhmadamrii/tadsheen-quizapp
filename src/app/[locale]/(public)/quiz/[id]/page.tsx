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
          <CardContent>
            <h1 className="text-xl">Questions: {quiz._count.questions}</h1>
            <h1 className="text-xl">Submission: {quiz._count.submissions}</h1>
          </CardContent>
          <CardFooter>
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
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return (
    <main className="mx-auto h-screen border">
      <Link href="/dashboard" className="text-2xl font-bold">
        Back
      </Link>
      <Suspense fallback={<div>Loading...</div>}>
        <QuizByCategoryWithServerData categoryId={id} />
      </Suspense>
    </main>
  );
}
