import { type NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()

  // Rediriger la racine vers dashboard si authentifié, sinon vers auth
  if (url.pathname === '/') {
    const user = request.cookies.get('convergence_user')
    if (user) {
      url.pathname = '/dashboard'
      return NextResponse.redirect(url)
    } else {
      // Afficher la page d'accueil (page.tsx dans app/)
      return NextResponse.next()
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}
