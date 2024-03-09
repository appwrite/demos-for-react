import "./global.css";
import "@appwrite.io/pink";
import "@appwrite.io/pink-icons";

import type { Metadata } from "next";
import LoginImageDark from "@/lib/images/login-dark-mode.png";
import AppwriteLogoDark from "@/lib/images/appwrite-logo-dark.svg";
import Image from "next/image";
import Icon from "../public/appwrite-icon.svg";

export const metadata: Metadata = {
  title: "Server side rendering with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const bgStyle = {
    backgroundImage: `url(${LoginImageDark.src})`,
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href={Icon.src} />
      </head>
      <body className="theme-dark">
        <main className="grid-1-1 is-full-page" id="main">
          <section className="u-flex u-flex-vertical" style={bgStyle}>
            <div className="tag-line is-not-mobile">
              <p>
                Server side rendering<span className="underscore">_</span>
              </p>
            </div>
            <div className="u-flex u-stretch" />
            <div className="logo u-flex u-gap-16">
              <a href="/">
                <Image
                  src={AppwriteLogoDark}
                  width="160"
                  className="u-block"
                  alt="Appwrite Logo"
                />
              </a>
            </div>
          </section>
          <section className="grid-1-1-col-2 u-flex u-main-center u-cross-center _u-padding-16-mobile">
            <div className="container u-flex u-flex-vertical u-cross-center u-main-center">
              {children}
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
