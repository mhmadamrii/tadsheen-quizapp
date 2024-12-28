"use client";

import Link from "next/link";

import { Label } from "~/components/ui/label";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { api } from "~/trpc/react";

export function QuizAnswer({ quiz }: { quiz: any }) {
  console.log("quiz", quiz);
  const [userAnswers, setUserAnswers] = useState({});
  console.log("userAnswers", userAnswers);
  const { mutate } = api.quiz.submitQuizAndCalculateScore.useMutation({
    onSuccess: (data) => {
      console.log("data", data);
    },
  });

  const handleSubmitQuiz = () => {
    mutate({
      quizId: quiz.id,
      answers: Object.keys(userAnswers).map((questionId) => ({
        questionId,
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
                    value={(index + 1).toString()}
                    id={`q${question.id}-${index}`}
                  />
                  <Label htmlFor={`q${question.id}-${index}`}>
                    {choice.value}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      ))}
      <div>
        <Button onClick={() => handleSubmitQuiz()}>Submit Answer</Button>
      </div>
    </section>
  );
}
