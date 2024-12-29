import { ForceRefresh } from "~/components/force-refresh";
import { Navbar } from "~/components/navbar";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const currentLang = (await params).locale;
  return (
    <>
      <ForceRefresh />
      <Navbar currentLang={currentLang} />
      {children}
    </>
  );
}
