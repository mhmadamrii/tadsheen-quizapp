import { useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "~/components/ui/button";
import { toast } from "sonner";
import { Question } from "~/lib/types";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

export function EditQuestionDialog({
  isOpenDialogEditQuestion,
  question,
  setMultipleQuestions,
  setIsOpenDialogEditQuestion,
}: {
  isOpenDialogEditQuestion: boolean;
  question: Question | undefined;
  setMultipleQuestions: (updateFn: (prev: Question[]) => Question[]) => void;
  setIsOpenDialogEditQuestion: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [editedQuestion, setEditedQuestion] = useState(
    question?.question || "",
  );
  const [editedAnswers, setEditedAnswers] = useState(question?.answers || []);

  const handleSaveChanges = () => {
    if (!question) return;

    setMultipleQuestions((prev) =>
      prev.map((q) =>
        q.id === question.id
          ? { ...q, question: editedQuestion, answers: editedAnswers }
          : q,
      ),
    );
    setIsOpenDialogEditQuestion(false);
    toast.success("Successfully edited question");
  };

  const updateAnswer = (index: number, value: string) => {
    setEditedAnswers((prev) =>
      prev.map((a, i) => (i === index ? { ...a, value } : a)),
    );
  };

  return (
    <Dialog open={isOpenDialogEditQuestion}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpenDialogEditQuestion(true)} size="icon">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Question</DialogTitle>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="question" className="text-right">
                Question
              </Label>
              <Input
                id="question"
                value={editedQuestion}
                onChange={(e) => setEditedQuestion(e.target.value)}
                className="col-span-3"
              />
            </div>
            {editedAnswers.map((answer, index) => (
              <div key={index} className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor={`answer-${index}`} className="text-right">
                  Answer {index + 1}
                </Label>
                <Input
                  id={`answer-${index}`}
                  value={answer.value}
                  onChange={(e) => updateAnswer(index, e.target.value)}
                  className="col-span-3"
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleSaveChanges}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
