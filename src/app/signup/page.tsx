'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
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
import { signupSchema } from '@/lib/validations';
import { FcGoogle } from 'react-icons/fc';
import { Loader, LoaderIcon } from 'lucide-react';

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
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
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  async function onSubmit(_data: SignupFormValues) {
    try {
      setIsLoading(true);

      // Here you would typically make an API call to create the user account
      // For demo purposes, we'll just redirect to the login page
      router.push('/');
    } catch {
      setError('root', {
        message: 'An error occurred while creating your account. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen w-full py-12 flex items-center justify-center bg-gradient-to-br from-blue-100 to-violet-200 dark:from-gray-900 dark:to-slate-900">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <Card className="w-[500px] backdrop-blur-sm bg-white/75 dark:bg-zinc-900/75">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>Enter your information to create your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            className="w-full"
            variant="outline"
            onClick={() => signIn('google', { callbackUrl: '/home' })}
          >
            <FcGoogle className="mr-2 h-4 w-4" />
            Sign up with Google
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
                {...register('fullName')}
                placeholder="Full name"
                disabled={isLoading}
                autoComplete="name"
                aria-label="Full name"
              />
              {errors.fullName && (
                <p className="text-sm text-red-500 mt-1">{errors.fullName.message}</p>
              )}
            </div>
            <div>
              <Input
                {...register('email')}
                type="email"
                placeholder="name@example.com"
                disabled={isLoading}
                autoComplete="email"
                aria-label="Email address"
              />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <PasswordInput
                {...register('password')}
                placeholder="Create a password"
                disabled={isLoading}
                autoComplete="new-password"
                aria-label="Create password"
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>
            <div>
              <PasswordInput
                {...register('confirmPassword')}
                placeholder="Confirm your password"
                disabled={isLoading}
                autoComplete="new-password"
                aria-label="Confirm password"
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <input
                {...register('terms', { required: 'You must accept the terms and conditions' })}
                type="checkbox"
                id="terms"
                className="rounded border-gray-300 text-primary focus:ring-primary"
                aria-label="Accept terms and conditions"
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground">
                I agree to the{' '}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.terms && <p className="text-sm text-red-500 mt-1">{errors.terms.message}</p>}
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || !!errors.terms || !!errors.root}
            >
              {isLoading ? (
                <LoaderIcon
                  style={{ animationDuration: '2s' }}
                  className="mr-2 h-4 w-4 animate-spin"
                />
              ) : (
                'Create account'
              )}
            </Button>
            {errors.root && <p className="text-sm text-red-500 mt-1">{errors.root.message}</p>}
          </form>
        </CardContent>
        <CardFooter>
          <div className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
