import "./globals.css";

export const metadata = {
  title: "PrintInnovX",
  description: "QR based smart printing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}