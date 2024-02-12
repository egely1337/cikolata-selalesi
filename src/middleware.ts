import { NextResponse, type NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { allowedChannels } from './lib/allowedChannels';

function isUrlAllowed(url: string): boolean {
  return allowedChannels.some(allowed => url.includes(allowed));
}

export async function middleware(request: NextRequest) {
  const session = await getToken({req: request, secret: process.env.SECRET});
  const url = request.url.split("/");

  if(!isUrlAllowed(request.url)) {
    return NextResponse.redirect(new URL("/channel/genel?e=Bu kanala girişin engellendi.", request.url));
  }
  

  if(!session) {
    return NextResponse.redirect(new URL("/logout", request.url));
  }
}

export const config = {
  matcher: ["/channel/:path*"]
}