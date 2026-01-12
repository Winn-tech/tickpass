'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, User, Briefcase } from 'lucide-react';
import { toast } from 'react-toastify';
import {signup} from '../utils/authsApi'
import {SignupData} from '@shared/types/authTypes'

type UserType = 'personal' | 'business';

const SignupForm =()=> {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    businessName: '',
  });

  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type);
    setStep(2);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = (): boolean => {
    if (!formData.email.match(/.+\@.+\..+/)) {
      toast.error('Please provide a valid email');
      return false;
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }

    if (!formData.phoneNumber.trim()) {
      toast.error('Phone number is required');
      return false;
    }

    if (userType === 'personal') {
      if (!formData.firstName.trim() || !formData.lastName.trim()) {
        toast.error('First name and last name are required');
        return false;
      }
    } else if (userType === 'business') {
      if (!formData.businessName.trim()) {
        toast.error('Business name is required');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userType || !validateForm()) return;

    setIsLoading(true);

    try {
      const signupData: SignupData = {
        userType,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        ...(userType === 'personal' && {
          firstName: formData.firstName,
          lastName: formData.lastName,
        }),
        ...(userType === 'business' && {
          businessName: formData.businessName,
        }),
      };

      const response = await signup(signupData);

      if (response.status.success) {
        toast.success('Account created successfully!');
        if (response.token) {
          localStorage.setItem('authToken', response.token);
        }
        router.push('/dashboard');
      }
    } catch (error: any) {
      toast.error(error.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 1) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary-900 dark:text-gray-100 mb-2">
            Choose Account Type
          </h2>
          <p className="text-accent-600 dark:text-gray-400">
            Select the type of account you want to create
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={() => handleUserTypeSelect('personal')}
            className="group relative bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-8 hover:border-primary-500 hover:shadow-lg transition-all duration-300 text-left"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary-500 transition-colors">
                <User className="w-10 h-10 text-primary-600 dark:text-primary-300 group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Personal Account
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                For individuals looking to discover and book events
              </p>
            </div>
          </button>

          <button
            onClick={() => handleUserTypeSelect('business')}
            className="group relative bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-8 hover:border-primary-500 hover:shadow-lg transition-all duration-300 text-left"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-accent-100 dark:bg-accent-900 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent-500 transition-colors">
                <Briefcase className="w-10 h-10 text-accent-600 dark:text-accent-300 group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Business Account
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                For event organizers and businesses hosting events
              </p>
            </div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary-900 dark:text-gray-100 mb-2">
          Create Your Account
        </h2>
        <p className="text-accent-600 font-bold dark:text-gray-400">
          {userType === 'personal' ? 'Personal Account' : 'Business Account'}
        </p>
        <button
          onClick={() => setStep(1)}
          className="text-primary-600 hover:text-primary-700 text-sm mt-2 underline"
        >
          Change account type
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {userType === 'personal' ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-primary-700 dark:text-gray-300 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-primary-700 dark:text-gray-300 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>
          </>
        ) : (
          <div>
            <label htmlFor="businessName" className="block text-sm font-medium text-primary-700 dark:text-gray-300 mb-2">
              Business Name
            </label>
            <input
              type="text"
              id="businessName"
              name="businessName"
              value={formData.businessName}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-primary-700 dark:text-gray-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            disabled={isLoading}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-primary-700 dark:text-gray-300 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
            disabled={isLoading}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-primary-700 dark:text-gray-300 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              minLength={8}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Minimum 8 characters
          </p>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-primary-700 dark:text-gray-300 mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              minLength={8}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed pr-12"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating account...
            </>
          ) : (
            'Create Account'
          )}
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
