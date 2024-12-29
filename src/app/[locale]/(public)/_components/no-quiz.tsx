import { useTranslations } from "next-intl";

export function NoQuiz() {
  const t = useTranslations("quiz_categories");
  return (
    <div className="flex h-[80vh] w-full flex-1 items-center justify-center text-center">
      <h1 className="text-3xl">{t("no_quiz_for_this_category")}</h1>
    </div>
  );
}
