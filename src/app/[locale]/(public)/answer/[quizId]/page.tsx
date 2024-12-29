import { api } from "~/trpc/server";
import { Suspense } from "react";
import { QuizAnswer } from "../../_components/quiz-answer";
import { QuizCardSkeleton } from "../../_components/quiz-card-skeleton";

const QuizByIdWithServerData = async ({ quizId }: { quizId: string }) => {
  const quizById = await api.quiz.getQuizById({ quizId });

  return <QuizAnswer quiz={quizById} />;
};

export default async function AnswerByQuizId({
  params,
}: {
  params: Promise<{ quizId: string }>;
}) {
  const quizId = (await params).quizId;

  return (
    <main className="mx-auto max-w-4xl">
      <Suspense fallback={<QuizCardSkeleton />}>
        <QuizByIdWithServerData quizId={quizId} />
      </Suspense>
    </main>
  );
}
