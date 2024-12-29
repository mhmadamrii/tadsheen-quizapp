"use client";

import Link from "next/link";
import Confetti from "react-confetti";

import { Label } from "~/components/ui/label";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { api } from "~/trpc/react";
import { Spinner } from "~/components/spinner";
import { cn } from "~/lib/utils";
import { ResultDialog } from "./result-dialog";

export function QuizAnswer({ quiz }: { quiz: any }) {
  console.log("quiz", quiz);
  const [isExploding, setIsExploding] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [userResult, setUserResult] = useState(null);

  const { mutate, isPending } =
    api.quiz.submitQuizAndCalculateScore.useMutation({
      onSuccess: async (data) => {
        setUserResult(data);
        if (data.score === quiz._count.questions) {
          setIsExploding(true);
        }
        setIsShowAnswer(true);
      },
    });

  const handleSubmitQuiz = () => {
    mutate({
      quizId: quiz.id,
      answers: Object.keys(userAnswers).map((questionId) => ({
        questionId,
        // @ts-expect-error
        answerId: userAnswers[questionId],
      })),
    });
  };

  return (
    <section className="flex flex-col gap-3">
      <div>
        <h1 className="text-xl font-bold">Title: {quiz.title}</h1>
        <h1 className="text-xl font-bold">Category: {quiz.category}</h1>
        <h1 className="text-xl font-bold">Author: {quiz.user.name}</h1>
        <Link href="/dashboard">Back to dashboard</Link>
      </div>
      {isShowAnswer && (
        <ResultDialog
          questionCount={quiz._count.questions}
          score={userResult?.score}
        />
      )}
      {isExploding && (
        <Confetti
          recycle={false}
          numberOfPieces={200}
          onConfettiComplete={(c) => setIsExploding(false)}
        />
      )}
      {quiz?.questions?.map((question) => (
        <Card key={question.id} className="mb-4">
          <CardHeader>
            <CardTitle>{question.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              onValueChange={(value) =>
                setUserAnswers((prev) => ({
                  ...prev,
                  [question.id]: value,
                }))
              }
            >
              {question.answers?.map((choice, index) => (
                <div
                  key={`${question.id}-${index}`}
                  className="flex items-center space-x-2"
                >
                  <RadioGroupItem
                    disabled={isShowAnswer}
                    value={(index + 1).toString()}
                    id={`q${question.id}-${index}`}
                  />
                  <Label
                    className={cn("", {
                      "line-through":
                        !(index + 1 == question.correctAnswerId) &&
                        isShowAnswer,
                    })}
                    htmlFor={`q${question.id}-${index}`}
                  >
                    {choice.value}
                  </Label>
                  {isShowAnswer && (
                    <div>
                      <h1>
                        {index + 1 == question.correctAnswerId ? "✅" : "❌"}
                      </h1>
                    </div>
                  )}
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      ))}
      <div>
        <Button
          className="w-full sm:w-[120px]"
          disabled={isPending || isShowAnswer}
          onClick={() => handleSubmitQuiz()}
        >
          {isPending ? <Spinner /> : "Submit Answer"}
        </Button>
      </div>
    </section>
  );
}
