import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Auth session check not yet wired (F-062/F-063). Pass through until
// Google Workspace OAuth lands; replace with redirect-to-/login logic then.
export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
