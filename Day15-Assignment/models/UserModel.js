/**
 * User Model
 *
 * @description :: This represents the Users table where the user can log in to this application.
 * @help        :: See https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
 */

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    isActive: { type: Boolean, default: 1 },
    role: { type: String, enum: ['Patient', 'Doctor'] },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

// Virtual for user's full name
UserSchema.virtual('fullName').get(function () {
  return this.firstName + ' ' + this.lastName;
});

module.exports = mongoose.model('User', UserSchema);
