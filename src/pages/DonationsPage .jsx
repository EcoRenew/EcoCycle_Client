import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandHoldingHeart,
  faHistory,
  faMoneyBillWave,
  faBoxOpen,
  faCalendarAlt,
  faReceipt,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { useUserDashboard } from "../hooks/useUserDashboard";

const DonationsPage = () => {
  const { data: dashboardData, isLoading, error } = useUserDashboard();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ecoGreen mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading donation data...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 flex items-center justify-center">
        <div className="text-center text-red-500">
          <p>Error loading donation data: {error.message}</p>
        </div>
      </div>
    );
  }

  const {
    total_donation_requests = 0,
    total_items_donated = 0,
    total_price_donated = 0,
    upcoming_pickups = [],
  } = dashboardData || {};

  // Filter only donation pickups
  const donationPickups =
    upcoming_pickups?.filter((pickup) => pickup.request_type === "Donation") ||
    [];
  const completedDonations = donationPickups.filter(
    (pickup) => pickup.status === "Completed"
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case "Completed":
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`;
      case "In Progress":
        return `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200`;
      case "Pending":
      default:
        return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200`;
    }
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <FontAwesomeIcon
            icon={faHandHoldingHeart}
            className="text-4xl text-ecoGreen mb-4"
          />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            My Donations
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Track your charitable contributions and environmental impact
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Donations Card */}
          <div className="bg-white dark:bg-[#25432E] rounded-lg shadow-md p-6 text-center">
            <div className="bg-blue-100 dark:bg-blue-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <FontAwesomeIcon
                icon={faReceipt}
                className="text-blue-600 dark:text-blue-400 text-xl"
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {total_donation_requests}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">Total Donations</p>
          </div>

          {/* Items Donated Card */}
          <div className="bg-white dark:bg-[#25432E] rounded-lg shadow-md p-6 text-center">
            <div className="bg-green-100 dark:bg-green-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <FontAwesomeIcon
                icon={faBoxOpen}
                className="text-green-600 dark:text-green-400 text-xl"
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {total_items_donated}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">Items Donated</p>
          </div>

          {/* Total Value Card */}
          <div className="bg-white dark:bg-[#25432E] rounded-lg shadow-md p-6 text-center">
            <div className="bg-purple-100 dark:bg-purple-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <FontAwesomeIcon
                icon={faMoneyBillWave}
                className="text-purple-600 dark:text-purple-400 text-xl"
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(total_price_donated)}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Total Value Donated
            </p>
          </div>
        </div>

        {/* Impact Message */}
        <div className="bg-gradient-to-r from-ecoGreen to-green-600 rounded-lg p-6 text-white mb-8">
          <div className="flex items-center justify-center">
            <FontAwesomeIcon icon={faTrophy} className="text-2xl mr-3" />
            <div>
              <h3 className="text-xl font-bold">Environmental Champion!</h3>
              <p className="opacity-90">
                Your donations have helped recycle {total_items_donated} items
                worth {formatCurrency(total_price_donated)}
              </p>
            </div>
          </div>
        </div>

        {/* Upcoming Donations */}
        <div className="bg-white dark:bg-[#25432E] rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-6">
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className="text-ecoGreen text-xl mr-3"
            />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Upcoming Donation Pickups
            </h2>
            <span className="ml-3 bg-ecoGreen text-white px-3 py-1 rounded-full text-sm">
              {donationPickups.length}
            </span>
          </div>

          {donationPickups.length > 0 ? (
            <div className="space-y-4">
              {donationPickups.map((donation) => (
                <div
                  key={donation.request_id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-lg">
                        Donation #{donation.request_id}
                      </h4>
                      <span className={getStatusBadge(donation.status)}>
                        {donation.status}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Scheduled: {formatDate(donation.pickup_date)}
                      </div>
                      <div className="text-green-600 dark:text-green-400 font-semibold">
                        {formatCurrency(
                          donation.items.reduce(
                            (sum, item) =>
                              sum + parseFloat(item.calculated_price),
                            0
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Address: {donation.pickup_address}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {donation.items.map((item, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 dark:bg-[#25432E] px-3 py-1 rounded-full text-sm"
                      >
                        {item.material_name} ({item.quantity}kg)
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <FontAwesomeIcon
                icon={faCalendarAlt}
                className="text-4xl mb-3 opacity-50"
              />
              <p>No upcoming donation pickups scheduled</p>
            </div>
          )}
        </div>

        {/* Donation History */}
        <div className="bg-white dark:bg-[#25432E] rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <FontAwesomeIcon
              icon={faHistory}
              className="text-ecoGreen text-xl mr-3"
            />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Donation History
            </h2>
          </div>

          {completedDonations.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 font-semibold">
                      Donation ID
                    </th>
                    <th className="text-left py-3 font-semibold">
                      Date Completed
                    </th>
                    <th className="text-left py-3 font-semibold">Items</th>
                    <th className="text-right py-3 font-semibold">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {completedDonations.map((donation) => (
                    <tr
                      key={donation.request_id}
                      className="border-b border-gray-100 dark:border-gray-800"
                    >
                      <td className="py-3">#{donation.request_id}</td>
                      <td className="py-3">
                        {formatDate(donation.pickup_date)}
                      </td>
                      <td className="py-3">
                        {donation.items
                          .map((item) => item.material_name)
                          .join(", ")}
                      </td>
                      <td className="py-3 text-right font-semibold text-green-600 dark:text-green-400">
                        {formatCurrency(
                          donation.items.reduce(
                            (sum, item) =>
                              sum + parseFloat(item.calculated_price),
                            0
                          )
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <FontAwesomeIcon
                icon={faHistory}
                className="text-4xl mb-3 opacity-50"
              />
              <p>No donation history available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonationsPage;
