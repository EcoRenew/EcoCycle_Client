import React from "react";

const RecentDonations = () => {
  const donations = [
    {
      date: "July 15, 2024",
      items: "Cardboard, Plastic Bottles",
      status: "Completed",
    },
    {
      date: "June 20, 2024",
      items: "Glass, Aluminum Cans",
      status: "Completed",
    },
    { date: "May 25, 2024", items: "Paper, Magazines", status: "Completed" },
  ];

  return (
    <div className="bg-white  dark:bg-[#25432E] rounded-2xl shadow-md p-6">
      <h3 className="text-lg font-semibold dark:text-white text-gray-800 mb-4">
        Recent Donations
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left text-gray-500 dark:text-gray-400 font-medium py-2">
                Date
              </th>
              <th className="text-left text-gray-500 dark:text-gray-400 font-medium py-2">
                Items Donated
              </th>
              <th className="text-left text-gray-500 dark:text-gray-400 font-medium py-2">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="py-3 text-gray-600 dark:text-gray-400">
                  {donation.date}
                </td>
                <td className="py-3 text-gray-600 dark:text-gray-400">
                  {donation.items}
                </td>
                <td className="py-3">
                  <span className="bg-green-100 text-green-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {donation.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentDonations;
