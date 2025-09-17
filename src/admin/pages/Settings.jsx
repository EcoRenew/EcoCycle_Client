import React, { useState } from 'react';
import {
  Cog6ToothIcon,
  UserCircleIcon,
  BellIcon,
  LockClosedIcon,
  GlobeAltIcon,
  ArrowPathIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [showSaveNotification, setShowSaveNotification] = useState(false);
  
  // General settings state
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'EcoCycle',
    siteDescription: 'Sustainable recycling platform for a greener future',
    contactEmail: 'contact@ecocycle.com',
    phoneNumber: '+1 (555) 123-4567',
    address: '123 Green Street, Eco City, EC 12345',
    timezone: 'UTC-5',
    dateFormat: 'MM/DD/YYYY',
  });

  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    newDonationRequests: true,
    newUserRegistrations: true,
    systemUpdates: true,
    marketingEmails: false,
  });

  // Security settings state
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    passwordExpiry: 90, // days
    sessionTimeout: 30, // minutes
    loginAttempts: 5,
  });

  // API settings state
  const [apiSettings, setApiSettings] = useState({
    apiKey: 'ec-api-xxxxxxxxxxxxxxxxxxxx',
    webhookUrl: 'https://api.ecocycle.com/webhooks',
    rateLimit: 100,
  });

  // Handle input change for general settings
  const handleGeneralChange = (e) => {
    const { name, value } = e.target;
    setGeneralSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle toggle change for notification settings
  const handleNotificationToggle = (setting) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  // Handle toggle change for security settings
  const handleSecurityToggle = (setting) => {
    setSecuritySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  // Handle number input change for security settings
  const handleSecurityNumberChange = (e) => {
    const { name, value } = e.target;
    setSecuritySettings(prev => ({
      ...prev,
      [name]: parseInt(value) || 0
    }));
  };

  // Handle input change for API settings
  const handleApiChange = (e) => {
    const { name, value } = e.target;
    setApiSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically save the settings to your backend
    console.log('Saving settings:', {
      generalSettings,
      notificationSettings,
      securitySettings,
      apiSettings,
    });
    
    // Show save notification
    setShowSaveNotification(true);
    setTimeout(() => setShowSaveNotification(false), 3000);
  };

  // Generate a new API key
  const generateApiKey = () => {
    const newKey = 'ec-api-' + Array(24)
      .fill(0)
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join('');
    
    setApiSettings(prev => ({
      ...prev,
      apiKey: newKey
    }));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex items-center space-x-3 mb-6">
        <Cog6ToothIcon className="h-7 w-7 text-ecoGreen" />
        <h1 className="text-2xl font-semibold text-gray-800">Settings</h1>
      </div>

      {/* Save notification */}
      {showSaveNotification && (
        <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center z-50">
          <CheckCircleIcon className="h-5 w-5 mr-2" />
          <span>Settings saved successfully!</span>
          <button 
            onClick={() => setShowSaveNotification(false)}
            className="ml-4 text-green-700 hover:text-green-900"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        {/* Settings navigation */}
        <div className="w-full md:w-1/4">
          <div className="bg-gray-50 rounded-lg p-4">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('general')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'general' ? 'bg-ecoGreen text-white' : 'text-gray-700 hover:bg-gray-200'}`}
              >
                <GlobeAltIcon className="mr-3 h-5 w-5" />
                General
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'notifications' ? 'bg-ecoGreen text-white' : 'text-gray-700 hover:bg-gray-200'}`}
              >
                <BellIcon className="mr-3 h-5 w-5" />
                Notifications
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'security' ? 'bg-ecoGreen text-white' : 'text-gray-700 hover:bg-gray-200'}`}
              >
                <ShieldCheckIcon className="mr-3 h-5 w-5" />
                Security
              </button>
              <button
                onClick={() => setActiveTab('api')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'api' ? 'bg-ecoGreen text-white' : 'text-gray-700 hover:bg-gray-200'}`}
              >
                <DocumentTextIcon className="mr-3 h-5 w-5" />
                API
              </button>
            </nav>
          </div>
        </div>

        {/* Settings content */}
        <div className="w-full md:w-3/4">
          <div className="bg-gray-50 rounded-lg p-6">
            <form onSubmit={handleSubmit}>
              {/* General Settings */}
              {activeTab === 'general' && (
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <GlobeAltIcon className="h-5 w-5 mr-2 text-ecoGreen" />
                    General Settings
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Site Name
                      </label>
                      <input
                        type="text"
                        name="siteName"
                        value={generalSettings.siteName}
                        onChange={handleGeneralChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ecoGreen"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Site Description
                      </label>
                      <textarea
                        name="siteDescription"
                        value={generalSettings.siteDescription}
                        onChange={handleGeneralChange}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ecoGreen"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Contact Email
                        </label>
                        <input
                          type="email"
                          name="contactEmail"
                          value={generalSettings.contactEmail}
                          onChange={handleGeneralChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ecoGreen"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          name="phoneNumber"
                          value={generalSettings.phoneNumber}
                          onChange={handleGeneralChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ecoGreen"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={generalSettings.address}
                        onChange={handleGeneralChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ecoGreen"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Timezone
                        </label>
                        <select
                          name="timezone"
                          value={generalSettings.timezone}
                          onChange={handleGeneralChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ecoGreen"
                        >
                          <option value="UTC-12">UTC-12</option>
                          <option value="UTC-11">UTC-11</option>
                          <option value="UTC-10">UTC-10</option>
                          <option value="UTC-9">UTC-9</option>
                          <option value="UTC-8">UTC-8</option>
                          <option value="UTC-7">UTC-7</option>
                          <option value="UTC-6">UTC-6</option>
                          <option value="UTC-5">UTC-5</option>
                          <option value="UTC-4">UTC-4</option>
                          <option value="UTC-3">UTC-3</option>
                          <option value="UTC-2">UTC-2</option>
                          <option value="UTC-1">UTC-1</option>
                          <option value="UTC+0">UTC+0</option>
                          <option value="UTC+1">UTC+1</option>
                          <option value="UTC+2">UTC+2</option>
                          <option value="UTC+3">UTC+3</option>
                          <option value="UTC+4">UTC+4</option>
                          <option value="UTC+5">UTC+5</option>
                          <option value="UTC+6">UTC+6</option>
                          <option value="UTC+7">UTC+7</option>
                          <option value="UTC+8">UTC+8</option>
                          <option value="UTC+9">UTC+9</option>
                          <option value="UTC+10">UTC+10</option>
                          <option value="UTC+11">UTC+11</option>
                          <option value="UTC+12">UTC+12</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date Format
                        </label>
                        <select
                          name="dateFormat"
                          value={generalSettings.dateFormat}
                          onChange={handleGeneralChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ecoGreen"
                        >
                          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                          <option value="YYYY/MM/DD">YYYY/MM/DD</option>
                          <option value="DD-MMM-YYYY">DD-MMM-YYYY</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <BellIcon className="h-5 w-5 mr-2 text-ecoGreen" />
                    Notification Settings
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                        <p className="text-xs text-gray-500">Receive notifications via email</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleNotificationToggle('emailNotifications')}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${notificationSettings.emailNotifications ? 'bg-ecoGreen' : 'bg-gray-200'}`}
                      >
                        <span className="sr-only">Toggle email notifications</span>
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${notificationSettings.emailNotifications ? 'translate-x-5' : 'translate-x-0'}`}
                        />
                      </button>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">SMS Notifications</h3>
                        <p className="text-xs text-gray-500">Receive notifications via SMS</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleNotificationToggle('smsNotifications')}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${notificationSettings.smsNotifications ? 'bg-ecoGreen' : 'bg-gray-200'}`}
                      >
                        <span className="sr-only">Toggle SMS notifications</span>
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${notificationSettings.smsNotifications ? 'translate-x-5' : 'translate-x-0'}`}
                        />
                      </button>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">New Donation Requests</h3>
                        <p className="text-xs text-gray-500">Get notified when new donation requests are submitted</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleNotificationToggle('newDonationRequests')}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${notificationSettings.newDonationRequests ? 'bg-ecoGreen' : 'bg-gray-200'}`}
                      >
                        <span className="sr-only">Toggle donation request notifications</span>
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${notificationSettings.newDonationRequests ? 'translate-x-5' : 'translate-x-0'}`}
                        />
                      </button>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">New User Registrations</h3>
                        <p className="text-xs text-gray-500">Get notified when new users register</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleNotificationToggle('newUserRegistrations')}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${notificationSettings.newUserRegistrations ? 'bg-ecoGreen' : 'bg-gray-200'}`}
                      >
                        <span className="sr-only">Toggle user registration notifications</span>
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${notificationSettings.newUserRegistrations ? 'translate-x-5' : 'translate-x-0'}`}
                        />
                      </button>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">System Updates</h3>
                        <p className="text-xs text-gray-500">Get notified about system updates and maintenance</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleNotificationToggle('systemUpdates')}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${notificationSettings.systemUpdates ? 'bg-ecoGreen' : 'bg-gray-200'}`}
                      >
                        <span className="sr-only">Toggle system update notifications</span>
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${notificationSettings.systemUpdates ? 'translate-x-5' : 'translate-x-0'}`}
                        />
                      </button>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">Marketing Emails</h3>
                        <p className="text-xs text-gray-500">Receive promotional emails and newsletters</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleNotificationToggle('marketingEmails')}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${notificationSettings.marketingEmails ? 'bg-ecoGreen' : 'bg-gray-200'}`}
                      >
                        <span className="sr-only">Toggle marketing emails</span>
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${notificationSettings.marketingEmails ? 'translate-x-5' : 'translate-x-0'}`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeTab === 'security' && (
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <ShieldCheckIcon className="h-5 w-5 mr-2 text-ecoGreen" />
                    Security Settings
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h3>
                        <p className="text-xs text-gray-500">Add an extra layer of security to your account</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleSecurityToggle('twoFactorAuth')}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${securitySettings.twoFactorAuth ? 'bg-ecoGreen' : 'bg-gray-200'}`}
                      >
                        <span className="sr-only">Toggle two-factor authentication</span>
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${securitySettings.twoFactorAuth ? 'translate-x-5' : 'translate-x-0'}`}
                        />
                      </button>
                    </div>
                    <div className="py-3 border-b border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-900">Password Expiry</h3>
                        <span className="text-xs text-gray-500">{securitySettings.passwordExpiry} days</span>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">Number of days before passwords expire</p>
                      <input
                        type="range"
                        name="passwordExpiry"
                        min="30"
                        max="180"
                        step="30"
                        value={securitySettings.passwordExpiry}
                        onChange={handleSecurityNumberChange}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>30 days</span>
                        <span>180 days</span>
                      </div>
                    </div>
                    <div className="py-3 border-b border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-900">Session Timeout</h3>
                        <span className="text-xs text-gray-500">{securitySettings.sessionTimeout} minutes</span>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">Automatically log out after inactivity</p>
                      <input
                        type="range"
                        name="sessionTimeout"
                        min="5"
                        max="60"
                        step="5"
                        value={securitySettings.sessionTimeout}
                        onChange={handleSecurityNumberChange}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>5 min</span>
                        <span>60 min</span>
                      </div>
                    </div>
                    <div className="py-3 border-b border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-900">Failed Login Attempts</h3>
                        <span className="text-xs text-gray-500">{securitySettings.loginAttempts} attempts</span>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">Number of failed attempts before account lockout</p>
                      <input
                        type="range"
                        name="loginAttempts"
                        min="3"
                        max="10"
                        step="1"
                        value={securitySettings.loginAttempts}
                        onChange={handleSecurityNumberChange}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>3</span>
                        <span>10</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* API Settings */}
              {activeTab === 'api' && (
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <DocumentTextIcon className="h-5 w-5 mr-2 text-ecoGreen" />
                    API Settings
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        API Key
                      </label>
                      <div className="flex">
                        <input
                          type="text"
                          name="apiKey"
                          value={apiSettings.apiKey}
                          readOnly
                          className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-ecoGreen bg-gray-50"
                        />
                        <button
                          type="button"
                          onClick={generateApiKey}
                          className="px-4 py-2 bg-ecoGreen text-white rounded-r-md hover:bg-green-600 transition-colors flex items-center"
                        >
                          <ArrowPathIcon className="h-4 w-4 mr-1" />
                          Regenerate
                        </button>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        Keep this key secret. Regenerating will invalidate the previous key.
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Webhook URL
                      </label>
                      <input
                        type="url"
                        name="webhookUrl"
                        value={apiSettings.webhookUrl}
                        onChange={handleApiChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ecoGreen"
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        URL to receive webhook notifications for events
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Rate Limit (requests per minute)
                      </label>
                      <input
                        type="number"
                        name="rateLimit"
                        value={apiSettings.rateLimit}
                        onChange={handleApiChange}
                        min="10"
                        max="1000"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ecoGreen"
                      />
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-md">
                      <h3 className="text-sm font-medium text-yellow-800 mb-2">API Documentation</h3>
                      <p className="text-xs text-yellow-700">
                        Access the API documentation at <a href="#" className="text-ecoGreen hover:underline">https://api.ecocycle.com/docs</a> to learn how to integrate with our services.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Save button */}
              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-ecoGreen text-white rounded-md hover:bg-green-600 transition-colors flex items-center"
                >
                  <CheckCircleIcon className="h-4 w-4 mr-2" />
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;