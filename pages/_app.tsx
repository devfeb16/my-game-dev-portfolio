import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Orbitron, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoaderOverlay from "@/components/LoaderOverlay";

const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${orbitron.variable} ${inter.variable}`}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Unity Game Developer Portfolio | Pixls + LLM/ML Projects</title>
        <meta
          name="description"
          content="Portfolio of a Unity Game Developer at Pixls with side projects in LLMs and ML fine-tuning."
        />
      </Head>
      <div className="min-h-screen bg-[#0a0b0f] text-[var(--color-foreground)]">
        <LoaderOverlay />
        <Header />
        <main className="pt-16">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </div>
  );
}
