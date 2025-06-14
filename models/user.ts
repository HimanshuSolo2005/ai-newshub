import mongoose, { Schema, models } from 'mongoose';

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  image: String,
  emailVerified: Date,
  accounts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Account'
    }
  ],
  sessions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Session'
    }
  ]
}, {
  timestamps: true
});

// Export the User model if it doesn't exist, or get the existing model
export const User = models.User || mongoose.model('User', userSchema); 