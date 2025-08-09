import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { mobile, otp } = await req.json();

  if (!mobile || !otp) {
    return NextResponse.json({ error: 'شماره موبایل و کد لازم است' }, { status: 400 });
  }

  const backendRes = await fetch('http://localhost:3000/auth/verify-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mobile, otp }),
    credentials: 'include',
  });

  if (!backendRes.ok) {
    const err = await backendRes.text();
    return NextResponse.json({ error: err || 'کد تایید اشتباه است' }, { status: backendRes.status });
  }

  // فرض می‌کنیم JWT و کوکی در این مرحله ست میشه توسط بک‌اند

  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}
