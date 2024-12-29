import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  supabaseProcedure,
} from "~/server/api/trpc";

export const quizRouter = createTRPCRouter({
  submitQuizAndCalculateScore: supabaseProcedure
    .input(
      z.object({
        quizId: z.string(),
        answers: z.array(
          z.object({
            questionId: z.string(),
            answerId: z.string(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { quizId, answers } = input;

      const quiz = await ctx.db.quiz.findUnique({
        where: { id: quizId },
        include: {
          questions: {
            include: {
              answers: true,
            },
          },
        },
      });

      if (!quiz) {
        throw new Error("Quiz not found");
      }

      let score = 0;
      for (const question of quiz.questions) {
        const submittedAnswer = answers.find(
          (a) => a.questionId === question.id,
        );
        if (submittedAnswer?.answerId === question.correctAnswerId) {
          score += 1;
        }
      }

      const submission = await ctx.db.submission.create({
        data: {
          userId: ctx.session.user.id ?? "",
          quizId,
          score,
        },
      });

      return { submission, score };
    }),
  deleteQuiz: supabaseProcedure
    .input(z.object({ quizId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.quiz.delete({
        where: {
          id: input.quizId,
        },
      });
    }),
  getQuizById: publicProcedure
    .input(z.object({ quizId: z.string() }))
    .query(async ({ ctx, input }) => {
      const quiz = await ctx.db.quiz.findUnique({
        where: {
          id: input.quizId,
        },
        include: {
          user: true,
          questions: {
            include: {
              answers: true,
            },
          },
          _count: {
            select: {
              questions: true,
              submissions: true,
            },
          },
        },
      });

      return quiz;
    }),
  getQuizByCategory: publicProcedure
    .input(z.object({ categoryId: z.string() }))
    .query(async ({ ctx, input }) => {
      const quizzes = await ctx.db.quiz.findMany({
        where: {
          category: input.categoryId,
        },
        include: {
          user: true,
          _count: {
            select: {
              questions: true,
              submissions: true,
            },
          },
        },
      });

      return quizzes;
    }),
  getUserQuizzes: supabaseProcedure.query(async ({ ctx }) => {
    const quizzes = await ctx.db.quiz.findMany({
      where: {
        createdBy: ctx.session.user.id,
      },
      select: {
        id: true,
        language: true,
        category: true,
        title: true,
        _count: {
          select: {
            questions: true,
            submissions: true,
          },
        },
      },
    });

    return quizzes;
  }),
  createQuiz: supabaseProcedure
    .input(
      z.object({
        category: z.string(),
        title: z.string(),
        language: z.string().optional(),
        questions: z.array(
          z.object({
            correctAnswerId: z.string(),
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
      const { title, language, questions, category } = input;

      const quiz = await ctx.db.quiz.create({
        data: {
          title,
          category,
          language,
          createdBy: ctx.session.user.id,
          questions: {
            create: questions.map((q) => ({
              question: q.question,
              correctAnswerId: q.correctAnswerId,
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
  updateQuiz: supabaseProcedure
    .input(
      z.object({
        quizId: z.string(),
        category: z.string(),
        title: z.string(),
        language: z.string().optional(),
        questions: z.array(
          z.object({
            correctAnswerId: z.string(),
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
      const { title, language, questions, category } = input;
      console.log("questions", questions);

      const quiz = await ctx.db.quiz.update({
        where: {
          id: input.quizId,
        },
        data: {
          title,
          category,
          language,
          createdBy: ctx.session.user.id,
          questions: {
            deleteMany: {},
            create: questions.map((q) => ({
              question: q.question,
              correctAnswerId: q.correctAnswerId,
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
