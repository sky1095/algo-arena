import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthDialogProvider } from "@/components/auth-dialog";
import { PWARegister } from "@/components/pwa-register";
import { ProgressProvider } from "@/lib/progress";
import { Navbar } from "@/components/navbar";
import { TitleBar } from "@/components/titlebar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Algo Arena — Coding Interview Practice",
  description:
    "A curated roadmap of classic algorithm problems with a built-in judge supporting Python, JavaScript, TypeScript, Java and C++.",
  appleWebApp: {
    capable: true,
    title: "Algo Arena",
    statusBarStyle: "black-translucent",
  },
  icons: {
    apple: [{ url: "/icons/icon-180.png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/**
         * Browser extensions (e.g. VPN/toolbar add-ons) inject attributes like
         * `bis_skin_checked` into the DOM before React hydrates, which triggers
         * spurious hydration-mismatch warnings. Strip it (and re-strip any
         * re-injected copy) as early as possible.
         */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var ATTRS=["bis_skin_checked","bis_register"];function strip(el){try{for(var i=0;i<ATTRS.length;i++)el.removeAttribute(ATTRS[i]);}catch(e){}}function clean(root){var all=root.querySelectorAll("*");for(var i=0;i<all.length;i++)strip(all[i]);}clean(document);try{var P=Element.prototype,sa=P.setAttribute,san=P.setAttributeNS;P.setAttribute=function(n,v){if(ATTRS.indexOf(String(n).toLowerCase())>=0)return;return sa.apply(this,arguments)};P.setAttributeNS=function(ns,n,v){if(ATTRS.indexOf(String(n).toLowerCase())>=0)return;return san.apply(this,arguments)}}catch(e){}new MutationObserver(function(ms){for(var j=0;j<ms.length;j++){var m=ms[j];if(m.type==="attributes"&&ATTRS.indexOf(m.attributeName)>=0&&m.target&&m.target.nodeType===1)strip(m.target);var added=m.addedNodes;for(var k=0;k<added.length;k++){if(added[k].nodeType===1)strip(added[k])}}}).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:ATTRS});})();`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col font-sans" suppressHydrationWarning>
        <TitleBar />
        <PWARegister />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ProgressProvider>
            <AuthDialogProvider>
              <Navbar />
              <div className="flex flex-1 flex-col">{children}</div>
              <Toaster position="bottom-right" richColors />
            </AuthDialogProvider>
          </ProgressProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
