import { Button } from "~/components/ui/button";
import { useState } from "react";
import { ListChecks } from "lucide-react";

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
  const [isOpen, setIsOpen] = useState(true);
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <ListChecks />
            Your Result
          </AlertDialogTitle>
          <AlertDialogDescription>
            {userStatus === "ANONYMOUS" ? (
              "You are anonymous, you cannot see your result as the submission required authenticated user"
            ) : (
              <span>
                You got {score} out of {questionCount} questions right!{" "}
                {score == 0 ? "🥶" : "🎉"}
              </span>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
