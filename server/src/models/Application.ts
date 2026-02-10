import mongoose, { Document, Schema, Types } from 'mongoose';

export type ApplicationStatus = 'Applied' | 'Reviewed' | 'Rejected' | 'Accepted';

export interface IApplication extends Document {
    job: Types.ObjectId; // Reference to Job
    candidate: Types.ObjectId; // Reference to User (candidate)
    status: ApplicationStatus;
    appliedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

const applicationSchema = new Schema<IApplication>(
    {
        job: {
            type: Schema.Types.ObjectId,
            ref: 'Job',
            required: [true, 'Please provide a job ID'],
        },
        candidate: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please provide a candidate ID'],
        },
        status: {
            type: String,
            enum: {
                values: ['Applied', 'Reviewed', 'Rejected', 'Accepted'],
                message: 'Status must be one of: Applied, Reviewed, Rejected, Accepted',
            },
            default: 'Applied',
        },
        appliedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

// Compound unique index: one candidate can only apply once per job
applicationSchema.index({ job: 1, candidate: 1 }, { unique: true });

// Create and export the Application model
const Application = mongoose.model<IApplication>('Application', applicationSchema);

export default Application;
