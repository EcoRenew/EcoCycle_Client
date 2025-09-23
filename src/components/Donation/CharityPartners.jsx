import React from 'react';

const CharityPartners = ({ partners, fadeIn }) => {
  return (
    <div className={`mt-20 pb-12 transition-all duration-1000 delay-700 ease-out ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Charity Partners</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Working together with trusted organizations to make a real impact in our community
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="bg-white rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ease-out"
            style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 15px 30px rgba(56, 175, 68, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            }}
          >
            <img
              src={partner.image}
              alt={partner.name}
              className="w-full h-24 object-cover"
            />
            <div className="p-3">
              <h3 className="text-sm font-medium text-gray-800 text-center mb-1">{partner.name}</h3>
              <p className="text-xs text-gray-500 text-center">Charity Partner</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharityPartners;
