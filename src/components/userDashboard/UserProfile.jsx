import { useAuth } from "../../context/AuthContext";

const UserProfile = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white pt-16 dark:bg-[#25432E] p-6 ">
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-xl font-bold mr-4">
          {user?.name
            ? user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
            : "?"}
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            {user?.name || "Guest"}
          </h2>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-ecoGreen ">
          Welcome back, {user?.name?.split(" ")[0] || "Guest"}!
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Here's a summary of your recycling journey.
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
