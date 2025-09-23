import React from 'react';
import { Heart } from 'lucide-react';

const DonationNextSteps = () => {
  return (
    <div className="mt-8 p-6 bg-green-50 rounded-lg border-l-4 border-green-400">
      <div className="flex items-center">
        <Heart className="w-5 h-5 text-green-600 mr-2" />
        <h4 className="font-semibold text-green-800">What happens next?</h4>
      </div>
      <p className="text-green-700 mt-2 text-sm">
        We'll review your donation request within 24 hours and contact you to arrange pickup. 
        Your items will be carefully sorted and distributed to our partner charities where they'll make the biggest impact.
      </p>
    </div>
  );
};

export default DonationNextSteps;
