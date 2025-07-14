import NextAuth from 'next-auth';
import { config as authConfig } from '@/auth';

const { auth } = NextAuth(authConfig);

export default auth;

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// };
