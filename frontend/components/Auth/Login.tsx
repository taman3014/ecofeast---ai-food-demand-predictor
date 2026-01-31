import React, { useState } from 'react';
import { login } from '../../services/authService';
import { Leaf, ArrowRight, Eye, EyeOff } from 'lucide-react';

interface Props {
  onSuccess: (token: string, user: any) => void;
  switchToRegister: () => void;
}

const Login: React.FC<Props> = ({ onSuccess, switchToRegister }) => {
  const [username, setUsername] = useState('demo');
  const [password, setPassword] = useState('demo123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await login(username, password);
      const { token, user } = data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      onSuccess(token, user);
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setUsername('demo');
    setPassword('demo123');
    setLoading(true);
    setError(null);

    try {
      const data = await login('demo', 'demo123');
      const { token, user } = data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      onSuccess(token, user);
    } catch (err: any) {
      setError(err.message || 'Demo login failed');
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
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-text-muted">Sign in to manage your food business smarter</p>
        </div>

        {/* Login Card */}
        <div className="bg-dark-secondary rounded-2xl shadow-xl border border-border-muted p-8 hover-lift">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl animate-fade-in">
              <p className="text-sm text-red-400 font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username/Email Field */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <label className="block text-sm font-semibold text-text-muted mb-2">
                Username or Email
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full px-4 py-3 bg-dark-primary border border-border-muted rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-accent-teal/20 focus:border-accent-teal transition-smooth"
                disabled={loading}
              />
            </div>

            {/* Password Field */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-text-muted">
                  Password
                </label>
                <a href="#" className="text-sm text-accent-teal hover:text-accent-teal-hover font-medium">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 bg-dark-primary border border-border-muted rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-accent-teal/20 focus:border-accent-teal transition-smooth"
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

            {/* Remember Me */}
            <div className="flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-border-muted bg-dark-primary text-accent-teal focus:ring-accent-teal cursor-pointer"
              />
              <label htmlFor="remember" className="text-sm text-text-muted cursor-pointer">
                Keep me signed in
              </label>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-8 py-3 bg-gradient-to-r from-accent-teal to-accent-teal-hover text-white font-bold rounded-xl hover:shadow-xl shadow-accent-teal/20 transition-smooth disabled:opacity-70 disabled:cursor-not-allowed hover-lift inline-flex items-center justify-center gap-2 group animate-fade-in-up"
              style={{ animationDelay: '0.4s' }}
            >
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-smooth" />
                </>
              )}
            </button>

            {/* Demo Login */}
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={loading}
              className="w-full py-3 border-2 border-border-muted text-white font-bold rounded-xl hover:border-accent-teal hover:text-accent-teal hover:bg-accent-teal/10 transition-smooth disabled:opacity-70 disabled:cursor-not-allowed animate-fade-in-up"
              style={{ animationDelay: '0.5s' }}
            >
              Try Demo Account
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="flex-1 border-t border-border-muted" />
            <span className="px-3 text-xs text-text-muted uppercase font-semibold">Or</span>
            <div className="flex-1 border-t border-border-muted" />
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-text-muted mb-0 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
            Don't have an account?{' '}
            <button
              onClick={switchToRegister}
              className="text-accent-teal font-bold hover:text-accent-teal-hover transition-smooth"
            >
              Create one
            </button>
          </p>
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-accent-teal/10 border border-accent-teal/20 rounded-xl text-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <p className="text-sm text-accent-teal">
            <span className="font-semibold">Demo Account:</span> Use username "demo" and password "demo123"
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-text-muted space-y-2 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
          <p>
            By signing in, you agree to our{' '}
            <a href="#" className="text-accent-teal hover:underline">Terms of Service</a> and{' '}
            <a href="#" className="text-accent-teal hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
