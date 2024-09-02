// middleware.ts
import { NextResponse } from 'next/server';

export function middleware(request: Request) {
  // Xử lý yêu cầu tại đây
  console.log('Request URL:', request.url);
  if (request.url.includes('/admin')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}
