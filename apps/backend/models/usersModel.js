import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
const userSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: function () {
            return this.userType === 'personal';
        },
    },
    lastName: {
        type: String,
        trim: true,
        required: function () {
            return this.userType === 'personal';
        },
    },
    businessName: {
        type: String,
        trim: true,
        required: function () {
            return this.userType === 'business';
        },
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: [true, 'A user with this email exists.'],
        match: [/.+\@.+\..+/, 'Please provide a valid email'],
    },
    userType: {
        type: String,
        enum: ['personal', 'business'],
        required: true,
        default: 'personal',
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
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
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        this.confirmPassword = undefined;
        next();
    }
    catch (error) {
        next(error);
    }
});
export const UserModel = model('User', userSchema);
