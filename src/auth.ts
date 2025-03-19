import NextAuth from 'next-auth';
import { type NextAuthConfig } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { z } from 'zod';

export const config = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;
        if (email === 'test@example.com' && password === 'password') {
          return {
            id: '1',
            email: 'test@example.com',
            name: 'Test User',
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/signup',
    error: '/signup',
    signOut: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const protectedRoutes = ['/home', '/analytics', '/customers', '/reports', '/settings'];
      const isProtectedRoute = protectedRoutes.some(path => nextUrl.pathname.startsWith(path));
      const isAuthPage = nextUrl.pathname.startsWith('/signup');

      if (isAuthPage) {
        if (isLoggedIn) return Response.redirect(new URL('/home', nextUrl));
        return true;
      }

      if (isProtectedRoute) {
        if (isLoggedIn) return true;
        return Response.redirect(new URL('/signup', nextUrl));
      }

      return true;
    },
    session({ session, token }) {
      if (token && session) {
        session.user.id = token.sub ?? '';
      }
      return session;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
