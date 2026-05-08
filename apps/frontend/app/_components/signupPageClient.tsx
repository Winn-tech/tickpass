'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SignupForm from './signupForm';
import authBg from '@/assets/signup.jpeg';

export default function SignupPageClient() {
  const [step, setStep] = useState<1 | 2>(1);
  const [userType, setUserType] = useState<'personal' | 'business' | null>(null);

  if (step === 1) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl">
          <div className="mb-8 flex justify-center">
            <Link href="/">
              <Image
                src="/logo2.png"
                alt="TickPass logo"
                width={100}
                height={30}
                className="object-contain"
              />
            </Link>
          </div>

          <SignupForm
            step={step}
            setStep={setStep}
            userType={userType}
            setUserType={setUserType}
          />

          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-8">
            By creating an account, you agree to our{' '}
            <Link href="/terms" className="text-primary-600 hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-primary-600 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex overflow-hidden">

      {/* ── Left panel — form ── */}
      <div className="w-full lg:w-1/2 h-full flex flex-col px-6 sm:px-12 bg-white dark:bg-gray-900 overflow-y-auto">

        <div className="mt-8 mb-6">
          <Link href="/">
            <Image
              src="/logo2.png"
              alt="TickPass logo"
              width={100}
              height={30}
              className="object-contain"
            />
          </Link>
        </div>

        <div className="flex flex-col justify-center flex-1 max-w-md w-full mx-auto">
          <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 border border-white/20 rounded-2xl shadow-xl p-8">
            <SignupForm
              step={step}
              setStep={setStep}
              userType={userType}
              setUserType={setUserType}
            />
          </div>

          <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{' '}
            <Link
              href="/signin"
              className="text-primary-600 hover:text-primary-700 dark:text-primary-400 font-semibold"
            >
              Sign in
            </Link>
          </div>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
            Need help?{' '}
            <Link href="/support" className="text-accent-600 hover:underline">
              Contact Support
            </Link>
          </p>
        </div>
      </div>

      {/* ── Right panel — image ── */}
      <div className="hidden lg:block lg:w-1/2 h-full relative overflow-hidden">
        <Image
          src={authBg}
          alt="Authentication background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-transparent" />
      </div>

    </div>
  );
}