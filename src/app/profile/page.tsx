'use client';
import { useEffect, useState } from 'react';

type ProfileData = {
  name: string;
  phone: string;
};

export default function ProfilePage() {
  const [data, setData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/profile', { credentials: 'include' })
      .then(res => {
        if (!res.ok) throw new Error('خطا در دریافت پروفایل');
        return res.json();
      })
      .then(setData)
      .catch(() => alert('نیاز به ورود مجدد دارید'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>در حال بارگذاری...</p>;
  if (!data) return <p style={{ textAlign: 'center', marginTop: '2rem', color: 'red' }}>پروفایل یافت نشد</p>;

  return (
    <div className="container">
      <h2>پروفایل</h2>
      <p><strong>نام:</strong> {data.name}</p>
      <p><strong>شماره تماس:</strong> {data.phone}</p>
    </div>
  );
}
