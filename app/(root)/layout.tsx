import { Header } from "@/shared/components/shared";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Next Pizza | Главная",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen relative">
      {modal}
      <Header />
      {children}
    </main>
  );
}
