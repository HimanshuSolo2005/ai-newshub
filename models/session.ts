import mongoose, { Schema, models } from 'mongoose';

const sessionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  sessionToken: {
    type: String,
    unique: true,
    required: true
  },
  expires: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

// Export the Session model if it doesn't exist, or get the existing model
export const Session = models.Session || mongoose.model('Session', sessionSchema); 