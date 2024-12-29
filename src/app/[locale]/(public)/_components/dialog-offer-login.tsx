import Link from "next/link";

import { Button } from "~/components/ui/button";
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
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";

export function DialogOfferLogin({ redirecTo }: { redirecTo: string }) {
  const t = useTranslations("dialog_offer");
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full">{t("take_quiz")}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("please_login")}</AlertDialogTitle>
          <AlertDialogDescription>{t("offer_desc")}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
          <Button className="w-full sm:w-[100px]" asChild>
            <Link href={`${redirecTo}?status=ANONYMOUS`}>{t("take_quiz")}</Link>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
