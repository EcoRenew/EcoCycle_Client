import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTree,
  faWater,
  faBolt,
  faChartLine,
  faTrophy,
  faRecycle,
  faHandHoldingHeart,
  faEarthAmericas,
  faSeedling,
  faCloud,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { useUserDashboard } from "../hooks/useUserDashboard";

const ImpactPage = () => {
  const { data: dashboardData, isLoading, error } = useUserDashboard();

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ecoGreen mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Calculating your environmental impact...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center text-red-500">
          <p>Error loading impact data: {error.message}</p>
        </div>
      </div>
    );
  }

  const {
    recycling_points = 0,
    total_recycled_items = 0,
    total_items_donated = 0,
    upcoming_pickups = [],
  } = dashboardData || {};

  // Calculate environmental impact metrics
  const calculateEnvironmentalImpact = () => {
    const totalItemsProcessed = total_recycled_items + total_items_donated;

    // Environmental impact calculations (estimates)
    const energySaved = totalItemsProcessed * 5.7; // kWh per kg
    const waterSaved = totalItemsProcessed * 22; // Liters per kg
    const co2Reduced = totalItemsProcessed * 2.1; // kg CO2 equivalent
    const treesSaved = totalItemsProcessed * 0.02; // Trees per kg

    return {
      energySaved: Math.round(energySaved),
      waterSaved: Math.round(waterSaved),
      co2Reduced: Math.round(co2Reduced),
      treesSaved: treesSaved.toFixed(1),
    };
  };

  const impact = calculateEnvironmentalImpact();
  const totalPickups = upcoming_pickups?.length || 0;
  const completedPickups =
    upcoming_pickups?.filter((p) => p.status === "Completed").length || 0;

  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  };

  const ImpactCard = ({ icon, value, unit, label, description, color }) => (
    <div className="bg-white dark:bg-[#25432E] rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-200">
      <div
        className={`w-16 h-16 rounded-full ${color} flex items-center justify-center mx-auto mb-4`}
      >
        <FontAwesomeIcon icon={icon} className="text-white text-2xl" />
      </div>
      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        {formatNumber(value)} {unit}
      </div>
      <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {description}
      </div>
    </div>
  );

  const StatCard = ({ icon, value, label, subtitle, color }) => (
    <div className="bg-white dark:bg-[#25432E] rounded-lg shadow-md p-4 flex items-center">
      <div
        className={`w-12 h-12 rounded-full ${color} flex items-center justify-center mr-4`}
      >
        <FontAwesomeIcon icon={icon} className="text-white text-lg" />
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-900 dark:text-white">
          {value}
        </div>
        <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </div>
        {subtitle && (
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen  pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="bg-gradient-to-r from-green-400 to-ecoGreen w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <FontAwesomeIcon
              icon={faEarthAmericas}
              className="text-white text-4xl"
            />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Your Environmental Impact
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Every item you recycle or donate makes a difference. Here's how your
            efforts are helping our planet.
          </p>
        </div>

        {/* Environmental Impact Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <ImpactCard
            icon={faBolt}
            value={impact.energySaved}
            unit="kWh"
            label="Energy Saved"
            description="Equivalent to powering a home for days"
            color="bg-yellow-500"
          />
          <ImpactCard
            icon={faWater}
            value={impact.waterSaved}
            unit="L"
            label="Water Conserved"
            description="Enough to fill multiple bathtubs"
            color="bg-blue-500"
          />
          <ImpactCard
            icon={faCloud}
            value={impact.co2Reduced}
            unit="kg"
            label="CO₂ Reduction"
            description="Equivalent to taking cars off the road"
            color="bg-gray-600"
          />
          <ImpactCard
            icon={faTree}
            value={impact.treesSaved}
            unit="trees"
            label="Trees Protected"
            description="Helping preserve our forests"
            color="bg-green-600"
          />
        </div>

        {/* Activity Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            icon={faRecycle}
            value={total_recycled_items}
            label="Items Recycled"
            subtitle="Reducing landfill waste"
            color="bg-green-500"
          />
          <StatCard
            icon={faHandHoldingHeart}
            value={total_items_donated}
            label="Items Donated"
            subtitle="Supporting circular economy"
            color="bg-blue-500"
          />
          <StatCard
            icon={faTrophy}
            value={recycling_points}
            label="Eco Points"
            subtitle="Your sustainability score"
            color="bg-purple-500"
          />
          <StatCard
            icon={faChartLine}
            value={totalPickups}
            label="Total Pickups"
            subtitle={`${completedPickups} completed`}
            color="bg-orange-500"
          />
        </div>

        {/* Impact Visualization */}
        <div className="bg-white dark:bg-[#25432E] rounded-xl shadow-lg p-8 mb-12">
          <div className="flex items-center mb-6">
            <FontAwesomeIcon
              icon={faSeedling}
              className="text-ecoGreen text-2xl mr-3"
            />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Your Impact Journey
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Carbon Footprint Reduction
              </h3>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-full h-4 mb-2">
                <div
                  className="bg-green-500 h-4 rounded-full transition-all duration-1000"
                  style={{
                    width: `${Math.min((impact.co2Reduced / 100) * 100, 100)}%`,
                  }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                You've reduced {impact.co2Reduced} kg of CO₂ emissions
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">
                Resource Conservation
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Energy Saved</span>
                    <span className="text-sm font-semibold">
                      {impact.energySaved} kWh
                    </span>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Water Conserved</span>
                    <span className="text-sm font-semibold">
                      {impact.waterSaved} L
                    </span>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Motivational Section */}
        <div className="bg-gradient-to-r from-ecoGreen to-green-600 rounded-xl p-8  text-white text-center">
          <FontAwesomeIcon icon={faSun} className="text-4xl mb-4 opacity-80" />
          <h3 className="text-2xl font-bold mb-2">Keep Making a Difference!</h3>
          <p className="text-lg opacity-90 mb-4">
            Your {total_recycled_items + total_items_donated} items have already
            created positive change. Continue your sustainability journey with
            us.
          </p>
          <div className="text-3xl font-bold">🌍 + ♻️ = 💚</div>
        </div>

        {/* Fun Facts */}
        <div className="mt-12 text-center mb-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Did You Know?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-[#25432E] rounded-lg p-6 shadow-md">
              <div className="text-ecoGreen text-3xl mb-2">♻️</div>
              <p className="text-gray-700 dark:text-gray-300">
                Recycling one aluminum can saves enough energy to run a TV for 3
                hours
              </p>
            </div>
            <div className="bg-white dark:bg-[#25432E] rounded-lg p-6 shadow-md">
              <div className="text-ecoGreen text-3xl mb-2">🌳</div>
              <p className="text-gray-700 dark:text-gray-300">
                The paper you recycle could save approximately 17 trees per ton
              </p>
            </div>
            <div className="bg-white dark:bg-[#25432E] rounded-lg p-6 shadow-md">
              <div className="text-ecoGreen text-3xl mb-2">💧</div>
              <p className="text-gray-700 dark:text-gray-300">
                Recycling plastic uses 88% less energy than making it from raw
                materials
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactPage;
