import "@/styles/globals.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { Orbitron, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoaderOverlay from "@/components/LoaderOverlay";
import { HeroAnimationProvider } from "@/contexts/HeroAnimationContext";
import { LoaderProvider } from "@/contexts/LoaderContext";
import { AuthProvider } from "@/contexts/AuthContext";

const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// Pages that should not show header/footer
const AUTH_PAGES = ['/login'];
const DASHBOARD_PAGES = ['/dashboard'];

function AppContent({ Component, pageProps }) {
  const router = useRouter();
  const isAuthPage = AUTH_PAGES.includes(router.pathname);
  const isDashboardPage = router.pathname.startsWith('/dashboard');

  // Don't show header/footer on auth or dashboard pages
  const showLayout = !isAuthPage && !isDashboardPage;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {!isAuthPage && !isDashboardPage && (
          <>
            <title>Unity Game Developer Portfolio | UnityDevs + LLM/ML Projects</title>
            <meta
              name="description"
              content="Portfolio of a Unity Game Developer at UnityDev with side projects in LLMs and ML fine-tuning."
            />
          </>
        )}
      </Head>
      <LoaderProvider>
        <HeroAnimationProvider>
          {showLayout ? (
            <div className="min-h-screen bg-[#0a0b0f] text-[var(--color-foreground)]">
              <LoaderOverlay />
              <Header />
              <main className="pt-16">
                <Component {...pageProps} />
              </main>
              <Footer />
            </div>
          ) : (
            <Component {...pageProps} />
          )}
        </HeroAnimationProvider>
      </LoaderProvider>
    </>
  );
}

export default function App({ Component, pageProps }) {
  return (
    <div className={`${orbitron.variable} ${inter.variable}`}>
      <AuthProvider>
        <AppContent Component={Component} pageProps={pageProps} />
      </AuthProvider>
    </div>
  );
}

