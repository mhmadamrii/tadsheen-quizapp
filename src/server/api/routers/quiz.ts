import { z } from "zod";
import { createClient } from "~/lib/supabase/server";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
  supabaseProcedure,
} from "~/server/api/trpc";

export const quizRouter = createTRPCRouter({
  createQuiz: supabaseProcedure
    .input(
      z.object({
        category: z.string(),
        title: z.string(),
        language: z.string().optional(),
        questions: z.array(
          z.object({
            question: z.string(),
            answers: z.array(
              z.object({
                value: z.string(),
              }),
            ),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.getUser();
      const { title, language, questions, category } = input;

      const quiz = await ctx.db.quiz.create({
        data: {
          title,
          category,
          language,
          createdBy: ctx.session.user.id, // Assuming `ctx.session.user.id` is the user creating the quiz
          questions: {
            create: questions.map((q) => ({
              question: q.question,
              answers: {
                create: q.answers.map((a) => ({
                  value: a.value,
                })),
              },
            })),
          },
        },
      });

      return quiz;
    }),
});
