import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: false },
  passwordHash: { type: String, required: true },
  role: { type: String, default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

UserSchema.methods.verifyPassword = function(password: string) {
  return bcrypt.compare(password, this.passwordHash);
};

UserSchema.statics.createWithPassword = async function(username: string, password: string, email?: string) {
  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  return this.create({ username, passwordHash: hash, email });
};

const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);
export default UserModel;
