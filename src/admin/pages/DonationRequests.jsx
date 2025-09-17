import React, { useState } from 'react';
import {
  MagnifyingGlassIcon,
  EyeIcon,
  CheckIcon,
  XMarkIcon,
  ClockIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline';
import RequestModal from '../components/RequestModal';
import ConfirmDialog from '../components/ConfirmDialog';

const DonationRequests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [actionType, setActionType] = useState('');
  const [requestToUpdate, setRequestToUpdate] = useState(null);

  // Mock data - replace with actual API calls
  const requests = [
    {
      request_id: 1,
      request_type: 'donation',
      status: 'pending',
      pickup_date: '2024-01-20',
      customer: {
        full_name: 'Alice Johnson',
        email: 'alice@example.com',
        phone: '+1234567890',
      },
      items: [
        { material_name: 'Paper', quantity: 50, unit: 'kg' },
        { material_name: 'Plastic Bottles', quantity: 30, unit: 'pieces' },
      ],
      total_amount: 125.50,
      created_at: '2024-01-15',
    },
    {
      request_id: 2,
      request_type: 'pickup',
      status: 'approved',
      pickup_date: '2024-01-18',
      customer: {
        full_name: 'Bob Smith',
        email: 'bob@example.com',
        phone: '+1234567891',
      },
      items: [
        { material_name: 'Metal Cans', quantity: 25, unit: 'kg' },
      ],
      total_amount: 75.00,
      created_at: '2024-01-12',
    },
    {
      request_id: 3,
      request_type: 'donation',
      status: 'rejected',
      pickup_date: '2024-01-25',
      customer: {
        full_name: 'Carol Davis',
        email: 'carol@example.com',
        phone: '+1234567892',
      },
      items: [
        { material_name: 'Glass Bottles', quantity: 15, unit: 'kg' },
      ],
      total_amount: 45.00,
      created_at: '2024-01-10',
    },
  ];

  const filteredRequests = requests.filter((request) => {
    const matchesSearch = request.customer.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.request_id.toString().includes(searchTerm);
    const matchesStatus = selectedStatus === 'all' || request.status === selectedStatus;
    const matchesType = selectedType === 'all' || request.request_type === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleViewRequest = (request) => {
    setSelectedRequest(request);
    setIsRequestModalOpen(true);
  };

  const handleUpdateStatus = (request, status) => {
    setRequestToUpdate(request);
    setActionType(status);
    setIsConfirmDialogOpen(true);
  };

  const confirmStatusUpdate = () => {
    // Add API call here
    console.log(`Updating request ${requestToUpdate.request_id} to ${actionType}`);
    setIsConfirmDialogOpen(false);
    setRequestToUpdate(null);
    setActionType('');
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeBadgeColor = (type) => {
    return type === 'donation'
      ? 'bg-ecoGreen text-white'
      : 'bg-blue-500 text-white';
  };

  const getActionMessage = () => {
    const actionMessages = {
      approved: `Are you sure you want to approve request #${requestToUpdate?.request_id}?`,
      rejected: `Are you sure you want to reject request #${requestToUpdate?.request_id}?`,
      completed: `Are you sure you want to mark request #${requestToUpdate?.request_id} as completed?`,
    };
    return actionMessages[actionType] || '';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Donation Requests</h1>
        <p className="text-gray-600 mt-1">Review and process donation and pickup requests</p>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-ecoGreen focus:border-ecoGreen"
              />
            </div>
          </div>
          
          {/* Status Filter */}
          <div className="sm:w-48">
            <div className="relative">
              <FunnelIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-ecoGreen focus:border-ecoGreen appearance-none"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Type Filter */}
          <div className="sm:w-48">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 w-full border border-gray-300 rounded-md focus:ring-ecoGreen focus:border-ecoGreen"
            >
              <option value="all">All Types</option>
              <option value="donation">Donation</option>
              <option value="pickup">Pickup</option>
            </select>
          </div>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Request
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pickup Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <tr key={request.request_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      #{request.request_id}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(request.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {request.customer.full_name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {request.customer.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeBadgeColor(request.request_type)}`}>
                      {request.request_type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(request.status)}`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(request.pickup_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${request.total_amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleViewRequest(request)}
                        className="text-ecoGreen hover:text-green-600 p-1"
                        title="View details"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      {request.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleUpdateStatus(request, 'approved')}
                            className="text-green-600 hover:text-green-800 p-1"
                            title="Approve"
                          >
                            <CheckIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(request, 'rejected')}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="Reject"
                          >
                            <XMarkIcon className="h-4 w-4" />
                          </button>
                        </>
                      )}
                      {request.status === 'approved' && (
                        <button
                          onClick={() => handleUpdateStatus(request, 'completed')}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="Mark as completed"
                        >
                          <ClockIcon className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Request Details Modal */}
      <RequestModal
        isOpen={isRequestModalOpen}
        onClose={() => {
          setIsRequestModalOpen(false);
          setSelectedRequest(null);
        }}
        request={selectedRequest}
      />

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        onClose={() => {
          setIsConfirmDialogOpen(false);
          setRequestToUpdate(null);
          setActionType('');
        }}
        onConfirm={confirmStatusUpdate}
        title={`${actionType.charAt(0).toUpperCase() + actionType.slice(1)} Request`}
        message={getActionMessage()}
        confirmText={actionType.charAt(0).toUpperCase() + actionType.slice(1)}
        confirmButtonClass={actionType === 'rejected' ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' : 'bg-ecoGreen hover:bg-green-600 focus:ring-ecoGreen'}
      />
    </div>
  );
};

export default DonationRequests;