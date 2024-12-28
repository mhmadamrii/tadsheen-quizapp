"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { Input } from "~/components/ui/input";
import { Spinner } from "~/components/spinner";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

export function OnboardingDialog({ user }: { user: any }) {
  console.log("user", user);
  const [isOpen, setIsOpen] = useState(true);

  const { mutate, isPending } = api.spAuth.onboarding.useMutation({
    onSuccess: (data) => {
      console.log("data", data);
      setIsOpen(false);
      toast.success("Successfully onboarded");
    },
  });

  const [input, setInput] = useState({
    name: "Pedro Duarte",
  });

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Onboarding</DialogTitle>
          <DialogDescription>
            Please finish the onboarding process to get started.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Fullname
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
              onChange={(e) => setInput({ ...input, name: e.target.value })}
              disabled={isPending}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            className="w-full sm:w-[120px]"
            onClick={() =>
              mutate({
                id: user.id,
                name: input.name,
                email: user.email,
              })
            }
            type="button"
          >
            {isPending ? <Spinner /> : "Finish Setup"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
