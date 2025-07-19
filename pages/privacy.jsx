import Head from 'next/head';
import { useTheme } from '../src/hooks/useTheme';
import { Button } from '../src/components/ui/button';
import { Sun, Moon } from 'lucide-react';

export default function PrivacyPage() {
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <Head>
        <title>Privacy Policy - Decloak.ai</title>
        <meta
          name="description"
          content="Learn how Decloak.ai protects and uses your data."
        />
        <meta name="keywords" content="decloak privacy policy" />
      </Head>
      <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
        <div className="min-h-screen bg-background transition-colors duration-300 p-6">
          <div className="max-w-3xl mx-auto space-y-6 text-foreground">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold">Privacy Policy</h1>
              <Button type="button" variant="ghost" size="icon" onClick={toggleTheme} className="w-9 h-9">
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            </div>
            <p>
              This page outlines how Decloak.ai collects, uses and stores personal information. We value your privacy and only use your data to provide our services.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
