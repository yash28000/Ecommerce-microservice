"use client";
import type { Metadata } from "next";

import "./globals.css";
import Navbar from "@/components/Navbar/navbar";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import ReduxProvider from "../../redux/provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  return (
    <html lang="en">
      <body className="">
        <QueryClientProvider client={queryClient}>
          <ReduxProvider>
            <NextTopLoader />
            <Navbar />
            {children}
            <Toaster />
          </ReduxProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
