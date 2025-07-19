import { useEffect, useState } from 'react';
import Head from 'next/head';
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
  return (
    <>
      <Head>
        <title>Admin Dashboard - Decloak.ai</title>
        <meta
          name="description"
          content="Administrative dashboard for managing Decloak.ai"
        />
        <meta name="keywords" content="decloak admin dashboard" />
      </Head>
      <AdminDashboard />
    </>
  );
}
