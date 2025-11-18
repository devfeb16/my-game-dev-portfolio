import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preload MP4 first for better compatibility and faster loading */}
        <link
          rel="preload"
          as="video"
          href="/bgvideo/bg.mp4"
          type="video/mp4"
        />
        {/* Preload MOV as fallback for Safari */}
        <link
          rel="preload"
          as="video"
          href="/bgvideo/bg.mov"
          type="video/quicktime"
        />
        {/* Favicon: Custom Game Development themed SVG - Must be first to take precedence */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg?v=2" />
        <link rel="alternate icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.svg?v=2" />
        <meta name="theme-color" content="#0a0b0f" />
        <meta name="msapplication-TileColor" content="#0a0b0f" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

