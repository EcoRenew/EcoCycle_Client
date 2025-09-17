import React from "react";

const StartCard = ({ title, value, subtitle }) => {
  return (
    <div className="bg-white dark:bg-[#25432E] rounded-2xl shadow-md p-6 flex flex-col items-center justify-center">
      <h3 className="text-gray-500 text-sm font-medium dark:text-white mb-2">
        {title}
      </h3>
      <div className="text-4xl font-bold text-green-600 mb-1">{value}</div>
      <p className="text-gray-400 text-sm">{subtitle}</p>
    </div>
  );
};

export default StartCard;
