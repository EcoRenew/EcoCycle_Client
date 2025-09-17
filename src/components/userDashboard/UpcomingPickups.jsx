import React from "react";

const UpcomingPickups = () => {
  return (
    <div className="bg-white  dark:bg-[#25432E] rounded-2xl shadow-md p-6">
      <h3 className="text-lg font-semibold dark:text-white text-gray-800 mb-4">
        Upcoming Pickups
      </h3>
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-white/80 font-medium">
          No upcoming pickups
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 mb-4">
          Schedule your next recycling pickup to continue making a difference.
        </p>
        <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
          Schedule Pickup
        </button>
      </div>
    </div>
  );
};

export default UpcomingPickups;
