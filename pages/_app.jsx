import '../src/index.css';
import { Toaster } from '../src/components/ui/toaster';
import GoogleAnalytics from '../src/components/GoogleAnalytics';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GoogleAnalytics />
      <Component {...pageProps} />
      <Toaster />
    </>
  );
}

export default MyApp;
