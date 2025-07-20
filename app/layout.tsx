import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { dmSans } from "@/lib/fonts";
import AuthProvider from "@/components/providers/AuthProvider";

export const metadata: Metadata = {
  title: "Servi ADS.",
  description: `Opter maintenant pour une solution agreable, efficace et personnalisée faite pour vous, 
    booster votre marque, personne, productivité ou autre activité avec nos principales solutions publicitaires.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${dmSans.className} scroll-smooth antialiased`}>
        <AuthProvider>
          <main>{children}</main>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
