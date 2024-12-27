"use client";

import { useState } from "react";
import { cn } from "~/lib/utils";
import { useForm } from "react-hook-form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Switch } from "~/components/ui/switch";
import { Plus, Trash } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

type Answer = { id: number; value: string };
type Question = {
  id: number;
  question: string;
  answers: Answer[];
  static_answer: string;
};

const FormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  question: z.string().min(1, "Question is required"),
  static_answer: z.string().optional(),
});

export default function CreateQuiz() {
  const [isShowPreviousQ, setIsShowPreviousQ] = useState(false);

  const [multipleQuestions, setMultipleQuestions] = useState<Question[]>([
    { id: 1, question: "", answers: [], static_answer: "" },
  ]);

  const [multipleAnswers, setMultipleAnswers] = useState([
    { id: 1, value: "" },
  ]);

  const [isMultipleAnswers, setIsMultipleAnswers] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      question: "",
      static_answer: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    setMultipleQuestions((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        question: data.question,
        answers: multipleAnswers,
        static_answer: isMultipleAnswers ? "" : (data.static_answer ?? ""),
      },
    ]);
    form.setValue("question", "");
    form.setValue("static_answer", "");
    setMultipleAnswers([]);
  };

  const addAnswer = () => {
    setMultipleAnswers((prev) => [...prev, { id: prev.length + 1, value: "" }]);
  };

  const removeAnswer = (id: number) => {
    setMultipleAnswers((prev) => prev.filter((answer) => answer.id !== id));
  };

  const updateAnswer = (id: number, value: string) => {
    setMultipleAnswers((prev) =>
      prev.map((answer) => (answer.id === id ? { ...answer, value } : answer)),
    );
  };

  console.log("multiple question", multipleQuestions.slice(1));

  return (
    <main className="mx-auto flex h-full items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[800px] space-y-6"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Quiz title" {...field} />
                </FormControl>
                <FormDescription>Your quiz title</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <h1 className="text-3xl font-semibold">
                Total Questions({multipleQuestions.length - 1})
              </h1>

              <Button
                type="button"
                onClick={() => setIsShowPreviousQ(!isShowPreviousQ)}
              >
                Show previous questions
              </Button>
            </div>

            {isShowPreviousQ && (
              <ul>
                {multipleQuestions.map((q, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border p-2"
                  >
                    <li
                      className={cn("list-disc", {
                        hidden: i == 0,
                      })}
                    >
                      {q.question}
                    </li>
                    {i !== 0 && (
                      <Button
                        onClick={() =>
                          setMultipleQuestions(
                            multipleQuestions.filter((q, index) => index !== i),
                          )
                        }
                        type="button"
                        variant="destructive"
                        size="icon"
                      >
                        <Trash />
                      </Button>
                    )}
                  </div>
                ))}
              </ul>
            )}
          </div>

          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center gap-2">
              <FormLabel className="text-3xl font-semibold">
                Add Question
              </FormLabel>
            </div>
          </div>

          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question</FormLabel>
                <FormControl>
                  <Input placeholder="What is end of time?" {...field} />
                </FormControl>
                <FormDescription>Your Question</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center gap-2">
              <FormLabel>Allow Multiple Answers</FormLabel>
              <Switch
                checked={isMultipleAnswers}
                onCheckedChange={() => setIsMultipleAnswers(!isMultipleAnswers)}
              />
            </div>
            <Button
              disabled={!isMultipleAnswers}
              type="button"
              onClick={addAnswer}
            >
              <Plus />
            </Button>
          </div>

          {isMultipleAnswers ? (
            <div className="space-y-4">
              {multipleAnswers.map((answer, index) => (
                <div key={answer.id} className="flex items-center space-x-4">
                  <Input
                    placeholder={`Answer ${index + 1}`}
                    value={answer.value}
                    onChange={(e) => updateAnswer(answer.id, e.target.value)}
                    name={`answers[${index}]`}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => removeAnswer(answer.id)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <FormField
              control={form.control}
              name="static_answer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Static Answer</FormLabel>
                  <FormControl>
                    <Input placeholder="Static answer" {...field} />
                  </FormControl>
                  <FormDescription>Your static answer</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <div className="flex items-center gap-2">
            <Button type="submit">Create Question</Button>
            <Button disabled={multipleQuestions.length <= 1} type="submit">
              Submit Quiz
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
}
