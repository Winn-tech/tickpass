import { Metadata } from 'next';
import Link from 'next/link';
import SignupForm from '../_components/signupForm';

export const metadata: Metadata = {
  title: 'Sign Up | TickPass',
  description: 'Create your account to start booking or hosting events',
};

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-300">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
          <SignupForm />
          
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center text-sm text-accent-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link 
                href="/signin"
                className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-semibold"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

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