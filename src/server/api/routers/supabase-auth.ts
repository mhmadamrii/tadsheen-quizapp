import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const supabaseAuthRouter = createTRPCRouter({
  getJsonPlaceholder: publicProcedure.query(() => {
    return { message: "Hello from tRPC" };
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
