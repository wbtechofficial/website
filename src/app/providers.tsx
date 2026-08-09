import { PropsWithChildren } from "react";
import { ThemeProvider } from "../components/providers/theme-provider";
import ContextStoreProvider from "@/components/providers/context-store-provider";

export default function RootProvider({ children }: PropsWithChildren) {
  return (
    <ContextStoreProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </ContextStoreProvider>
  );
}
