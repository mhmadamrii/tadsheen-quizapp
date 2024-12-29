import Link from "next/link";

import { Button } from "~/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";

export function DialogOfferLogin({ redirecTo }: { redirecTo: string }) {
  console.log("redirect to", redirecTo);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full">Take Quiz</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Please login to continue</AlertDialogTitle>
          <AlertDialogDescription>
            You are not logged in yet, your progress will not be saved. However
            you can still continue to take quizzes as anonymous.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button className="w-full sm:w-[100px]" asChild>
            <Link href={`${redirecTo}?status=ANONYMOUS`}>Take Quiz</Link>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
