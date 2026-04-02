import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page not found</p>
        <Link to="/" className="bg-red-600 text-white px-6 py-2.5 rounded-lg hover:bg-red-700 transition">
          Go Home
        </Link>
      </div>
    </div>
  );
}
