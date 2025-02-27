import AdminLayoutContent from "@/components/admin-components/common/AdminLayout";
import { Metadata } from "next";
import React from "react";
import { ThemeProvider } from 'next-themes'
export const metadata: Metadata = {
  title: "Admin",
  description: "Admin - Dat anh Shoe",
};
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>
    <AdminLayoutContent>
      <ThemeProvider enableSystem={true} defaultTheme="system"
        disableTransitionOnChange attribute="class">
      <div className="p-4">
        {children}
        {/* max each card content is w-60 */}
      </div>
      </ThemeProvider>
    </AdminLayoutContent>

  </>;
}
