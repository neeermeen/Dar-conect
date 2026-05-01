import { type NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Get session from cookies
  const session = request.cookies.get('sb-session')

  // Get the pathname
  const { pathname } = request.nextUrl

  // Protected routes (require authentication)
  const protectedRoutes = ['/admin', '/account', '/map', '/properties', '/property', '/contact']
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  // If no session and trying to access protected route, redirect to login
  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If logged in and trying to access login/signup, redirect based on role
  if (session && (pathname === '/login' || pathname === '/signup')) {
    // For now, redirect to account (user role check would happen client-side)
    return NextResponse.redirect(new URL('/account', request.url))
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}

