import { Suspense } from "react";
import { api } from "~/trpc/server";
import { EditQuizForm } from "../../_components/edit-quiz-form";

const QuizByCategoryWithServerData = async ({ id }: { id: string }) => {
  const quizById = await api.quiz.getQuizById({ quizId: id });
  return <EditQuizForm quizById={quizById} />;
};

export default async function EditQuiz({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const quizId = (await params).id;
  return (
    <section>
      <Suspense fallback={<div>Loading...</div>}>
        <QuizByCategoryWithServerData id={quizId} />
      </Suspense>
    </section>
  );
}
