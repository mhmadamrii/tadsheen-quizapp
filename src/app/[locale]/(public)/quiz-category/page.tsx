import Link from "next/link";

import { QUIZZEZ_CATEGORY } from "~/lib/constants";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/components/ui/card";

export default async function Quizes({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return (
    <main className="mx-auto px-8">
      <div className="container mx-auto py-8">
        <h1 className="mb-6 text-center text-3xl font-bold">
          Available Quizzes
        </h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {QUIZZEZ_CATEGORY.map((quiz) => (
            <Link
              href={`/quiz/${quiz.id}`}
              key={quiz.id}
              className="transition-transform hover:scale-105"
            >
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <quiz.icon className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>{quiz.title}</CardTitle>
                    <CardDescription>{quiz.description}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
