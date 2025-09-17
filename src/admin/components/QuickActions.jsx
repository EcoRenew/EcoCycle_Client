import React from 'react';
import { Link } from 'react-router-dom';
import {
  DocumentTextIcon,
  UsersIcon,
  HandRaisedIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline';

const QuickActions = () => {
  const actions = [
    {
      name: 'Manage Content',
      description: 'Update site content and materials',
      href: '/admin/content',
      icon: DocumentTextIcon,
      primary: true,
    },
    {
      name: 'View User Accounts',
      description: 'Manage user accounts and permissions',
      href: '/admin/users',
      icon: UsersIcon,
      primary: false,
    },
    {
      name: 'Process Donations',
      description: 'Review and process donation requests',
      href: '/admin/donations',
      icon: HandRaisedIcon,
      primary: true,
    },
    {
      name: 'Manage Partnerships',
      description: 'Handle partnership applications',
      href: '/admin/partnerships',
      icon: BuildingOfficeIcon,
      primary: false,
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.name}
              to={action.href}
              className={`group relative rounded-lg p-6 transition-all duration-200 hover:shadow-md ${
                action.primary
                  ? 'bg-ecoGreen text-white hover:bg-green-600'
                  : 'bg-white border border-gray-200 text-gray-900 hover:border-ecoGreen hover:shadow-sm'
              }`}
            >
              <div className="flex items-center">
                <Icon
                  className={`h-8 w-8 ${
                    action.primary ? 'text-white' : 'text-ecoGreen'
                  }`}
                />
                <div className="ml-4">
                  <h3
                    className={`text-lg font-medium ${
                      action.primary ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {action.name}
                  </h3>
                  <p
                    className={`mt-1 text-sm ${
                      action.primary ? 'text-green-100' : 'text-gray-500'
                    }`}
                  >
                    {action.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;