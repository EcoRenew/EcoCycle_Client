import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faMapMarkerAlt, faClock, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const EventsPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    eventId: '',
  });

  const upcomingEvents = [
    {
      id: 1,
      title: 'Community Cleanup Day',
      date: 'July 15, 2023',
      time: '9:00 AM - 1:00 PM',
      location: 'Central Park, New York',
      image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: "Join us for a community cleanup event at Central Park. We'll provide all necessary equipment. Help us make our community cleaner and greener!"
      ,
    },
    {
      id: 2,
      title: 'Sustainable Living Workshop',
      date: 'August 5, 2023',
      time: '2:00 PM - 4:00 PM',
      location: 'EcoCycle Headquarters, Boston',
      image: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Learn practical tips and tricks for reducing your environmental footprint. This workshop covers composting, reducing waste, and sustainable shopping practices.',
    },
    {
      id: 3,
      title: 'E-Waste Collection Drive',
      date: 'August 20, 2023',
      time: '10:00 AM - 3:00 PM',
      location: 'City Hall Plaza, Chicago',
      image: 'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Bring your old electronics for responsible recycling. We accept computers, phones, TVs, and more. Help keep electronic waste out of landfills!',
    },
  ];

  const pastEvents = [
    {
      id: 4,
      title: 'Earth Day Celebration',
      date: 'April 22, 2023',
      time: '11:00 AM - 4:00 PM',
      location: 'Riverside Park, Seattle',
      image: 'https://images.unsplash.com/photo-1569680099601-aa41a8353f2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'A day of environmental education, tree planting, and community building. Thanks to everyone who participated in making this event a success!',
    },
    {
      id: 5,
      title: 'Recycling Awareness Campaign',
      date: 'March 15, 2023',
      time: '1:00 PM - 3:00 PM',
      location: 'Downtown Library, Austin',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Our educational campaign reached over 500 community members, teaching proper recycling techniques and the importance of reducing contamination in recycling streams.',
    },
  ];

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setFormData({
      ...formData,
      eventId: event.id,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    console.log('Registration submitted:', formData);
    alert(`Thank you for registering for the event, ${formData.name}!`);
    setFormData({
      name: '',
      email: '',
      eventId: selectedEvent.id,
    });
  };

  const displayEvents = activeTab === 'upcoming' ? upcomingEvents : pastEvents;

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="inline-block p-3 bg-ecoGreen bg-opacity-10 rounded-full mb-4">
          <FontAwesomeIcon icon={faCalendarAlt} className="text-ecoGreen text-3xl" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Events</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Join us for educational workshops, community cleanups, and other sustainability-focused events.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-md shadow-sm">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-6 py-3 text-sm font-medium rounded-l-lg ${activeTab === 'upcoming'
              ? 'bg-ecoGreen text-white'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
          >
            Upcoming Events
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`px-6 py-3 text-sm font-medium rounded-r-lg ${activeTab === 'past'
              ? 'bg-ecoGreen text-white'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
          >
            Past Events
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Events List */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayEvents.map((event) => (
              <div 
                key={event.id} 
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105 ${selectedEvent?.id === event.id ? 'ring-2 ring-ecoGreen' : ''}`}
                onClick={() => handleEventClick(event)}
              >
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{event.title}</h3>
                  <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-ecoGreen" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                    <FontAwesomeIcon icon={faClock} className="mr-2 text-ecoGreen" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300 mb-4">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-ecoGreen" />
                    <span>{event.location}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 line-clamp-3">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Event Details and Registration */}
        <div className="lg:col-span-1">
          {selectedEvent ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{selectedEvent.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{selectedEvent.description}</p>
              
              {activeTab === 'upcoming' && (
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Register for this Event</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FontAwesomeIcon icon={faUser} className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="pl-10 w-full py-2 px-4 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ecoGreen text-gray-700 dark:text-gray-300"
                          placeholder="Your full name"
                        />
                      </div>
                    </div>
                    <div className="mb-6">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FontAwesomeIcon icon={faEnvelope} className="text-gray-400" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="pl-10 w-full py-2 px-4 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ecoGreen text-gray-700 dark:text-gray-300"
                          placeholder="Your email address"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 px-4 bg-ecoGreen text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Register Now
                    </button>
                  </form>
                </div>
              )}
              
              {activeTab === 'past' && (
                <div className="text-center">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">This event has already taken place.</p>
                  <a 
                    href="#" 
                    className="inline-block px-6 py-3 bg-ecoGreen text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
                  >
                    View Event Gallery
                  </a>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Select an Event</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Click on an event to view details and register.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;