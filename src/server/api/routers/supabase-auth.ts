import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
  supabaseProcedure,
} from "~/server/api/trpc";

export const supabaseAuthRouter = createTRPCRouter({
  onboarding: supabaseProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          email: input.email,
        },
      });

      if (user) {
        return;
      }

      const dbUser = await ctx.db.user.create({
        data: {
          id: input.id,
          name: input.name ?? "",
          email: input.email,
        },
      });

      return dbUser;
    }),

  getUser: publicProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          email: input.email,
        },
      });

      return user;
    }),
  signIn: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(async ({ input }) => {
      const user = await fetch("http://localhost:3000/api/supabase/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: input.email,
          password: input.password,
        }),
      }).then((res) => res.json());

      return user;
    }),

  signUp: publicProcedure
    .input(
      z.object({ email: z.string(), password: z.string(), name: z.string() }),
    )
    .mutation(async ({ input, ctx }) => {
      const isExistUser = await ctx.db.user.findUnique({
        where: {
          email: input.email,
        },
      });

      if (isExistUser) {
        throw new Error("User already exist");
      }

      const user = await fetch("http://localhost:3000/api/supabase/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: input.email,
          password: input.password,
        }),
      });

      if (user.ok) {
        const dbUser = await ctx.db.user.create({
          data: {
            name: input.name,
            email: input.email,
            password: input.password,
          },
        });

        return dbUser;
      }
    }),
});
