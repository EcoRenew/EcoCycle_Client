import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faTruck,
  faClock,
  faMapMarkerAlt,
  faRecycle,
  faHandHoldingHeart,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";
import { useUserDashboard } from "../hooks/useUserDashboard";

const SchedulePage = () => {
  const { data: dashboardData, isLoading, error } = useUserDashboard();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ecoGreen mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading scheduled pickups...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 flex items-center justify-center">
        <div className="text-center text-red-500">
          <p>Error loading scheduled pickups: {error.message}</p>
        </div>
      </div>
    );
  }

  const { upcoming_pickups: scheduledPickups = [] } = dashboardData || {};

  const getRequestTypeIcon = (type) => {
    return type === "Recycling" ? faRecycle : faHandHoldingHeart;
  };

  const getRequestTypeColor = (type) => {
    return type === "Recycling" ? "text-green-500" : "text-blue-500";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "In Progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "Pending":
      default:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const calculateTotalPrice = (items) => {
    return items
      .reduce((total, item) => total + parseFloat(item.calculated_price), 0)
      .toFixed(2);
  };

  return (
    <div className="min-h-screen ">
      <div className="max-w-6xl mx-auto px-4 py-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-3" />
              Scheduled Pickups
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {scheduledPickups.length} upcoming pickup
              {scheduledPickups.length !== 1 ? "s" : ""} scheduled
            </p>
          </div>
        </div>

        {/* Pickups List */}
        <div className="grid gap-6">
          {scheduledPickups.map((pickup) => (
            <div
              key={pickup.request_id}
              className="bg-white dark:bg-[#25432E] rounded-lg shadow-md p-6 border-l-4 border-l-ecoGreen"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={getRequestTypeIcon(pickup.request_type)}
                    className={`text-2xl mr-3 ${getRequestTypeColor(
                      pickup.request_type
                    )}`}
                  />
                  <div>
                    <h3 className="text-lg font-semibold">
                      {pickup.request_type} Pickup
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        pickup.status
                      )}`}
                    >
                      {pickup.status}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Request #{pickup.request_id}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    className="mr-3 text-gray-500"
                  />
                  <div>
                    <div className="text-sm text-gray-500">Pickup Date</div>
                    <div className="font-medium">
                      {formatDate(pickup.pickup_date)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={faClock}
                    className="mr-3 text-gray-500"
                  />
                  <div>
                    <div className="text-sm text-gray-500">Scheduled Time</div>
                    <div className="font-medium">
                      {formatTime(pickup.pickup_date)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={faTruck}
                    className="mr-3 text-gray-500"
                  />
                  <div>
                    <div className="text-sm text-gray-500">Type</div>
                    <div className="font-medium">{pickup.request_type}</div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="mr-2 text-gray-500"
                  />
                  <span className="font-medium">Pickup Address:</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 ml-6">
                  {pickup.pickup_address}
                </p>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium">Items for Pickup:</span>
                  {pickup.request_type === "Donation" && (
                    <div className="flex items-center text-green-600 dark:text-green-400">
                      <FontAwesomeIcon
                        icon={faMoneyBillWave}
                        className="mr-1"
                      />
                      <span className="font-semibold">
                        ${calculateTotalPrice(pickup.items)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {pickup.items.map((item, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">
                          {item.material_name}
                        </span>
                        {pickup.request_type === "Donation" && (
                          <span className="text-green-600 dark:text-green-400 text-sm font-semibold">
                            ${item.calculated_price}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Quantity: {item.quantity} kg
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {pickup.request_type === "Donation" && (
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faHandHoldingHeart}
                      className="text-blue-500 mr-2"
                    />
                    <span className="text-blue-800 dark:text-blue-300 font-medium">
                      This is a donation pickup. Thank you for your
                      contribution!
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {scheduledPickups.length === 0 && (
          <div className="text-center py-12">
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className="text-6xl text-gray-300 mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-500">
              No scheduled pickups
            </h3>
            <p className="text-gray-400 mt-2">
              You don't have any upcoming pickups scheduled.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchedulePage;
