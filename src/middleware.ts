import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Admin sayfaları için istek kontrolü
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Sadece admin bölümü için middleware çalıştır
  if (pathname.startsWith('/admin')) {
    // Admin login sayfasını kontrol etme
    if (pathname === '/admin') {
      return NextResponse.next();
    }
    
    // Token kontrolü
    const token = request.cookies.get('adminToken')?.value;
    
    if (!token) {
      // Token yoksa login sayfasına yönlendir
      const url = new URL('/admin', request.url);
      return NextResponse.redirect(url);
    }
  }
  
  // Diğer tüm sayfalar için normal akışa devam et
  return NextResponse.next();
}

// Middleware'in çalışacağı path'leri belirt
export const config = {
  matcher: ['/admin/:path*']
};