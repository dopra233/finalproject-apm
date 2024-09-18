import "./globals.css";
import { CartProvider } from "../CartContext"; // Importa el CartProvider
import { ReactNode } from "react"; // Importar ReactNode

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
