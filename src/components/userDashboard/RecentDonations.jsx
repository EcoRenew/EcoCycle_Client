import React from "react";

const RecentDonations = ({ pickups }) => {
  const donations =
    pickups?.filter((pickup) => pickup.request_type === "Donation") || [];

  return (
    <div className="bg-white dark:bg-[#25432E] rounded-2xl shadow-md p-6">
      <h3 className="text-lg font-semibold dark:text-white text-gray-800 mb-4">
        Recent Donations
      </h3>

      {donations.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">No recent donations.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left text-gray-500 dark:text-gray-400 font-medium py-2">
                  Total Items
                </th>
                <th className="text-left text-gray-500 dark:text-gray-400 font-medium py-2">
                  Total Price
                </th>
                <th className="text-left text-gray-500 dark:text-gray-400 font-medium py-2">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => {
                const totalItems = donation.items.reduce(
                  (sum, i) => sum + parseFloat(i.quantity),
                  0
                );
                const totalPrice = donation.items.reduce(
                  (sum, i) => sum + parseFloat(i.calculated_price),
                  0
                );

                return (
                  <tr
                    key={donation.request_id}
                    className="border-b border-gray-100 dark:border-gray-700"
                  >
                    <td className="py-3 text-gray-600 dark:text-gray-400">
                      {totalItems}
                    </td>
                    <td className="py-3 text-gray-600 dark:text-gray-400">
                      ${totalPrice.toFixed(2)}
                    </td>
                    <td className="py-3">
                      <span className="bg-green-100 text-green-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {donation.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RecentDonations;
