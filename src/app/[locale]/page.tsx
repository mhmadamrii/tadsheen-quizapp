import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <main>
      <h1>Hello world!</h1>
      <div>
        <h1>{t("title")}</h1>
        <Link href="/about">{t("about")}</Link>
      </div>
    </main>
  );
}
