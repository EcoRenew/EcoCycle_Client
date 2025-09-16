import { User } from 'lucide-react';

const UserInspirationCard = ({ inspiration }) => (
  <div className="rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
    <img src={inspiration.image} alt={inspiration.title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="font-semibold text-gray-900 mb-1">{inspiration.title}</h3>
      <p className="text-gray-600 text-sm mb-3">{inspiration.description}</p>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-1"><User className="w-4 h-4" />{inspiration.author}</div>
        <span>{inspiration.timeAgo}</span>
      </div>
    </div>
  </div>
);

export default UserInspirationCard;
