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
      const user = await fetch("/api/supabase/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: input.email,
          password: input.password,
        }),
      }).then((res) => res.json());
      console.log("user", user);

      return user;
    }),

  signUp: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(async ({ input }) => {
      return await fetch("/api/supabase/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: input.email,
          password: input.password,
        }),
      }).then((res) => res.json());
    }),
});
