const UpcomingPickups = ({ pickups }) => {
  return (
    <div className="bg-white dark:bg-[#25432E] rounded-2xl shadow-md p-6">
      <h3 className="text-lg font-semibold dark:text-white text-gray-800 mb-4">
        Upcoming Pickups
      </h3>

      {pickups.length === 0 ? (
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
      ) : (
        <div className="space-y-4">
          {pickups.map((pickup) => (
            <div
              key={pickup.request_id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
            >
              <p className="font-medium dark:text-white">
                {pickup.request_type} – {pickup.status}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Date: {new Date(pickup.pickup_date).toLocaleDateString()}
              </p>
              <ul className="mt-2 text-sm text-gray-700 dark:text-gray-300 list-disc pl-4">
                {pickup.items.map((item, i) => (
                  <li key={i}>
                    {item.material_name} – {item.quantity} pcs ($
                    {item.calculated_price})
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingPickups;
