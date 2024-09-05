// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const publicRoutes = [
    '/auth/login',
    '/auth/register',
    '/auth/forgot-password',
  ];

  // Đọc cookie trực tiếp từ request
  const userCookie = request.cookies.get('user')?.value;

  // Nếu đã đăng nhập và truy cập route công khai, chuyển hướng đến dashboard
  if (userCookie && publicRoutes.includes(pathname)) {
    try {
      const userData = JSON.parse(userCookie);
      if (userData.accessToken) {
        return NextResponse.redirect(new URL('/account', request.url));
      }
    } catch (error) {
      console.error('Error parsing user cookie:', error);
    }
  }

  // Cho phép truy cập các route công khai
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
  if (!userCookie) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Kiểm tra accessToken
  try {
    const userData = JSON.parse(userCookie);
    if (!userData.accessToken) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  } catch (error) {
    console.error('Error parsing user cookie:', error);
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Cho phép request tiếp tục nếu đã xác thực
  return NextResponse.next();
}

// Apply the middleware to all routes except for images
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|gif|png|svg|webp)$).*)',
  ],
};
