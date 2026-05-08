import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import SigninForm from '../../_components/signinForm'
import authBg from '@/assets/signin.jpeg'

export const metadata: Metadata = {
  title: 'Sign In | TickPass',
  description: 'Sign in to your Tickpass account',
}

export default function SigninPage() {
  return (
    <div className="h-screen flex overflow-hidden">

      {/* ── Left panel — form ── */}
      <div className="w-full lg:w-1/2 h-full flex flex-col px-6 sm:px-12 bg-white dark:bg-gray-900 overflow-y-auto">

        {/* Logo — visible on all screen sizes */}
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
            <div className="mb-6 text-center">
              <h1 className="text-3xl font-bold text-primary-900 dark:text-white">
                Welcome back
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Sign in to continue to your account
              </p>
            </div>
            <SigninForm />
          </div>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
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
  )
}