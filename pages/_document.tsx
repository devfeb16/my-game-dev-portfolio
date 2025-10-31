import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="preload"
          as="video"
          href="/bgvideo/bg.mov"
          type="video/quicktime"
        />
        <link
          rel="preload"
          as="video"
          href="/bgvideo/gamedev.mp4"
          type="video/mp4"
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
