import { Metadata } from 'next';
import Link from 'next/link';
import SigninForm from '../_components/signinForm';

export const metadata: Metadata = {
  title: 'Sign In | TickPass',
  description: 'Sign in to your Tickpass account',
};

export default function SigninPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <SigninForm />
        </div>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-8">
          Need help?{' '}
          <Link href="/support" className="text-primary-600 hover:underline">
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
}