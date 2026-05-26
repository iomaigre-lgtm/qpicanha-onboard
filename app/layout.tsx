import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Conectar Qpicanha",
  description: "QR Code para conectar WhatsApp - Prospecto",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body className="antialiased">{children}</body>
    </html>
  );
}
