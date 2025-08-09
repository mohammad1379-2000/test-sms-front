import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  // ارسال به بک‌اند (مثال: localhost:3000/register)
  const res = await fetch('http://localhost:3000/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    credentials: 'include',
  });

  const data = await res.json();
  const response = NextResponse.json(data, { status: res.status });

  // پاس دادن کوکی به کلاینت
  const setCookie = res.headers.get('set-cookie');
  if (setCookie) {
    response.headers.set('set-cookie', setCookie);
  }

  return response;
}
