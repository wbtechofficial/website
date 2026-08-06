import { PropsWithChildren } from "react";
import { ThemeProvider } from "../components/providers/theme-provider";

export default function RootProvider({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
