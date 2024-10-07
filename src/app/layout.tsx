import Header from "./components/Header";
import "./globals.css";
import { Roboto } from "next/font/google";
import "@radix-ui/themes/styles.css";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <main className="container mx-auto py-4 ">
          <Header />
          {children}
          <footer className="container p-8 text-gray-500">
            Novices Dev &copy; 2024 - Todos los derechos reservados
          </footer>
        </main>
      </body>
    </html>
  );
}
