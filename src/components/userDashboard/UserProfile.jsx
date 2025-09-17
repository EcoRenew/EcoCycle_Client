import React from "react";

const UserProfile = () => {
  return (
    <div className="bg-white py-16 dark:bg-[#25432E] rounded-2xl shadow-md p-6 mb-6">
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-xl font-bold mr-4">
          SG
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Sophia Green
          </h2>
          <p className="text-gray-500 dark:text-gray-400">Member since 2022</p>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-ecoGreen ">
          Welcome back, Sophia!
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Here's a summary of your recycling journey.
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
