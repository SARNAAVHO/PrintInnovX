import "./globals.css";
import { Toaster } from "sonner";

export const metadata = {
  title: "PrintInnovX",
  description: "Enterprise-grade cloud printing platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <Toaster richColors position="top-center" />
        {children}
        
      </body>
    </html>
  );
}
