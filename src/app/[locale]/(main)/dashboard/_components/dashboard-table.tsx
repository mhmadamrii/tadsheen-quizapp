"use client";

import { Badge } from "~/components/ui/badge";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MoreVertical } from "lucide-react";
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

export function DashboardTable() {
  const router = useRouter();

  const { data: allQuizzes, refetch } = api.quiz.getUserQuizzes.useQuery();
  const { mutate } = api.quiz.deleteQuiz.useMutation({
    onSuccess: () => {
      toast.success("Successfully deleted quiz");
      refetch();
    },
  });

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
              <TableCell>{quiz._count.submissions}</TableCell>
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
                    <DropdownMenuItem
                      onClick={() => router.push(`/quiz/edit/${quiz.id}`)}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => mutate({ quizId: quiz.id })}
                    >
                      Delete
                    </DropdownMenuItem>
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
