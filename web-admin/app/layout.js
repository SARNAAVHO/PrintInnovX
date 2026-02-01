import "./globals.css";
import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "PrintInnovX",
  description: "Enterprise-grade cloud printing platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider
          signInUrl="/admin-login"
          signUpUrl="/admin-login"
          fallbackRedirectUrl="/admin"
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
