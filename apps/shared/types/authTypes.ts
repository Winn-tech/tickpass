export interface IUser extends Document {
  email: string;
  role: 'user' | 'business';
  phoneNumber: string;
  firstName?: string;
  lastName?: string;
  businessName?: string;
  password: string;
  confirmPassword?: string;
}