import React from "react";

const CommunityVoices = () => {
  return (
    <div className="py-16 px-16 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-8">Community Voices</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {/* Card 1 */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <blockquote className="italic text-gray-700">
            "This platform changed my life. I found the support and resources I needed to transition into tech."
            <footer className="mt-4 text-gray-900 font-semibold">
              - Sarah Johnson, Software Engineer
            </footer>
          </blockquote>
        </div>
        {/* Card 2 */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <blockquote className="italic text-gray-700">
            "Joining this community gave me the confidence to pursue my dream job in data analytics."
            <footer className="mt-4 text-gray-900 font-semibold">
              - James Lee, Data Analyst
            </footer>
          </blockquote>
        </div>
        {/* Card 3 */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <blockquote className="italic text-gray-700">
            "The mentorship I received here was invaluable in helping me grow as a developer."
            <footer className="mt-4 text-gray-900 font-semibold">
              - Maria Gonzalez, Frontend Developer
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default CommunityVoices;
