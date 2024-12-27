import Link from "next/link";

import { PlusCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

const userQuizzes = [
  {
    id: 1,
    title: "JavaScript Basics",
    questions: 10,
    participants: 25,
    status: "active",
  },
  {
    id: 2,
    title: "React Fundamentals",
    questions: 15,
    participants: 18,
    status: "draft",
  },
  {
    id: 3,
    title: "CSS Tricks",
    questions: 8,
    participants: 30,
    status: "active",
  },
  {
    id: 4,
    title: "Python for Beginners",
    questions: 12,
    participants: 0,
    status: "draft",
  },
  {
    id: 5,
    title: "Data Structures",
    questions: 20,
    participants: 15,
    status: "active",
  },
];

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Quizzes</h1>
        <Link href="/quiz/create">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Create New Quiz
          </Button>
        </Link>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Quiz Title</TableHead>
              <TableHead>Questions</TableHead>
              <TableHead>Participants</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userQuizzes.map((quiz) => (
              <TableRow key={quiz.id}>
                <TableCell className="font-medium">{quiz.title}</TableCell>
                <TableCell>{quiz.questions}</TableCell>
                <TableCell>{quiz.participants}</TableCell>
                <TableCell>
                  <Badge
                    variant={quiz.status === "active" ? "default" : "secondary"}
                  >
                    {quiz.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Link href={`/edit-quiz/${quiz.id}`}>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
