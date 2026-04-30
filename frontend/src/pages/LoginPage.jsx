import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ArrowRight, Mail, Lock, AlertCircle } from 'lucide-react';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to log in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-violet/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-brand-coral/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

      <div className="max-w-md w-full z-10">
        <div className="glass-card p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-brand-navy tracking-tight">Welcome back</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your details to access your account
            </p>
          </div>

          {error && (
            <div className="mb-4 flex items-center gap-2 bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-cyan focus:border-transparent transition-all outline-none bg-white/50"
                  placeholder="student@university.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <a href="#" className="text-xs text-brand-coral hover:text-orange-600 transition-colors">Forgot password?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-cyan focus:border-transparent transition-all outline-none bg-white/50"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-brand-navy hover:bg-brand-violet focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-violet transition-colors disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Log in'}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-brand-coral hover:text-orange-600 transition-colors">
              Sign up today
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
