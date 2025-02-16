import { NextResponse } from 'next/server';

export function middleware(req) {
    const role = req.cookies.get('role')?.value;
    const isAdmin = role === 'admin';
    // if (req.nextUrl.pathname.startsWith('/admin') && !isAdmin) {
    //     return NextResponse.redirect(new URL('/403', req.url));
    // }
    if (!isAdmin && req.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/client', req.url));
    }
    return NextResponse.next();
}

// Cấu hình matcher để middleware áp dụng cho các route cụ thể
export const config = {
    matcher: ['/', '/admin/:path*']
};
