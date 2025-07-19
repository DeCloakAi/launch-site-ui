import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '../src/hooks/useTheme';
import { Input } from '../src/components/ui/input';
import { Button } from '../src/components/ui/button';
import { Sun, Moon } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [password, setPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('adminLoggedIn', 'true');
      }
      router.replace('/admin');
    } else {
      alert('Incorrect password');
    }
  };
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="min-h-screen flex items-center justify-center bg-background transition-colors duration-300 p-4">
        <form onSubmit={handleSubmit} className="bg-card p-6 rounded-lg shadow w-full max-w-sm space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-semibold text-foreground">Admin Login</h1>
            <Button type="button" variant="ghost" size="icon" onClick={toggleTheme} className="w-9 h-9">
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>
          <Input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
          <Button type="submit" className="w-full">Login</Button>
        </form>
      </div>
    </div>
  );
}
