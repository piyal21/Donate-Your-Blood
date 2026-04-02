import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import LoginForm from '../components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Heart className="h-10 w-10 text-red-600 mx-auto mb-3" fill="currentColor" />
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 mt-1">Sign in to your account</p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <LoginForm />
        </div>
        <p className="text-center text-gray-600 mt-4 text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-red-600 font-medium hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
