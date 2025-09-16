import UserProfile from "../components/userDashboard/UserProfile";
import DashboardMenu from "../components/userDashboard/DashboardMenu";
import StartCard from "../components/userDashboard/StartCard";
import UpcomingPickups from "../components/userDashboard/UpcomingPickups";
import RecentDonations from "../components/userDashboard/RecentDonations";

const UserPage = () => {
  return (
    <>
      <div className="min-h-screen  p-6 mb-24 mt-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <UserProfile />
            <DashboardMenu />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StartCard
                title="Recycling Impact Score"
                value="85"
                subtitle="points"
              />
              <StartCard
                title="Total Donations"
                value="12"
                subtitle="donations"
              />
              <StartCard title="Items Recycled" value="240" subtitle="items" />
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <UpcomingPickups />
              <RecentDonations />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPage;
