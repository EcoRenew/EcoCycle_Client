import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake, faEnvelope, faExternalLinkAlt, faSpinner } from '@fortawesome/free-solid-svg-icons';

const PartnersPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const partners = [
    {
      id: 1,
      name: 'GreenTech Solutions',
      logo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=150&h=150&fit=crop&crop=center',
      description: 'Providing innovative technology solutions for sustainable waste management and recycling processes.',
      website: 'https://greentechsolutions.example.com',
    },
    {
      id: 2,
      name: 'EcoFriendly Packaging',
      logo: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=150&h=150&fit=crop&crop=center',
      description: 'Specializing in biodegradable and compostable packaging alternatives for businesses of all sizes.',
      website: 'https://ecopackaging.example.com',
    },
    {
      id: 3,
      name: 'Renewable Energy Partners',
      logo: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=150&h=150&fit=crop&crop=center',
      description: 'Helping organizations transition to clean energy sources and reduce their carbon footprint.',
      website: 'https://renewenergy.example.com',
    },
    {
      id: 4,
      name: 'Ocean Cleanup Initiative',
      logo: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=150&h=150&fit=crop&crop=center',
      description: 'Dedicated to removing plastic and other pollutants from our oceans and waterways.',
      website: 'https://oceancleanup.example.com',
    },
    {
      id: 5,
      name: 'Sustainable Cities Network',
      logo: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=150&h=150&fit=crop&crop=center',
      description: 'Connecting urban planners and city officials to implement sustainable infrastructure and policies.',
      website: 'https://sustainablecities.example.com',
    },
    {
      id: 6,
      name: 'Green Education Foundation',
      logo: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=150&h=150&fit=crop&crop=center',
      description: 'Providing educational resources and programs about environmental conservation and sustainability.',
      website: 'https://greeneducation.example.com',
    },
    {
      id: 7,
      name: 'Clean Water Alliance',
      logo: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=150&h=150&fit=crop&crop=center',
      description: 'Working to ensure access to clean water and sustainable water management practices worldwide.',
      website: 'https://cleanwateralliance.example.com',
    },
    {
      id: 8,
      name: 'Forest Conservation Society',
      logo: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=150&h=150&fit=crop&crop=center',
      description: 'Protecting and restoring forest ecosystems through community engagement and sustainable practices.',
      website: 'https://forestconservation.example.com',
    },
    {
      id: 9,
      name: 'Climate Action Network',
      logo: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=150&h=150&fit=crop&crop=center',
      description: 'Mobilizing communities and organizations to take meaningful action against climate change.',
      website: 'https://climateaction.example.com',
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block p-6 bg-gradient-to-r from-ecoGreen to-green-500 rounded-2xl mb-6 shadow-lg animate-pulse">
            <FontAwesomeIcon icon={faSpinner} className="text-white text-4xl animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">Loading Partners...</h2>
          <p className="text-gray-500 dark:text-gray-400">Please wait while we fetch our amazing partners</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900">
      <div className="container mx-auto px-4 py-20">
        {/* Header Section */}
        <div className="text-center mb-12 relative">
          {/* Simplified background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-6 -left-6 w-16 h-16 bg-ecoGreen bg-opacity-5 rounded-full animate-pulse"></div>
            <div className="absolute -top-3 -right-3 w-12 h-12 bg-green-400 bg-opacity-10 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-6 left-1/4 w-10 h-10 bg-ecoGreen bg-opacity-5 rounded-full animate-pulse delay-1000"></div>
          </div>
          
          <div className="relative z-10">
            <div 
              className="inline-block p-3 bg-gradient-to-r from-ecoGreen to-green-500 rounded-xl mb-4 shadow-md transform hover:scale-105 transition-all duration-300 focus-within:ring-2 focus-within:ring-ecoGreen/30"
              role="img"
              aria-label="Partnership handshake icon"
            >
              <FontAwesomeIcon icon={faHandshake} className="text-white text-3xl" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-ecoGreen to-green-600 dark:from-white dark:via-green-300 dark:to-green-400 bg-clip-text text-transparent animate-fade-in-up">
              Our Partners
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-200">
              We collaborate with organizations that share our commitment to sustainability and environmental conservation.
            </p>
            
            {/* Quick stats */}
            <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-ecoGreen rounded-full mr-2"></span>
                {partners.length} Trusted Partners
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Global Reach
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                Sustainable Impact
              </div>
            </div>
          </div>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {partners.map((partner, index) => (
            <article 
              key={partner.id} 
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:scale-102 hover:shadow-xl hover:-translate-y-1 animate-fade-in-up focus-within:ring-2 focus-within:ring-ecoGreen/30"
              style={{ animationDelay: `${index * 100}ms` }}
              tabIndex={0}
              role="article"
              aria-label={`Partner: ${partner.name}`}
            >
              {/* Subtle overlay on hover */}
              <div className="absolute inset-0 bg-gray-50/0 group-hover:bg-gray-50/5 dark:group-hover:bg-gray-700/5 transition-all duration-300"></div>
              
              <div className="p-5 flex flex-col items-center text-center relative z-10">
                {/* Logo container with clean styling */}
                <div className="relative mb-4">
                  <div className="w-20 h-20 rounded-full bg-white dark:bg-gray-100 p-1.5 shadow-sm group-hover:shadow-md transition-all duration-300 overflow-hidden">
                    <img 
                      src={partner.logo} 
                      alt={`${partner.name} company logo`} 
                      className="w-full h-full object-cover rounded-full"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/150x150/f3f4f6/6b7280?text=${partner.name.charAt(0)}`;
                      }}
                    />
                  </div>
                </div>
                
                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white group-hover:text-ecoGreen transition-colors duration-300 line-clamp-2">
                  {partner.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-sm line-clamp-3">
                  {partner.description}
                </p>
                
                {/* Modern button with hover effects */}
                <a 
                  href={partner.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-ecoGreen to-green-600 text-white font-medium text-sm rounded-lg hover:from-green-600 hover:to-ecoGreen transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg focus:ring-2 focus:ring-ecoGreen/30 focus:outline-none"
                  aria-label={`Visit ${partner.name} website (opens in new tab)`}
                >
                  <span>Visit Website</span>
                  <FontAwesomeIcon 
                    icon={faExternalLinkAlt} 
                    className="ml-2 w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300" 
                    aria-hidden="true"
                  />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Become a Partner Section */}
        <section className="relative py-12" aria-labelledby="become-partner-heading">
          {/* Simplified background decoration */}
          <div className="absolute -top-4 -left-4 w-20 h-20 bg-ecoGreen/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-green-400/10 rounded-full blur-xl animate-pulse delay-1000"></div>
          
          <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 md:p-12 max-w-6xl mx-auto shadow-xl border border-white/20 dark:border-gray-700/20">
            <div className="text-center mb-10">
              <div className="inline-block p-3 bg-gradient-to-r from-ecoGreen/10 to-green-500/10 rounded-xl mb-4">
                <FontAwesomeIcon icon={faHandshake} className="text-ecoGreen text-3xl" />
              </div>
              <h2 
                id="become-partner-heading"
                className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-ecoGreen dark:from-white dark:to-green-300 bg-clip-text text-transparent"
              >
                Become a Partner
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Join our network of organizations committed to making a positive environmental impact.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Benefits */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                  Why Partner With Us?
                </h3>
                
                <div className="space-y-3">
                  {[
                    'Collaborate on sustainability initiatives',
                    'Access our network of eco-conscious consumers',
                    'Showcase your commitment to environmental responsibility',
                    'Participate in joint marketing and educational campaigns'
                  ].map((item, index) => (
                    <div key={index} className="flex items-start group">
                      <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-r from-ecoGreen to-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-600 dark:text-gray-300 group-hover:text-ecoGreen transition-colors duration-300 text-sm">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Contact Card */}
              <div className="bg-gradient-to-br from-ecoGreen/5 to-green-500/5 rounded-xl p-6 shadow-lg border border-ecoGreen/20">
                <div className="text-center mb-6">
                  <div className="inline-block p-2 bg-gradient-to-r from-ecoGreen to-green-500 rounded-lg mb-3">
                    <FontAwesomeIcon icon={faEnvelope} className="text-white text-lg" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Ready to Get Started?</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Reach out to our partnerships team to discuss opportunities.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <a 
                    href="mailto:partnerships@ecocycle.com" 
                    className="group flex items-center justify-center w-full py-3 px-6 bg-gradient-to-r from-ecoGreen to-green-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-ecoGreen transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg focus:ring-2 focus:ring-ecoGreen/30 focus:outline-none"
                    aria-label="Send email to partnerships team"
                  >
                    <FontAwesomeIcon icon={faEnvelope} className="mr-2 group-hover:animate-bounce" aria-hidden="true" />
                    Contact Partnerships Team
                  </a>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-ecoGreen">24h</div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">Response Time</div>
                    </div>
                    <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-ecoGreen">100+</div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">Active Partners</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PartnersPage;