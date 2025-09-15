import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "E-Shop",
  description: "Next.js E-commerce App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <main className="p-6 bg-gray-50 min-h-screen">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
