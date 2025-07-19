import Head from 'next/head';
import LandingPage from '../src/pages/LandingPage';

export default function Home() {
  return (
    <>
      <Head>
        <title>Decloak.ai - AI-Powered Privacy Control</title>
        <meta
          name="description"
          content="Decloak.ai continuously scans the internet for leaked personal data and helps you remove it."
        />
        <meta
          name="keywords"
          content="privacy, data leak monitoring, dark web, digital footprint, decloak"
        />
      </Head>
      <LandingPage />
    </>
  );
}
