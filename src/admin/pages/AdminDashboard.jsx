import React, { useState, useEffect } from 'react';
import {
  ArrowUpIcon,
  ScaleIcon,
  HandRaisedIcon,
  UsersIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline';
import { 
  FaRecycle, 
  FaDonate, 
  FaUsers, 
  FaHandshake,
  FaSpinner,
  FaExclamationTriangle
} from 'react-icons/fa';
import StatsCard from '../components/StatsCard';
import MetricsChart from '../components/MetricsChart';
import QuickActions from '../components/QuickActions';
import { dashboardApi } from '../../services/adminApi';

const initialStats = {
  total_users: 0,
  total_products: 0,
  total_requests: 0,
  pending_requests: 0,
};

const AdminDashboard = () => {
  const [liveStats, setLiveStats] = useState(initialStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchDashboard() {
      try {
        setLoading(true);
        const [statsRes] = await Promise.all([
          dashboardApi.getStats(),
          // Optionally: dashboardApi.getRecentActivities()
        ]);
        if (!isMounted) return;
        const data = statsRes.data?.data || initialStats;
        setLiveStats(data);
        setError(null);
      } catch (e) {
        setError('Failed to load dashboard data');
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchDashboard();
    return () => { isMounted = false; };
  }, []);

  const stats = [
    {
      name: 'Total Users',
      value: String(liveStats.total_users),
      change: '+0%'
      ,
      changeType: 'increase',
      icon: UsersIcon,
    },
    {
      name: 'Total Products',
      value: String(liveStats.total_products),
      change: '+0%',
      changeType: 'increase',
      icon: ScaleIcon,
    },
    {
      name: 'Total Requests',
      value: String(liveStats.total_requests),
      change: '+0%',
      changeType: 'increase',
      icon: HandRaisedIcon,
    },
    {
      name: 'Pending Requests',
      value: String(liveStats.pending_requests),
      change: '+0%',
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
      {loading && (
        <div className="flex items-center text-gray-600">
          <FaSpinner className="animate-spin mr-2" /> Loading dashboard...
        </div>
      )}
      {error && (
        <div className="flex items-center text-red-600">
          <FaExclamationTriangle className="mr-2" /> {error}
        </div>
      )}
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