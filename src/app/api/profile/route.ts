import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  // کوکی را پاس بده به سرور بک‌اند برای شناسایی سشن
const cookie = req.headers.get('cookie') || '';
const res = await fetch('http://localhost:3000/user/profile', {
  credentials: 'include',
});
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
