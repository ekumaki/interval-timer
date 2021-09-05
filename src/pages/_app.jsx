import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Component {...pageProps} />
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}

export default MyApp;
