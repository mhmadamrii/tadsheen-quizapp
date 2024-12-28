import { api } from "~/trpc/server";
import { Suspense } from "react";
import { QuizAnswer } from "../../_components/quiz-answer";

const QuizByIdWithServerData = async ({ quizId }: { quizId: string }) => {
  const quizById = await api.quiz.getQuizById({ quizId });
  console.log("quizById", quizById);

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
      <Suspense fallback={<div>Loading...</div>}>
        <QuizByIdWithServerData quizId={quizId} />
      </Suspense>
    </main>
  );
}
