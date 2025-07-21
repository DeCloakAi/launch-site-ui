import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useTheme } from '../../src/hooks/useTheme';
import { Button } from '../../src/components/ui/button';
import { Sun, Moon } from 'lucide-react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function VerifyPage() {
  const router = useRouter();
  const { data } = router.query;
  const { theme, toggleTheme } = useTheme();
  const [status, setStatus] = useState('verifying');

  useEffect(() => {
    if (!data) return;
    const verifyEmail = async () => {
      try {
        await axios.get(`${API}/verify/${data}`);
        setStatus('success');
      } catch (err) {
        console.error('Verification failed:', err);
        setStatus('error');
      }
    };
    verifyEmail();
  }, [data]);

  const goHome = () => router.push('/');

  let content;
  if (status === 'verifying') {
    content = <p className="text-center">Verifying your email...</p>;
  } else if (status === 'success') {
    content = (
      <>
        <p className="text-center text-green-600">Your email has been verified.</p>
        <Button className="mt-4" onClick={goHome}>Go to Home</Button>
      </>
    );
  } else {
    content = (
      <>
        <p className="text-center text-red-600">Verification failed.</p>
        <Button className="mt-4" onClick={goHome}>Return Home</Button>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Email Verification - Decloak.ai</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
        <div className="min-h-screen bg-background transition-colors duration-300 flex items-center justify-center p-6">
          <div className="bg-card p-6 rounded-lg shadow w-full max-w-md text-foreground">
            <div className="flex justify-end">
              <Button type="button" variant="ghost" size="icon" onClick={toggleTheme} className="w-9 h-9">
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            </div>
            {content}
          </div>
        </div>
      </div>
    </>
  );
}
