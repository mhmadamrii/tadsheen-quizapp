import "~/styles/globals.css";
import NextTopLoader from "nextjs-toploader";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";
import { TRPCReactProvider } from "~/trpc/react";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "~/components/theme-provider";

export const metadata: Metadata = {
  title: "Tadsheen — QuizMaster",
  description: "Generated by create-t3-app",
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
    },
  ],
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const locale = (await params).locale;
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <TRPCReactProvider>
          <NextIntlClientProvider messages={messages}>
            <Toaster richColors />
            <NextTopLoader color="#3135a3" />
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <NuqsAdapter>{children}</NuqsAdapter>
            </ThemeProvider>
          </NextIntlClientProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
