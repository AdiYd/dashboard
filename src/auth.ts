import NextAuth from 'next-auth';
import { type NextAuthConfig } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { z } from 'zod';
import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image?: string;
      rememberMe?: boolean;
    };
  }
}

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
        rememberMe: { label: 'Remember me', type: 'checkbox' },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
            rememberMe: z.coerce.boolean().optional(),
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password, rememberMe } = parsedCredentials.data;
        if (email === 'test@example.com' && password === 'password') {
          return {
            id: '1',
            email: 'test@example.com',
            name: 'John Doe',
            image: 'https://picsum.photos/100/100',
            rememberMe,
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/',
    error: '/',
    signOut: '/',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard =
        nextUrl.pathname.startsWith('/home') ||
        nextUrl.pathname.startsWith('/customers') ||
        nextUrl.pathname.startsWith('/analytics') ||
        nextUrl.pathname.startsWith('/reports') ||
        nextUrl.pathname.startsWith('/settings');
      const isAuthPage = nextUrl.pathname === '/' || nextUrl.pathname === '/signup';

      // If on auth page and logged in, redirect to dashboard
      if (isAuthPage && isLoggedIn) {
        return Response.redirect(new URL('/home', nextUrl));
      }

      // If on protected dashboard pages and not logged in, deny access
      if (isOnDashboard && !isLoggedIn) {
        return false; // This will redirect to the signIn page
      }

      // Allow access to all other pages
      return true;
    },
    async session({ session, token }) {
      if (session.user && token) {
        // Copy user details from token to session
        session.user.id = token.sub || '';
        session.user.email = (token.email as string) || session.user.email;
        session.user.name = (token.name as string) || session.user.name;
        session.user.image = (token.picture as string) || session.user.image;
        session.user.rememberMe = (token.rememberMe as boolean) || false;
      }
      return session;
    },
    async jwt({ token, account, profile, user }) {
      if (account && profile) {
        // When signing in with Google
        token.email = profile.email;
        token.name = profile.name;
        token.picture = profile.picture || token.picture;
      }
      // When signing in
      if (user) {
        token.sub = user.id;
        token.email = user.email;
        token.name = user.name;
        // @ts-ignore - rememberMe is a custom property we added
        token.rememberMe = user.rememberMe;
      }
      return token;
    },
    redirect({ url, baseUrl }) {
      // Handle redirection after sign in
      if (url.startsWith('/')) {
        return `${url}`;
      } else if (new URL(url).origin === baseUrl) {
        return url;
      }

      // Default redirect to dashboard
      return `/home`;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 2 * 24 * 60 * 60, // 2 days by default
  },
} satisfies NextAuthConfig;

// Conditionally adjust session maxAge based on rememberMe
const authHandler = NextAuth(config);

export const { handlers, auth, signIn, signOut } = authHandler;
