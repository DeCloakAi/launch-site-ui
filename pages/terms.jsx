import Head from 'next/head';
import { useTheme } from '../src/hooks/useTheme';
import { Button } from '../src/components/ui/button';
import { Sun, Moon } from 'lucide-react';

export default function TermsPage() {
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <Head>
        <title>Terms of Service - Decloak.ai</title>
        <meta
          name="description"
          content="Read the terms and conditions for using Decloak.ai services."
        />
        <meta name="keywords" content="decloak terms of service" />
      </Head>
      <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
        <div className="min-h-screen bg-background transition-colors duration-300 p-6">
          <div className="max-w-3xl mx-auto space-y-6 text-foreground">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold">Terms of Service</h1>
              <Button type="button" variant="ghost" size="icon" onClick={toggleTheme} className="w-9 h-9">
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            </div>
            <p>
              By using Decloak.ai you agree to the following terms and conditions. This summary is provided for demonstration purposes.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
