"use client";

import "../style/global.css";
import ReduxProvider from "@/provider/store.provider";
import ThemeWrapper from "@/components/ui/ThemeWrapper";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body>
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <ReduxProvider>
              <ThemeWrapper>{children}</ThemeWrapper>
            </ReduxProvider>
          </motion.div>
        </AnimatePresence>
      </body>
    </html>
  );
}
