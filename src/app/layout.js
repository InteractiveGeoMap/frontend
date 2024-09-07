import "./globals.css";
import ChakraProvider from "./theme-provider"
import { RootLayout } from "@/layouts/RootLayout"


export const metadata = {
  title: "ETH Geo",
  description: "Ethereum Community Landing Page",
};

export default function AppLayout({
  children,
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}> 
      <body suppressHydrationWarning={true}>
        <ChakraProvider>
          <RootLayout>
            {children}
          </RootLayout>
        </ChakraProvider>
      </body>
    </html>
  );
}
