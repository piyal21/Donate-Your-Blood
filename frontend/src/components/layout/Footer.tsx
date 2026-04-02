import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="h-6 w-6 text-red-500" fill="currentColor" />
              <span className="text-lg font-bold text-white">Donate Your Blood</span>
            </div>
            <p className="text-sm">Every drop counts. Join our community of life-savers and help those in need.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/donors" className="hover:text-white transition">Find Donors</a></li>
              <li><a href="/announcements" className="hover:text-white transition">Blood Requests</a></li>
              <li><a href="/campaigns" className="hover:text-white transition">Campaigns</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: info@donateyourblood.com</li>
              <li>Emergency: +880-XXX-XXXXXXX</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Donate Your Blood. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
