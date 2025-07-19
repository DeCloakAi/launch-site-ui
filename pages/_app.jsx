import '../src/index.css';
import { Toaster } from '../src/components/ui/toaster';
import GoogleAnalytics from '../src/components/GoogleAnalytics';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <GoogleAnalytics />
      <Component {...pageProps} />
      <Toaster />
    </>
  );
}

export default MyApp;
