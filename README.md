# TadSheen QuizMaster

A quiz builder built on top of Next.js, Prisma, and Supabase.

## Features

- Light/dark mode toggle
- Live previews
- Internationalization (i18n) — ar/en
- Create, read, update, and delete quizzes
- Quiz submission
- Answer review
- Categorized quizzes

## Demo

[Visit the live demo](https://tadsheen-quizapp.vercel.app/)

## Before Installation

1. Ensure you have created a project on Supabase.
2. Disable email confirmation on Supabase, as the application uses dummy email addresses (e.g., john@gmail.com, doe@gmail.com).

## Installation & Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/mhmadamrii/tadsheen-quizapp.git
   ```

2. Navigate to the project directory:

   ```bash
   cd tadsheen-quizapp
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Set up the database:

   ```bash
   pnpm db:push
   ```

5. Start the development server:

   ```bash
   pnpm dev
   ```

## Environment Variables

To run this project, add the following environment variables to your `.env` file:

```env
AUTH_SECRET=
DATABASE_URL=
DIRECT_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
AUTH_TRUST_HOST=
```

Alternatively, you can copy the example file and rename it:

```bash
cp .env.example .env
```

## Tech Stack

**Client:** React, Next.js, TailwindCSS

**Server:** tRPC, Next.js API routes

**Authentication:** Supabase Authentication, tRPC procedure

**ORM:** Prisma
