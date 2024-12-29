import { useTranslations } from "next-intl";

export function MainFooter() {
  const t = useTranslations("dashboard");
  return (
    <footer className="border-t">
      <div className="container mx-auto py-4 text-center text-sm text-gray-500">
        {t("copyright")}
      </div>
    </footer>
  );
}
