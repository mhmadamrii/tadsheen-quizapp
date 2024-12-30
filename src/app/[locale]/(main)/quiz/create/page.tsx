"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Question } from "~/lib/types";
import { EditQuestionDialog } from "../_components/edit-question-dialog";
import { useRouter } from "nextjs-toploader/app";
import { Spinner } from "~/components/spinner";
import { toast } from "sonner";
import { api } from "~/trpc/react";
import { cn } from "~/lib/utils";
import { useTranslations } from "next-intl";
import { Separator } from "~/components/ui/separator";
import { useForm } from "react-hook-form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Switch } from "~/components/ui/switch";
import { ChevronDown, ChevronUp, Pencil, Plus, Trash } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

const FormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  question: z.string().min(1, "Question is required"),
  static_answer: z.string().optional(),
  category: z.string().min(1, "Category is required"),
});

export default function CreateQuiz() {
  const t = useTranslations("quiz_form");
  const tq = useTranslations("quiz_categories");
  const router = useRouter();
  const pathname = usePathname();

  const [selectedEditableIdx, setSelectedEditableIdx] = useState(0);
  const [correctAnswerId, setCorrectAnswerId] = useState("");
  const [isOpenDialogEditQuestion, setIsOpenDialogEditQuestion] = useState(false); // prettier-ignore
  const [isShowPreviousQ, setIsShowPreviousQ] = useState(true);
  const [isMultipleAnswers, setIsMultipleAnswers] = useState(false);
  const [multipleQuestions, setMultipleQuestions] = useState<Question[]>([
    {
      id: 1,
      question: "",
      answers: [],
      static_answer: "",
      correctAnswerId: "",
    },
  ]);

  const [multipleAnswers, setMultipleAnswers] = useState([
    {
      id: 1,
      value: "",
    },
  ]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      question: "",
      static_answer: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    toast.success("Successfully added question");
    setMultipleQuestions((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        question: data.question,
        answers: multipleAnswers,
        static_answer: isMultipleAnswers ? "" : (data.static_answer ?? ""),
        correctAnswerId,
      },
    ]);
    form.setValue("question", "");
    form.setValue("static_answer", "");
    setMultipleAnswers([
      {
        id: 1,
        value: "",
      },
    ]);
  };

  const addAnswer = () => {
    setCorrectAnswerId("");
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

  const { mutate, isPending } = api.quiz.createQuiz.useMutation({
    onSuccess: () => {
      toast.success("Successfully created quiz");
      router.push("/dashboard");
    },
  });

  const handleCreateQuiz = () => {
    const transformedQuestions = multipleQuestions.slice(1).map((item) => ({
      correctAnswerId: item.correctAnswerId,
      question: item.question,
      answers: item.answers.map((answer) => ({
        value: answer.value,
      })),
    }));

    mutate({
      title: form.getValues("title"),
      category: form.getValues("category"),
      language: "English",
      questions: transformedQuestions,
    });
  };

  return (
    <main className="mx-auto flex h-full max-w-4xl flex-col items-center justify-center gap-3 py-5">
      <h1 className="text-3xl font-bold">{t("create_quiz")}</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem
                className={cn("flex flex-col", {
                  "items-end": pathname.includes("ar"),
                })}
              >
                <FormLabel>{t("title")}</FormLabel>
                <FormControl>
                  <Input
                    className={cn("", {
                      "text-end": pathname.includes("ar"),
                    })}
                    disabled={isPending}
                    placeholder="Quiz title"
                    {...field}
                  />
                </FormControl>
                <FormDescription>{t("title_desc")}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex w-full gap-2">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="w-full sm:w-1/2">
                  <FormLabel>{t("category")}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("select_category")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">
                        {tq("general_knowledge")}
                      </SelectItem>
                      <SelectItem value="2">{tq("science_quiz")}</SelectItem>
                      <SelectItem value="3">{tq("history_trivia")}</SelectItem>
                      <SelectItem value="4">{tq("pop_culture")}</SelectItem>
                      <SelectItem value="5">
                        {tq("geography_challenge")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>{t("quiz_category_desc")}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator />

          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <h1 className="text-xl font-semibold text-gray-500">
                {t("total_questions")} ({multipleQuestions.length - 1})
              </h1>

              <Button
                type="button"
                onClick={() => setIsShowPreviousQ(!isShowPreviousQ)}
              >
                {isShowPreviousQ ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </div>

            {isShowPreviousQ && (
              <>
                {multipleQuestions.length === 1 && (
                  <h1 className="text-center text-xl font-bold italic text-gray-500">
                    {t("no_questions_found")}
                  </h1>
                )}
                <ul>
                  {multipleQuestions.map((q, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-2"
                    >
                      <li
                        className={cn("list-disc text-xl", {
                          hidden: i == 0,
                        })}
                      >
                        {q.question}
                      </li>

                      <div className="flex items-center gap-2">
                        {i !== 0 && (
                          <>
                            <Button
                              type="button"
                              onClick={() => {
                                setIsOpenDialogEditQuestion(true);
                                setSelectedEditableIdx(i);
                              }}
                              size="icon"
                            >
                              <Pencil />
                            </Button>
                            <EditQuestionDialog
                              isOpenDialogEditQuestion={
                                isOpenDialogEditQuestion &&
                                selectedEditableIdx === i
                              }
                              setIsOpenDialogEditQuestion={
                                setIsOpenDialogEditQuestion
                              }
                              setMultipleQuestions={setMultipleQuestions}
                              question={multipleQuestions[i]}
                            />
                          </>
                        )}
                        {i !== 0 && (
                          <Button
                            onClick={() => {
                              setMultipleQuestions(
                                multipleQuestions.filter(
                                  (q, index) => index !== i,
                                ),
                              );
                            }}
                            type="button"
                            variant="destructive"
                            size="icon"
                          >
                            <Trash />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </ul>
              </>
            )}
          </div>

          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center gap-2">
              <FormLabel className="text-3xl font-semibold">
                {t("add_question")}
              </FormLabel>
            </div>
          </div>

          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem
                className={cn("flex flex-col", {
                  "items-end": pathname.includes("ar"),
                })}
              >
                <FormLabel>{t("question")}</FormLabel>
                <FormControl>
                  <Input
                    className={cn("", {
                      "text-end": pathname.includes("ar"),
                    })}
                    disabled={isPending}
                    placeholder="What is end of time?"
                    {...field}
                  />
                </FormControl>
                <FormDescription>{t("question_desc")}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-end space-x-4">
            <Button type="button" onClick={addAnswer}>
              <Plus />
            </Button>
          </div>

          <div className="space-y-4">
            {multipleAnswers.map((answer, index) => (
              <div key={index} className="flex items-center space-x-4">
                <Input
                  className={cn("", {
                    "text-end": pathname.includes("ar"),
                  })}
                  disabled={isPending}
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
                  {t("remove")}
                </Button>
                <div className="flex items-center space-x-2">
                  <input
                    disabled={isPending}
                    type="radio"
                    id={`correct-answer-${answer.id}`}
                    name="correct-answer"
                    value={answer.id}
                    checked={correctAnswerId === answer.id.toString()}
                    onChange={() => setCorrectAnswerId(answer.id.toString())}
                  />
                  <label htmlFor={`correct-answer-${answer.id}`}>
                    {t("correct_answer")}
                  </label>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button disabled={correctAnswerId === ""} type="submit">
              {t("create_question")}
            </Button>
            <Button
              className="w-full sm:w-[120px]"
              onClick={handleCreateQuiz}
              disabled={multipleQuestions.length <= 1}
              type="button"
            >
              {isPending ? <Spinner /> : t("submit_quiz")}
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
}
