import React from 'react';
import {
  ArrowUpIcon,
  ScaleIcon,
  HandRaisedIcon,
  UsersIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline';
import StatsCard from '../components/StatsCard';
import MetricsChart from '../components/MetricsChart';
import QuickActions from '../components/QuickActions';

const AdminDashboard = () => {
  const stats = [
    {
      name: 'Total Recycled Weight',
      value: '1,250 tons',
      change: '+10%',
      changeType: 'increase',
      icon: ScaleIcon,
    },
    {
      name: 'Number of Donations',
      value: '8,750',
      change: '+5%',
      changeType: 'increase',
      icon: HandRaisedIcon,
    },
    {
      name: 'Active Users',
      value: '5,500',
      change: '+8%',
      changeType: 'increase',
      icon: UsersIcon,
    },
    {
      name: 'Partnerships',
      value: '120',
      change: '+12%',
      changeType: 'increase',
      icon: BuildingOfficeIcon,
    },
  ];

  const recyclingTrendsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Recycling Trends',
        data: [65, 45, 80, 60, 95, 75],
        borderColor: '#38af44',
        backgroundColor: 'rgba(56, 175, 68, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const donationDistributionData = {
    labels: ['Paper', 'Plastic', 'Glass', 'Metal'],
    datasets: [
      {
        data: [35, 25, 20, 20],
        backgroundColor: [
          '#38af44',
          '#4ade80',
          '#22c55e',
          '#16a34a',
        ],
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Administrator Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back, Admin. Here's an overview of site activity.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.name} stat={stat} />
        ))}
      </div>

      {/* Key Metrics Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Metrics</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recycling Trends Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Recycling Trends Over Time</h3>
                <p className="text-sm text-gray-500">Last 6 Months</p>
              </div>
              <div className="flex items-center text-sm text-ecoGreen font-medium">
                <ArrowUpIcon className="h-4 w-4 mr-1" />
                +15%
              </div>
            </div>
            <MetricsChart type="line" data={recyclingTrendsData} />
          </div>

          {/* Donation Distribution Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Donation Distribution</h3>
                <p className="text-sm text-gray-500">By Category</p>
              </div>
              <div className="flex items-center text-sm text-ecoGreen font-medium">
                <ArrowUpIcon className="h-4 w-4 mr-1" />
                +7%
              </div>
            </div>
            <MetricsChart type="doughnut" data={donationDistributionData} />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActions />
    </div>
  );
};

export default AdminDashboard;