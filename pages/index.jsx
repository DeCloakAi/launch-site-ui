import Head from 'next/head';
import LandingPage from '../src/pages/LandingPage';

export default function Home() {
  return (
    <>
      <Head>
        <title>Decloak.ai – AI-Powered Digital Footprint Protection</title>
        <meta
          name="description"
          content="Decloak.ai scans the internet to uncover your digital footprint and helps you erase personal data with AI-powered tools. Take back control of your privacy."
        />
        <meta
          name="keywords"
          content="decloak, privacy protection, digital footprint, data breach monitoring, AI privacy, online data removal, identity theft prevention, dark web scan, data exposure tool, executive protection"
        />
      </Head>
      <LandingPage />
    </>
  );
}
