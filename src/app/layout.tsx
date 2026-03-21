import "../style/global.css";
import ReduxProvider from "@/provider/store.provider";
import ThemeWrapper from "@/components/ui/ThemeWrapper";
import PageTransition from "@/components/layout/PageTransition";

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
            <PageTransition>{children}</PageTransition>
          </ThemeWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
