import UserInspirationCard from "./UserInspirationCard";

const UserInspirationsList = ({ inspirations }) => (
  <div>
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        User Inspiration
      </h2>
      <button className="text-green-600 hover:text-green-700 text-sm font-medium">
        View more
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {inspirations.map((i) => (
        <UserInspirationCard key={i.id} inspiration={i} />
      ))}
    </div>
  </div>
);

export default UserInspirationsList;
