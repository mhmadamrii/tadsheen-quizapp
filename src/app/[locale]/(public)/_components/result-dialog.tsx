"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";
import { ListChecks } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";

export function ResultDialog({
  questionCount,
  score,
  userStatus,
}: {
  questionCount: number;
  score: number;
  userStatus: string;
}) {
  const pathname = usePathname();
  const t = useTranslations("dialog_offer");
  const [isOpen, setIsOpen] = useState(true);
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle
            className={cn("flex items-center gap-2", {
              "flex-row-reverse justify-start": pathname.includes("ar"),
            })}
          >
            <ListChecks />
            {t("your_result")}
          </AlertDialogTitle>
          <AlertDialogDescription
            className={cn("", {
              "text-end": pathname.includes("ar"),
            })}
          >
            {userStatus === "ANONYMOUS" ? (
              t("you_are_anonymous")
            ) : (
              <span>
                You got {score} out of {questionCount} questions right!{" "}
                {score == 0 ? "🥶" : "🎉"}
              </span>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>{t("continue")}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
