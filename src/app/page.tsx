'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { z } from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { ThemeToggle } from '@/components/theme-toggle';
import { loginSchema } from '@/lib/validations';
import { FcGoogle } from 'react-icons/fc';
import { LoaderIcon } from 'lucide-react';

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const getErrorMessage = (error: string) => {
    switch (error) {
      case 'CredentialsSignin':
        return 'Invalid email or password';
      default:
        return 'An error occurred during sign in';
    }
  };

  async function onSubmit(data: LoginFormValues) {
    try {
      setIsLoading(true);
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
        callbackUrl: '/home',
        redirect: false,
      });

      if (!result?.ok) {
        setError('root', {
          message: result?.error || 'Invalid email or password',
        });
        return;
      }

      router.push('/home');
    } catch (error) {
      setError('root', {
        message: 'Something went wrong. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen w-full py-12 flex items-center justify-center bg-gradient-to-br from-blue-200 to-violet-300 dark:from-gray-950 dark:to-slate-800">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <Card className="w-[450px] backdrop-blur-sm bg-white/75 dark:bg-zinc-900/75">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
          <CardDescription>Enter your email and password to access your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/10 rounded-md">
              {getErrorMessage(error)}
            </div>
          )}
          <Button
            className="w-full"
            variant="outline"
            onClick={() =>
              signIn('google', {
                redirect: true,
                callbackUrl: '/home',
              })
            }
          >
            <FcGoogle className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-gray-900 px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                {...register('email')}
                type="email"
                placeholder="name@example.com"
                disabled={isLoading}
                autoComplete="username email"
                aria-label="Email address"
              />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <PasswordInput
                {...register('password')}
                placeholder="Enter your password"
                disabled={isLoading}
                autoComplete="current-password"
                aria-label="Password"
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('rememberMe')}
                id="rememberMe"
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="rememberMe" className="text-sm text-muted-foreground">
                Remember me
              </label>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <LoaderIcon
                  style={{ animationDuration: '2s' }}
                  className="mr-2 h-4 w-4 animate-spin"
                />
              ) : (
                'Sign in'
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link href="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
          <Link href="/forgot-password" className="text-sm text-primary hover:underline">
            Forgot password?
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
