import {SignupData} from '../../../shared/types/authTypes'
const baseApi = 'http://localhost:4000/api/v1';


export const signup = async (data: SignupData) =>{
  const response = await fetch(`${baseApi}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Signup failed');
  }

  return response.json();
}

interface SigninData {
  email: string;
  password: string;
}

export const signin = async (data: SigninData) => {
  const response = await fetch('/api/auth/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Signin failed');
  }

  return response.json();
}

