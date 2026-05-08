// export interface IUser extends Document {
//   email: string;
//   role?: 'user' | 'admin';
//   userType: 'personal' | 'business';
//   phoneNumber: string;
//   firstName?: string;
//   lastName?: string;
//   businessName?: string;
//   password: string;
//   confirmPassword?: string;
//   createdAt?: string
// }

// export interface SignupData {
//   userType: 'personal' | 'business';
//   email: string;
//   phoneNumber: string;
//   password: string;
//   confirmPassword: string;
//   firstName?: string;
//   lastName?: string;
//   businessName?: string;
// }

export interface IUser {
  id?: string;
  email: string;
  role?: 'user' | 'admin';
  userType: 'personal' | 'business';
  phoneNumber: string;
  firstName?: string;
  lastName?: string;
  businessName?: string;
  password: string;
  confirmPassword?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SignupData {
  userType: 'personal' | 'business';
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  firstName?: string;
  lastName?: string;
  businessName?: string;
}

export interface SigninData {
  email: string;
  password: string;
}

export type CreateUserDto = Omit<IUser, 'id' | 'createdAt' | 'updatedAt' | 'role'>

export type SafeUser = Omit<IUser, 'password' | 'confirmPassword'>