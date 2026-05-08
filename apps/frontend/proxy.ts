import { NextRequest, NextResponse } from 'next/server'

const protectedRoutes = ['/dashboard', '/createEvent', '/profile', '/settings']
const authRoutes = ['/signin', '/signup']

export async function proxy(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  const { pathname } = req.nextUrl


  const isProtected = protectedRoutes.some(route => pathname.startsWith(route))
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/signin', req.url))
  }

  // already logged in, trying to access signin/signup → redirect to dashboard
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
