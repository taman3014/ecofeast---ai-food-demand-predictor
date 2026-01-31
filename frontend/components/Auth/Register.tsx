import React, { useState } from 'react';
import { register } from '../../services/authService';
import { Leaf, ArrowRight, Eye, EyeOff } from 'lucide-react';

interface Props {
  onSuccess: (token: string, user: any) => void;
  switchToLogin: () => void;
}

const Register: React.FC<Props> = ({ onSuccess, switchToLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!agreed) {
      setError('Please agree to the terms and conditions');
      return;
    }

    setLoading(true);

    try {
      const data = await register(username, password, email || undefined);
      const { token, user } = data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      onSuccess(token, user);
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-dark-primary">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-teal/10 rounded-full mix-blend-screen filter blur-3xl animate-float" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-screen filter blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="w-full max-w-md relative z-10 animate-scale-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-6 p-3 bg-dark-secondary rounded-xl border border-border-muted">
            <div className="p-2 bg-gradient-to-br from-accent-teal to-accent-teal-hover rounded-lg">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold gradient-text-dark">EcoFeast</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-text-muted">Join us to start optimizing your food business</p>
        </div>

        {/* Register Card */}
        <div className="bg-dark-secondary rounded-2xl shadow-xl border border-border-muted p-8 hover-lift">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl animate-fade-in">
              <p className="text-sm text-red-400 font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Field */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <label className="block text-sm font-semibold text-text-muted mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a unique username"
                className="w-full px-4 py-3 bg-dark-primary border border-border-muted rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-accent-teal/20 focus:border-accent-teal transition-smooth"
                required
                disabled={loading}
              />
            </div>

            {/* Email Field */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <label className="block text-sm font-semibold text-text-muted mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 bg-dark-primary border border-border-muted rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-accent-teal/20 focus:border-accent-teal transition-smooth"
                required
                disabled={loading}
              />
            </div>

            {/* Password Field */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <label className="block text-sm font-semibold text-text-muted mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  className="w-full px-4 py-3 bg-dark-primary border border-border-muted rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-accent-teal/20 focus:border-accent-teal transition-smooth"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-white transition-smooth"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <label className="block text-sm font-semibold text-text-muted mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full px-4 py-3 bg-dark-primary border border-border-muted rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-accent-teal/20 focus:border-accent-teal transition-smooth"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-white transition-smooth"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start gap-3 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <input
                type="checkbox"
                id="agree"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 rounded border-border-muted bg-dark-primary text-accent-teal focus:ring-accent-teal cursor-pointer mt-1 flex-shrink-0"
              />
              <label htmlFor="agree" className="text-sm text-text-muted cursor-pointer leading-relaxed">
                I agree to the{' '}
                <a href="#" className="text-accent-teal hover:underline font-semibold">Terms of Service</a> and{' '}
                <a href="#" className="text-accent-teal hover:underline font-semibold">Privacy Policy</a>
              </label>
            </div>

            {/* Create Account Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-8 py-3 bg-gradient-to-r from-accent-teal to-accent-teal-hover text-white font-bold rounded-xl hover:shadow-xl shadow-accent-teal/20 transition-smooth disabled:opacity-70 disabled:cursor-not-allowed hover-lift inline-flex items-center justify-center gap-2 group animate-fade-in-up"
              style={{ animationDelay: '0.6s' }}
            >
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-smooth" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
            <div className="flex-1 border-t border-border-muted" />
            <span className="px-3 text-xs text-text-muted uppercase font-semibold">Already registered?</span>
            <div className="flex-1 border-t border-border-muted" />
          </div>

          {/* Sign In Link */}
          <p className="text-center text-text-muted mb-0 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            Have an account?{' '}
            <button
              onClick={switchToLogin}
              className="text-accent-teal font-bold hover:text-accent-teal-hover transition-smooth"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
