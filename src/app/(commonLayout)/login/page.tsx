"use client";

import { Roles } from "@/constants/roles";
import { authClient } from "@/lib/auth.client";
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
    setValue,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<LoginFormData>();

  const password = watch("password");

  const fillDemoCredentials = (type: "customer" | "provider") => {
    const credentials =
      type === "provider"
        ? { email: "tarekferdos@gmail.com", password: "12345678" }
        : { email: "tareq.ferdous17@gmail.com", password: "12345678" };

    setValue("email", credentials.email, { shouldValidate: true });
    setValue("password", credentials.password, { shouldValidate: true });

    toast.success(
      type === "provider"
        ? "Provider demo credentials filled"
        : "Customer demo credentials filled",
    );
  };

  const handleSocialLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: `${window.location.origin}/`,
      });
    } catch {
      toast.error("Failed to start social login. Please try again.");
    }
  };

  const onSubmit = async (value: LoginFormData) => {
    setIsLoading(true);
    setError(null);
    const toastId = toast.loading("Logging in");

    try {
      const { error: signInError } = await authClient.signIn.email(value);

      if (signInError) {
        const errorMessage =
          signInError.message ?? "Login failed. Please try again.";
        setError(errorMessage);
        toast.error(errorMessage, { id: toastId });
        return;
      }

      const session = await authClient.getSession();
      const user = session?.data?.user;

      if (!user) {
        setError("Unable to load user session. Please login again.");
        toast.error("Unable to load user session. Please login again.", {
          id: toastId,
        });
        return;
      }

      const typedRole = (user as { role?: string }).role;

      const firstLogin =
        user &&
        new Date(user.createdAt).getTime() ===
          new Date(user.updatedAt).getTime();

      toast.success("User Logged in Successfully", {
        id: toastId,
        duration: 900,
        onAutoClose: () => {
          if (firstLogin) {
            router.push("/profile");
            return;
          }

          if (typedRole === Roles.admin) {
            router.push("/admin");
            return;
          }

          if (typedRole === Roles.provider) {
            router.push("/provider/dashboard");
          } else {
            router.push("/");
          }
        },
      });
    } catch {
      setError("Something went wrong, please try again.");
      toast.error("Something went wrong, please try again.", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-linear-to-br from-orange-50 via-white to-red-50 px-4 py-12 flex items-center justify-center'>
      <div className='w-full max-w-md'>
        <div
          className='mx-auto w-full max-w-md rounded-2xl bg-white/95 p-2
  shadow-xl ring-1 ring-orange-100 backdrop-blur'>
          <div className='card-body p-8'>
            <div className='text-center'>
              <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                Welcome Back
              </h1>
              <p className='text-sm text-gray-500 mb-6'>
                Login to continue ordering from FoodHub
              </p>
            </div>

            {error && (
              <div className='mb-4 p-3 bg-red-50 border border-red-200 rounded-lg'>
                <p className='text-sm text-red-700 font-medium'>{error}</p>
              </div>
            )}

            <div className='mb-4 grid grid-cols-2 gap-2'>
              <button
                type='button'
                onClick={() => fillDemoCredentials("customer")}
                disabled={isLoading || isSubmitting}
                className='rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:border-orange-300 hover:bg-orange-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'>
                Demo Customer
              </button>
              <button
                type='button'
                onClick={() => fillDemoCredentials("provider")}
                disabled={isLoading || isSubmitting}
                className='rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:border-orange-300 hover:bg-orange-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'>
                Demo Provider
              </button>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className='space-y-4 text-gray-700'>
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
                  <p className='text-xs text-gray-500 mt-1'>
                    Password strength:{" "}
                    {password.length >= 12
                      ? "Strong"
                      : password.length >= 8
                        ? "Medium"
                        : "Weak"}
                  </p>
                )}
              </div>

              <button
                type='submit'
                disabled={isLoading || isSubmitting}
                className='w-full rounded-lg bg-red-600 px-4 py-2.5 font-semibold text-white hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'>
                {isLoading || isSubmitting ? (
                  <span className='flex items-center justify-center gap-2'>
                    <span className='animate-spin'>o</span>
                    Signing in...
                  </span>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>

            <div className='mt-4'>
              <p className='mb-3 text-center text-xs uppercase tracking-wider text-gray-400'>
                Or continue with
              </p>
              <div className='grid grid-cols-1 gap-2'>
                <button
                  type='button'
                  onClick={handleSocialLogin}
                  disabled={isLoading || isSubmitting}
                  className='flex items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed'>
                  <svg
                    className='h-5 w-5'
                    viewBox='0 0 24 24'
                    aria-hidden='true'>
                    <path
                      fill='#4285F4'
                      d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                    />
                    <path
                      fill='#34A853'
                      d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.67-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                    />
                    <path
                      fill='#FBBC05'
                      d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z'
                    />
                    <path
                      fill='#EA4335'
                      d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                    />
                  </svg>
                  <span>Continue with Google</span>
                </button>
              </div>
            </div>

            <p className='text-center mt-6 text-sm text-neutral-600 dark:text-neutral-400'>
              Do not have an account?{" "}
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
