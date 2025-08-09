import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    credentials: 'include',
  });

  const data = await res.json();

  const response = NextResponse.json(data, { status: res.status });

  // گرفتن کوکی‌ها از پاسخ backend
  const rawCookies = res.headers.get('set-cookie');

  if (rawCookies) {
    // ممکن است کوکی‌ها چندتایی باشند که باید جدا شوند و هرکدام ست شود
    // اینجا فقط به عنوان مثال یک کوکی را ست می‌کنیم:
    const cookies = rawCookies.split(',');

    cookies.forEach(cookie => {
      // اگر نیاز به پاکسازی یا اصلاح کوکی هست اینجا انجام شود
      response.headers.append('Set-Cookie', cookie.trim());
    });
  }

  return response;
}
