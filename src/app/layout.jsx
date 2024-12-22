import localFont from "next/font/local";
import "./globals.scss";

import { Cairo } from "next/font/google";

const cairo = Cairo({ subsets: ["latin"] });

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Wasl",
  description: "Wasl Real Estate",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}> */}
      <body className={cairo.className}>
        {children}
      </body>
    </html>
  );
}
