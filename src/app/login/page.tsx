"use client";

import { authClient } from "@/lib/auth.client";
// import { signIn, signUp } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<LoginFormData>();

  const password = watch("password");

  // Email/Password Registration
  const onSubmit = async (value: LoginFormData) => {
    const toastId = toast.loading("Logging in");
    try {
      const { data, error } = await authClient.signIn.email(value);

      if (error) {
        toast.error(error.message, { id: toastId });
        return;
      }
      toast.success("User Logged in Successfully", {
        id: toastId,
        duration: 1500,
        onAutoClose: () => {
          router.push("/");
        },
      });
    } catch (err) {
      toast.error("Something went wrong, please try again.", { id: toastId });
    }
  };

  // Google OAuth Registration
  const handleGoogleLogin = async () => {
    const data = authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000",
    });
  };

  const session = authClient.useSession();
  console.log(session);

  return (
    <div className='min-h-screen bg-gray-50  flex items-center justify-center'>
      <div className='w-full max-w-md'>
        {/* Main Card */}
        <div
          className='mx-auto w-full max-w-md rounded-xl bg-white p-2
  shadow-lg ring-1 ring-gray-200'>
          <div className='card-body p-8'>
            {/* Header */}
            <div className='text-center'>
              <h1 className='text-2xl font-display font-bold mb-4'>
                Sign in to your account
              </h1>
            </div>

            {/* Error Alert */}
            {error && (
              <div className='mb-4 p-4 bg-danger-50 dark:bg-danger-950 border border-danger-200 dark:border-danger-800 rounded-lg'>
                <p className='text-sm text-danger-700 dark:text-danger-300 font-medium'>
                  {error}
                </p>
              </div>
            )}

            {/* Registration Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='space-y-4 text-gray-700'>
              {/* Email */}
              <div>
                <label htmlFor='email' className='label text-sm'>
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder='you@example.com'
                  className={`
      w-full rounded-md border px-3 py-2 text-sm
      transition-all duration-200
      placeholder:text-gray-400
      focus:outline-none focus:ring-2
      ${
        errors.email
          ? "border-red-500 focus:ring-red-500/30"
          : "border-gray-300 focus:border-primary-500 focus:ring-primary-500/30"
      }
      disabled:cursor-not-allowed disabled:bg-gray-100
    `}
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor='password' className='label text-sm'>
                  Password
                </label>
                <input
                  type='password'
                  id='password'
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  placeholder='Create a strong password'
                  className={`
      w-full rounded-md border px-3 py-2 text-sm
      transition-all duration-200
      placeholder:text-gray-400
      focus:outline-none focus:ring-2
      ${
        errors.password
          ? "border-red-500 focus:ring-red-500/30"
          : "border-gray-300 focus:border-primary-500 focus:ring-primary-500/30"
      }
      disabled:cursor-not-allowed disabled:bg-gray-100
    `}
                  disabled={isLoading}
                />
                {errors.password && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.password.message}
                  </p>
                )}
                {!errors.password && password && (
                  <p className='helper-text'>
                    Password strength:{" "}
                    {password.length >= 12
                      ? "🟢 Strong"
                      : password.length >= 8
                        ? "🟡 Medium"
                        : "🔴 Weak"}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type='submit'
                disabled={isLoading || isSubmitting}
                className='btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed'>
                {isLoading || isSubmitting ? (
                  <span className='flex items-center justify-center gap-2'>
                    <span className='animate-spin'>⏳</span>
                    Signing in...
                  </span>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>
            {/* Google Signup Button */}
            <button
              type='button'
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className='w-full px-6 py-3 mt-3 border-2 border-neutral-200 rounded-lg font-semibold  transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed'>
              <svg className='w-5 h-5' viewBox='0 0 24 24'>
                <path
                  fill='#4285F4'
                  d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                />
                <path
                  fill='#34A853'
                  d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                />
                <path
                  fill='#FBBC05'
                  d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                />
                <path
                  fill='#EA4335'
                  d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                />
              </svg>
              <span className='text-neutral-700'>Continue with Google</span>
            </button>

            {/* Login Link */}
            <p className='text-center mt-6 text-sm text-neutral-600 dark:text-neutral-400'>
              Already have an account?{" "}
              <Link
                href='/register'
                className='font-semibold text-gray-700  hover:text-gray-900 transition-colors'>
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
