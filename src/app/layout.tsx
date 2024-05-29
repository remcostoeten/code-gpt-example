import "@/styles/app.css";
import "@uploadthing/react/styles.css";

import { ClerkProvider } from "@clerk/nextjs";

import { Inter } from "next/font/google";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { Toaster } from "sonner";

import { TopNav } from "@/components/theme/topnav";
import { cn } from "@/core/lib/utils";
import { ourFileRouter } from "./api/uploadthing/core";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Drizzle orm practice ",
  description: "Practicing data structures with Dddddrizzlee!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        <body
          className={cn(
            inter.className,
            "w-screen h-screen bg-white dark:bg-black text-black dark:text-white",
          )}
        >
          <div className="grid h-screen grid-rows-[auto,1fr]">
            <TopNav />
            <main className="overflow-y-scroll">{children}</main>
            {modal}
          </div>
          <div id="modal-root" />
          <Toaster invert closeButton />
        </body>
      </html>
    </ClerkProvider>
  );
}
