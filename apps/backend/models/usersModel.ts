import { Schema, model } from 'mongoose';
import { IUser } from '../../shared/types/authTypes';

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      trim: true,
      required: function () {
        return this.role === 'user';
      },
    },

    lastName: {
      type: String,
      trim: true,
      required: function () {
        return this.role === 'user';
      },
    },

    businessName: {
      type: String,
      trim: true,
      required: function () {
        return this.role === 'business';
      },
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      match: [/.+\@.+\..+/, 'Please provide a valid email'],
    },

    role: {
      type: String,
      enum: ['user', 'business'],
      required: true,
      default: 'user',
    },

    phoneNumber: {
      type: String,
      trim: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },

    confirmPassword: {
      type: String,
      required: true,
      validate: {
        validator: function (this: IUser, confirmPass: string) {
          return confirmPass === this.password;
        },
        message: 'Passwords do not match',
      },
      select: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre('save', function (next) {
  this.confirmPassword = undefined;
  next();
});

export const UserModel = model('User', userSchema);