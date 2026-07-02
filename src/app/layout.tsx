import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { ThemeProvider } from "next-themes";
import ScrollToTop from '@/components/ScrollToTop';
import Aoscompo from "@/utils/aos";
import { DonationProvider } from "./context/donationContext";
import SessionProviderComp from "@/components/nextauth/SessionProvider";
import { AuthDialogProvider } from "./context/AuthDialogContext";
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});
import ToasterContext from '@/app/api/contex/ToasetContex';
import { brandLogos, brandName, brandTagline } from "@/config/brand";

export const metadata = {
  title: { default: brandName, template: `%s | ${brandName}` },
  description: `${brandTagline} — verified humanitarian support, donations, and community relief.`,
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: brandLogos.icon, type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: brandLogos.icon,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={bricolage.className} suppressHydrationWarning>
      <ToasterContext />
      <DonationProvider>
        <AuthDialogProvider>
      <SessionProviderComp session={null}>
        <ThemeProvider
          attribute="class"
          enableSystem={true}
          defaultTheme="light"
          disableTransitionOnChange
          storageKey="ngo-theme"
        >
          <Aoscompo>
            <Header />
            
            {children}
            
            <Footer />
          </Aoscompo>
          <ScrollToTop />
        </ThemeProvider>
        </SessionProviderComp>
        </AuthDialogProvider>
        </DonationProvider>
      </body>
    </html>
  );
}
