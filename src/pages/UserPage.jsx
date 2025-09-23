import UserProfile from "../components/userDashboard/UserProfile";
import DashboardMenu from "../components/userDashboard/DashboardMenu";
import StartCard from "../components/userDashboard/StartCard";
import UpcomingPickups from "../components/userDashboard/UpcomingPickups";
import RecentDonations from "../components/userDashboard/RecentDonations";
import { useUserDashboard } from "../hooks/useUserDashboard";

const UserPage = () => {
  const { data, isLoading, isError, error } = useUserDashboard();

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-500 dark:text-gray-300">Loading dashboard...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 mt-10">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StartCard
            title="Recycling Impact Score"
            value={data?.recycling_points ?? 0}
            subtitle="points"
          />
          <StartCard
            title="Total Donations"
            value={data?.total_donation_requests ?? 0}
            subtitle="donations"
          />
          <StartCard
            title="Items Recycled"
            value={data?.total_recycled_items ?? 0}
            subtitle="items"
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UpcomingPickups pickups={data?.upcoming_pickups || []} />
          <RecentDonations pickups={data?.upcoming_pickups || []} />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
