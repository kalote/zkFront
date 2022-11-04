import "../styles/globals.css";
import type { AppProps } from "next/app";
import { TwittProvider } from "../context/twittContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TwittProvider>
      <Component {...pageProps} />
    </TwittProvider>
  );
}

export default MyApp;
