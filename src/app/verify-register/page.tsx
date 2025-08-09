'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const mobile = searchParams.get('mobile') || '';

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

    const handleVerify = async () => {
    console.log({ mobile, otp })
    setLoading(true);
    try {
      const res = await fetch('api/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile, otp }),
        credentials: 'include',
      });

      if (!res.ok) throw new Error('کد تایید اشتباه است');
      router.push('/profile');
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>تایید شماره موبایل</h2>
      <p>کد تایید ارسال شده به {mobile} را وارد کنید</p>
      <input
        type="number"
        placeholder="کد تایید"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleVerify} disabled={!otp || loading}>
        {loading ? 'در حال بررسی...' : 'تایید'}
      </button>
    </div>
  );
}
