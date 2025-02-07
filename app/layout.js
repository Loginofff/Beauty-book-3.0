import { Outfit } from "next/font/google";
import "./globals.css";
import App from "./App";
import { ThemeProvider } from "./_components/theme/theme-provider";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Beautybook",
  description: "Find the best beauty professionals near you",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <head>
      <link rel="icon" type="image/png" href="/logo3.png" />
    </head>
    <body className={outfit.className}>
      <ThemeProvider>
        <App>{children}</App>
      </ThemeProvider>
    </body>
  </html>
  );
}
