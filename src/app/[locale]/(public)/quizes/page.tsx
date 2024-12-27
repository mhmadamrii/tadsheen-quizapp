import Link from "next/link";

import { Navbar } from "~/components/navbar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/components/ui/card";

import {
  Book,
  FlaskRoundIcon as Flask,
  Clock,
  Radio,
  Globe,
} from "lucide-react";

const quizzes = [
  {
    id: 1,
    title: "General Knowledge",
    description: "Test your general knowledge",
    icon: Book,
  },
  {
    id: 2,
    title: "Science Quiz",
    description: "Explore the wonders of science",
    icon: Flask,
  },
  {
    id: 3,
    title: "History Trivia",
    description: "Journey through historical events",
    icon: Clock,
  },
  {
    id: 4,
    title: "Pop Culture",
    description: "How well do you know pop culture?",
    icon: Radio,
  },
  {
    id: 5,
    title: "Geography Challenge",
    description: "Test your knowledge of world geography",
    icon: Globe,
  },
];

export default async function Quizes({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const currentLang = (await params).locale;
  return (
    <main className="mx-auto px-8">
      <Navbar currentLang={currentLang} />
      <div className="container mx-auto py-8">
        <h1 className="mb-6 text-center text-3xl font-bold">
          Available Quizzes
        </h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz) => (
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
