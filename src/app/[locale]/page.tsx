import { Suspense } from "react";
import { LandingPageClient } from "./_components/landing-page-client";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LandingPageClient currentLang={locale} />
    </Suspense>
  );
}
