"use client";

import { ScrollArea } from "~/components/ui/scroll-area";
import { useRouter } from "nextjs-toploader/app";
import { toast } from "sonner";
import { MoreVertical } from "lucide-react";
import { api } from "~/trpc/react";
import { useEffect } from "react";
import { QUIZZEZ_CATEGORY } from "~/lib/constants";

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
import { useTranslations } from "next-intl";

export function DashboardTable() {
  const t = useTranslations("dashboard");
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
        {t("no_quizzes_found")}
      </div>
    );
  }

  useEffect(() => {
    // force refresh
    router.refresh();
  }, []);

  return (
    <div className="rounded-md border">
      <ScrollArea className="h-[400px] w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("quiz_title")}</TableHead>
              <TableHead>{t("questions")}</TableHead>
              <TableHead>{t("submissions")}</TableHead>
              <TableHead>{t("category")}</TableHead>
              <TableHead>{t("action")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allQuizzes?.map((quiz) => (
              <TableRow key={quiz.id}>
                <TableCell className="font-medium">{quiz.title}</TableCell>
                <TableCell>{quiz._count.questions}</TableCell>
                <TableCell>{quiz._count.submissions}</TableCell>
                <TableCell>
                  {
                    QUIZZEZ_CATEGORY.find(
                      (q) => q.id.toString() === quiz.category,
                    )?.title
                  }
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
      </ScrollArea>
    </div>
  );
}
