import { Link } from 'react-router-dom';
import { Heart, Search, Users, Megaphone, CalendarDays, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-red-600 to-red-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 sm:py-28 text-center">
          <Heart className="h-16 w-16 mx-auto mb-6 animate-pulse" fill="currentColor" />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Donate Your Blood,<br />Save a Life
          </h1>
          <p className="text-lg sm:text-xl text-red-100 max-w-2xl mx-auto mb-8">
            Connect with blood donors in your area. Every donation can save up to three lives.
            Join our community of life-savers today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-red-50 transition inline-flex items-center justify-center gap-2"
            >
              Become a Donor <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/donors"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition inline-flex items-center justify-center gap-2"
            >
              <Search className="h-5 w-5" /> Find Donors
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Users, title: 'Find Donors', desc: 'Search for blood donors by blood type, city, and availability. Connect instantly.' },
              { icon: Megaphone, title: 'Post Blood Requests', desc: 'Need blood urgently? Post a request and our matching system finds compatible donors.' },
              { icon: CalendarDays, title: 'Join Campaigns', desc: 'Organize or join blood donation campaigns in your community.' },
            ].map((item) => (
              <div key={item.title} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition">
                <div className="bg-red-50 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-7 w-7 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: '8', label: 'Blood Types Covered' },
              { num: '24/7', label: 'Availability' },
              { num: '3', label: 'Lives Saved Per Donation' },
              { num: 'Free', label: 'Forever' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-red-600">{stat.num}</div>
                <div className="text-gray-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Make a Difference?</h2>
          <p className="text-gray-600 mb-8">
            Join thousands of donors and recipients on our platform. Your blood donation can be someone's lifeline.
          </p>
          <Link
            to="/register"
            className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}
