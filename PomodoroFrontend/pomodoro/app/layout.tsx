import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Importera CSS här
import { UserProvider } from "@/context/UserContext";



const inter = Inter({ subsets: ["latin"] })
export const metadata: Metadata = {
  title: "Pomodoro App",
  description: "Get going with Pomodoro-Budddy!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <UserProvider>{children}</UserProvider>
        <ToastContainer position="bottom-left" autoClose={2000}/>
      </body>
    </html>
  );
}
