# TadSheen QuizMaster

A quiz builder built on top Next.js, Prisma, Supabase

## Features

- Light/dark mode toggle
- Live previews
- Internationalization(i18n) — ar/en
- Create, read, update, delete quiz
- Quiz submission
- Answer review
- Quiz by category

## Demo

https://tadsheen-quizapp.vercel.app/

## Before Installation

- you have to make sure you have created project on supabase
- since we don't need to make email confirmation due we use dummy email e.g: john@gmail, doe@gmail etc **you need to disable email confirmation at supabase**

## Installation & run locally

clone project

```bash
  git clone https://github.com/mhmadamrii/tadsheen-quizapp.git
```

navigate to project

```bash
  cd tadsheen-quizapp
```

install

```bash
  pnpm install
```

database connection

```bash
  pnpm db:push
```

run locally

```bash
  pnpm dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`AUTH_SECRET=`

`DATABASE_URL=`

`DIRECT_URL=`

`NEXT_PUBLIC_SUPABASE_URL=`

`NEXT_PUBLIC_SUPABASE_ANON_KEY=`

`AUTH_TRUST_HOST=`

alternatively you can copy & paste .env.example to your .env

```bash
 cp .env.example .env
```

## Tech Stack

**Client:** React, Next.js, TailwindCSS

**Server:** tRPC, Next.js API route

**Authentication:** Supabase Authentication, tRPC procedure

**ORM:** Prisma
