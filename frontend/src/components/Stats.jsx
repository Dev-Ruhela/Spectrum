import React from "react";

const Stats = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center py-12 bg-gray-50">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">25K+</h2>
        <p className="text-gray-600">Lives Impacted</p>
      </div>
      <div>
        <h2 className="text-3xl font-bold text-gray-900">1.2K</h2>
        <p className="text-gray-600">Career Placements</p>
      </div>
      <div>
        <h2 className="text-3xl font-bold text-gray-900">50K+</h2>
        <p className="text-gray-600">Training Hours</p>
      </div>
      <div>
        <h2 className="text-3xl font-bold text-gray-900">200+</h2>
        <p className="text-gray-600">Community Events</p>
      </div>
    </div>
  );
};

export default Stats;
