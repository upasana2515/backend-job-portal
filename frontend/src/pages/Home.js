import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="min-h-screen bg-secondary">
      <Navbar />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="inline-block bg-green-100 text-primary px-4 py-1 rounded-full text-sm font-semibold mb-6">
          🚀 Your Career Starts Here
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight mb-6">
          Find Your <span className="text-primary">Dream Job</span><br />with JobHive
        </h1>
        <p className="text-gray-600 text-xl max-w-2xl mx-auto mb-10">
          Connect with top companies, apply in seconds, and land the job you've always wanted. Thousands of opportunities await you.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/register" className="bg-primary text-white px-8 py-4 rounded-2xl text-lg font-bold hover:scale-105 transition-all shadow-lg">
            Get Started Free →
          </Link>
          <Link to="/login" className="bg-white text-primary border-2 border-primary px-8 py-4 rounded-2xl text-lg font-bold hover:scale-105 transition-all shadow-lg">
            Sign In
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-14">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6 text-center">
          {[
            { num: "500+", label: "Jobs Posted" },
            { num: "2,000+", label: "Job Seekers" },
            { num: "200+", label: "Companies" },
            { num: "95%", label: "Placement Rate" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-4xl font-extrabold text-primary">{s.num}</div>
              <div className="text-gray-500 mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">Why Choose <span className="text-primary">JobHive?</span></h2>
        <p className="text-center text-gray-500 mb-12">Everything you need to land your next role</p>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: "🔍", title: "Smart Job Search", desc: "Filter jobs by title, location, and type. Find exactly what you're looking for in seconds." },
            { icon: "📄", title: "One-Click Apply", desc: "Upload your resume once and apply to multiple jobs instantly. No more lengthy forms." },
            { icon: "📊", title: "Track Applications", desc: "See all jobs you've applied for in one dashboard. Stay organized and never miss a follow-up." },
            { icon: "🏢", title: "Top Companies", desc: "Access opportunities from leading companies across all industries and locations." },
            { icon: "⚡", title: "Instant Notifications", desc: "Get alerted the moment new jobs matching your profile are posted." },
            { icon: "🔒", title: "Secure & Private", desc: "Your data and resume are securely stored. Apply with confidence and peace of mind." },
          ].map((f) => (
            <div key={f.title} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{f.title}</h3>
              <p className="text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* For Admins */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-4">For Employers & Admins</h2>
            <p className="text-green-100 text-lg mb-6 leading-relaxed">
              Post jobs, manage applications, and find the perfect candidate — all from one powerful admin dashboard.
            </p>
            <ul className="space-y-3 text-green-100">
              {["Post unlimited job listings", "View all applicant resumes", "Close or delete listings anytime", "Multi-user platform support"].map(i => (
                <li key={i} className="flex items-center gap-2">✅ {i}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white/10 rounded-3xl p-8">
            <div className="text-5xl mb-4">🛠️</div>
            <h3 className="text-2xl font-bold mb-2">Admin Dashboard</h3>
            <p className="text-green-100">Post jobs, manage listings, view applications, and control everything from a clean, intuitive panel.</p>
            <Link to="/register" className="inline-block mt-6 bg-white text-primary font-bold px-6 py-3 rounded-xl hover:scale-105 transition">
              Create Admin Account →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center px-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Ready to Find Your Next Opportunity?</h2>
        <p className="text-gray-500 text-lg mb-8 max-w-xl mx-auto">Join thousands of job seekers who found their dream job through JobHive.</p>
        <Link to="/register" className="bg-primary text-white px-10 py-4 rounded-2xl text-xl font-bold hover:scale-105 transition-all shadow-lg inline-block">
          Start For Free 🚀
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-8 text-center">
        <p className="text-2xl font-bold text-white mb-2">🌿 JobHive</p>
        <p>© 2025 JobHive. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
