import React from "react";

const Home = () => {
  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <header className="bg-gradient-to-b from-black to-gray-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Empowering LGBTQ+ Professionals</h1>
          <p className="text-lg mb-8">
            Creating inclusive spaces for growth, learning, and professional success. Join our
            community of changemakers.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-black hover:bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold">
              Join Our Community
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold">
              Learn More
            </button>
          </div>
        </div>
      </header>

      {/* Success Stories Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Rivera",
                image: "https://via.placeholder.com/150",
                role: "From intern to Tech Lead at Google",
                quote:
                  "This platform provided me with the mentorship and resources I needed to succeed in tech.",
              },
              {
                name: "Sarah Chen",
                image: "https://via.placeholder.com/150",
                role: "Founder of InnovateTech Solutions",
                quote:
                  "The community here helped me build my confidence and launch my own company.",
              },
              {
                name: "Jordan Taylor",
                image: "https://via.placeholder.com/150",
                role: "VP of Design at Microsoft",
                quote:
                  "Found incredible mentors who guided me through my career journey.",
              },
            ].map((story, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-6 text-center"
              >
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-24 h-24 mx-auto rounded-full mb-4"
                />
                <h3 className="font-semibold text-lg">{story.name}</h3>
                <p className="text-sm text-gray-600 italic mb-4">{story.role}</p>
                <p className="text-gray-800">{story.quote}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Opportunities Section */}
      <section className="bg-gray-200 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Explore Opportunities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Tech Careers",
                description: "Discover opportunities in leading tech companies",
                icon: "💻",
              },
              {
                title: "Mentorship",
                description: "Connect with LGBTQ+ leaders in your field",
                icon: "🤝",
              },
              {
                title: "Skill Development",
                description: "Access specialized training programs",
                icon: "🎓",
              },
              {
                title: "Networking",
                description: "Join professional LGBTQ+ networks",
                icon: "🌐",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-6 text-center"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-600 mt-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Share Your Feedback</h2>
          <form className="bg-white shadow-lg rounded-lg p-6 space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Your Experience</label>
              <textarea
                rows="4"
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-black text-white py-3 px-6 rounded-lg font-semibold w-full"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
