import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "../../globals.css";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <main className='min-h-screen'>{children}</main>
      </body>
    </html>
  );
}
