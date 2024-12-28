"use client";

import Link from "next/link";

import { Badge } from "~/components/ui/badge";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { MoreHorizontal, MoreVertical } from "lucide-react";

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

export function DashboardTable() {
  const { data: allQuizzes } = api.quiz.getUserQuizzes.useQuery();
  console.log("allQuizzes", allQuizzes);

  if (allQuizzes?.length === 0) {
    return (
      <div className="text-center text-xl font-bold text-gray-500">
        No quizzes found
      </div>
    );
  }

  return (
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
          {allQuizzes?.map((quiz) => (
            <TableRow key={quiz.id}>
              <TableCell className="font-medium">{quiz.title}</TableCell>
              <TableCell>{quiz._count.questions}</TableCell>
              <TableCell>{quiz._count.questions}</TableCell>
              <TableCell>
                <Badge
                  // variant={quiz.status === "active" ? "default" : "secondary"}
                  variant="default"
                >
                  Active
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVertical />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Settings</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
