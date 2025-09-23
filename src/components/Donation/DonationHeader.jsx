import React from 'react';
import { Heart } from 'lucide-react';

const DonationHeader = ({ fadeIn }) => {
  return (
    <div className="relative h-64 overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
        alt="Charity and donation" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-900/50"></div>
      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-out ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="text-center text-white px-4">
          <Heart className="w-12 h-12 mx-auto mb-4 text-white" />
          <h1 className="text-4xl font-bold mb-2">Make a Difference</h1>
          <p className="text-lg opacity-90">Transform your unwanted items into hope. Help us give your belongings a second life while supporting local charities.</p>
        </div>
      </div>
    </div>
  );
};

export default DonationHeader;
