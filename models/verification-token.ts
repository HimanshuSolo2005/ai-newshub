import mongoose, { Schema, models } from 'mongoose';

const verificationTokenSchema = new Schema({
  identifier: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true,
    unique: true
  },
  expires: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

// Compound index to ensure uniqueness of identifier + token
verificationTokenSchema.index({ identifier: 1, token: 1 }, { unique: true });

// Export the VerificationToken model if it doesn't exist, or get the existing model
export const VerificationToken = models.VerificationToken || mongoose.model('VerificationToken', verificationTokenSchema); 