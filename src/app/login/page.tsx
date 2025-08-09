'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile }),  // اینجا mobile هست
        credentials: 'include',
      });
      if (!res.ok) throw new Error('خطا در ورود');
      router.push(`/verify-login?mobile=${encodeURIComponent(mobile)}`);
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>ورود</h2>
      <input
        type="tel"
        placeholder="شماره موبایل"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      <button onClick={handleLogin} disabled={!mobile || loading}>
        {loading ? 'در حال ورود...' : 'ورود'}
      </button>
      <p className="footer-text">
        حساب ندارید؟ <a href="/register">ثبت‌نام کنید</a>
      </p>
    </div>
  );
}
