import mongoose, { Schema, models } from 'mongoose';

const accountSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  type: {
    type: String, // oauth, email, etc.
    required: true
  },
  provider: {
    type: String, // google, github, etc.
    required: true
  },
  providerAccountId: {
    type: String,
    required: true
  },
  refresh_token: String,
  access_token: String,
  expires_at: Number,
  token_type: String,
  scope: String,
  id_token: String,
  session_state: String
}, {
  timestamps: true
});

// Compound index to ensure uniqueness of provider + providerAccountId
accountSchema.index({ provider: 1, providerAccountId: 1 }, { unique: true });

// Export the Account model if it doesn't exist, or get the existing model
export const Account = models.Account || mongoose.model('Account', accountSchema); 