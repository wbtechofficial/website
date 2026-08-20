import { PropsWithChildren } from "react";
import { ThemeProvider } from "../components/providers/theme-provider";
import ContextStoreProvider from "@/components/providers/context-store-provider";
import { Toaster } from "@/components/ui/toast";
import { ScreenLoaderProvider } from "@/components/providers/screen-loader-provider";

export default function RootProvider({ children }: PropsWithChildren) {
  return (
    <ContextStoreProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ScreenLoaderProvider>
          {children}
        </ScreenLoaderProvider>
        <Toaster />
      </ThemeProvider>
    </ContextStoreProvider>
  );
}
