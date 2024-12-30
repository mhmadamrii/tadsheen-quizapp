"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
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
  const t = useTranslations("onboarding");
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  const { mutate, isPending } = api.spAuth.onboarding.useMutation({
    onSuccess: (data) => {
      setIsOpen(false);
      toast.success("Successfully registered");
    },
  });

  const [input, setInput] = useState({
    name: "Pedro Duarte",
  });

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("onboarding")}</DialogTitle>
          <DialogDescription>{t("please_finish")}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              {t("fullname")}
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
            {isPending ? <Spinner /> : t("finish_setup")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
