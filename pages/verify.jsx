import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useTheme } from '../src/hooks/useTheme';
import { Button } from '../src/components/ui/button';
import { Sun, Moon } from 'lucide-react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function VerifyPage() {
  const router = useRouter();
  const { email, token } = router.query;
  const { theme, toggleTheme } = useTheme();
  const [status, setStatus] = useState('verifying');

  useEffect(() => {
    if (!email || !token) return;

    const verifyEmail = async () => {
      try {
        await axios.post(`${API}/verify-email`, { email, token });
        setStatus('success');
      } catch (err) {
        console.error('Verification failed:', err);
        setStatus('error');
      }
    };

    verifyEmail();
  }, [email, token]);

  let message = 'Verifying your email...';
  if (status === 'success') message = 'Email verified successfully!';
  if (status === 'error') message = 'Verification failed. The link may be invalid or expired.';

  return (
    <>
      <Head>
        <title>Email Verification - Decloak.ai</title>
        <meta name="description" content="Verify your Decloak.ai signup email" />
      </Head>
      <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
        <div className="min-h-screen flex items-center justify-center bg-background transition-colors duration-300 p-4">
          <div className="bg-card p-6 rounded-lg shadow w-full max-w-md space-y-4 text-center">
            <div className="flex justify-between items-center">
              <h1 className="text-lg font-semibold text-foreground">Email Verification</h1>
              <Button type="button" variant="ghost" size="icon" onClick={toggleTheme} className="w-9 h-9">
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            </div>
            <p className={status === 'error' ? 'text-destructive' : 'text-foreground'}>{message}</p>
          </div>
        </div>
      </div>
    </>
  );
}
