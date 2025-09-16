import { Camera } from 'lucide-react';

const HeaderBar = ({ setShowShareModal }) => (
  <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
    <div className="max-w-4xl mx-auto px-4 py-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">DIY Community</h1>
          <p className="text-gray-600">Share your creations and get inspired</p>
        </div>
        <button 
          onClick={() => setShowShareModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          <Camera className="w-4 h-4 inline mr-2" />
          Share Project
        </button>
      </div>
    </div>
  </div>
);

export default HeaderBar;
