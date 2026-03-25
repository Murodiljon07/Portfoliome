import "../style/global.css";
import ReduxProvider from "@/provider/store.provider";
import ThemeWrapper from "@/components/ui/ThemeWrapper";
import PageTransition from "@/components/layout/PageTransition";

import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <ThemeWrapper>
            <PageTransition>
              <Providers>{children}</Providers>
            </PageTransition>
          </ThemeWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
