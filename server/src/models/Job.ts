import mongoose, { Document, Schema, Types } from 'mongoose';

export type JobType = 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship';

export interface IJob extends Document {
    title: string;
    description: string;
    company: string;
    location: string;
    experience: string;
    salary: {
        min: number;
        max: number;
        currency: string;
    };
    skills: string[];
    jobType: JobType;
    postedBy: Types.ObjectId; // Reference to User (recruiter)
    applicants: Types.ObjectId[]; // Array of User IDs (candidates)
    createdAt: Date;
    updatedAt: Date;
}

const jobSchema = new Schema<IJob>(
    {
        title: {
            type: String,
            required: [true, 'Please provide a job title'],
            trim: true,
            maxlength: [200, 'Title cannot be more than 200 characters'],
        },
        description: {
            type: String,
            required: [true, 'Please provide a job description'],
        },
        company: {
            type: String,
            required: [true, 'Please provide a company name'],
            trim: true,
        },
        location: {
            type: String,
            required: [true, 'Please provide a location'],
            trim: true,
        },
        experience: {
            type: String,
            required: [true, 'Please specify experience requirement'],
            enum: {
                values: ['Entry level', '1-2 years', '2-3 years', '3-5 years', '5+ years'],
                message: 'Please select a valid experience level',
            },
        },
        salary: {
            min: {
                type: Number,
                required: [true, 'Please provide minimum salary'],
                min: [0, 'Salary cannot be negative'],
            },
            max: {
                type: Number,
                required: [true, 'Please provide maximum salary'],
                min: [0, 'Salary cannot be negative'],
            },
            currency: {
                type: String,
                default: 'USD',
                enum: ['USD', 'INR', 'EUR', 'GBP'],
            },
        },
        skills: {
            type: [String],
            required: [true, 'Please provide required skills'],
            validate: {
                validator: function (v: string[]) {
                    return v && v.length > 0;
                },
                message: 'At least one skill is required',
            },
        },
        jobType: {
            type: String,
            required: [true, 'Please specify a job type'],
            enum: {
                values: ['full-time', 'part-time', 'contract', 'freelance', 'internship'],
                message: 'Please select a valid job type',
            },
        },
        postedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Job must be posted by a recruiter'],
        },
        applicants: {
            type: [Schema.Types.ObjectId],
            ref: 'User',
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

// Create and export the Job model
const Job = mongoose.model<IJob>('Job', jobSchema);

export default Job;
