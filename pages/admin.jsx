import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const AdminDashboard = dynamic(() => import('../src/pages/AdminDashboard'), { ssr: false });

export default function AdminPage() {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('adminLoggedIn') === 'true';
    if (isLoggedIn) {
      setAllowed(true);
    } else {
      router.replace('/login');
    }
  }, [router]);

  if (!allowed) return null;
  return <AdminDashboard />;
}
