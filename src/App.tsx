import { Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <header className="container mx-auto flex flex-col md:flex-row items-center justify-between py-20 px-6">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
            Welcome to <span className="text-indigo-600">YourApp</span>
          </h1>
          <p className="text-gray-700 text-lg mb-6">
            Manage your tasks, projects, and team seamlessly. Start now and enjoy a smooth experience.
          </p>
          <Link to="/login" className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition font-medium shadow-md">
            Get Started
          </Link>
        </div>
        
      </header>

      {/* Features Section */}
      <section className="container mx-auto py-20 px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Features
        </h2>
        <div className="grid md:grid-cols-3 gap-10 text-center">
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-3">Organize Tasks</h3>
            <p className="text-gray-600">
              Keep all your tasks organized in one place with easy drag-and-drop.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-3">Track Progress</h3>
            <p className="text-gray-600">
              Track your project progress with charts, timelines, and analytics.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-3">Collaborate</h3>
            <p className="text-gray-600">
              Work with your team in real-time, assign tasks, and communicate easily.
            </p>
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="bg-indigo-600 py-20">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to get started?
          </h2>
          <p className="text-indigo-100 mb-8">
            Join thousands of users and improve your productivity today.
          </p>
          <Link to="/login" className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition">
            Sign Up Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-10 mt-auto">
        <div className="container mx-auto text-center text-gray-600">
          &copy; {new Date().getFullYear()} YourApp. All rights reserved.
        </div>
      </footer>
    </div>
    </div>
  );
}
