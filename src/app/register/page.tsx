'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile }),  // اینجا mobile هست
        credentials: 'include',
      });
      if (!res.ok) throw new Error('خطا در ثبت‌نام');
      router.push(`/verify-register?mobile=${encodeURIComponent(mobile)}`);
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>ثبت‌نام</h2>
      <input
        type="tel"
        placeholder="شماره موبایل"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      <button onClick={handleRegister} disabled={!mobile || loading}>
        {loading ? 'در حال ثبت‌نام...' : 'ثبت‌نام'}
      </button>
      <p className="footer-text">
        قبلاً ثبت‌نام کرده‌اید؟ <a href="/login">ورود کنید</a>
      </p>
    </div>
  );
}
