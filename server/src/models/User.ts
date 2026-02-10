import mongoose, { Document, Schema } from 'mongoose';

export type UserRole = 'candidate' | 'recruiter';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: [true, 'Please provide a name'],
            trim: true,
            maxlength: [100, 'Name cannot be more than 100 characters'],
        },
        email: {
            type: String,
            required: [true, 'Please provide an email'],
            unique: true,
            lowercase: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                'Please provide a valid email',
            ],
        },
        password: {
            type: String,
            required: [true, 'Please provide a password'],
            minlength: [6, 'Password must be at least 6 characters'],
            select: false, // Don't return password by default
        },
        role: {
            type: String,
            enum: {
                values: ['candidate', 'recruiter'],
                message: 'Role must be either candidate or recruiter',
            },
            required: [true, 'Please specify a role'],
        },
    },
    {
        timestamps: true,
    }
);

// Create and export the User model
const User = mongoose.model<IUser>('User', userSchema);

export default User;
