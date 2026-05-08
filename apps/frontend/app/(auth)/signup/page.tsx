import { Metadata } from 'next';
import SignupPageClient from '../../_components/signupPageClient';

export const metadata: Metadata = {
  title: 'Sign Up | TickPass',
  description: 'Create your account to start booking or hosting events',
};

export default function SignupPage() {
  return <SignupPageClient />;
}