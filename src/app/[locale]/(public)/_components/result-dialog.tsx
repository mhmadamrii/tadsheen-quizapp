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
}: {
  questionCount: number;
  score: number;
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
            You got {score} out of {questionCount} questions right!{" "}
            {score == 0 ? "🥶" : "🎉"}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
