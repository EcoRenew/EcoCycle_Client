import React, { useState } from 'react';
import {
  MagnifyingGlassIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

const DonationRequests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Mock data - replace with actual API calls
  const donationRequests = [
    {
      id: 1,
      requester_name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '555-123-4567',
      material_type: 'Electronics',
      quantity: '2 laptops, 1 desktop computer',
      pickup_address: '123 Main St, Anytown, USA',
      preferred_date: '2024-07-15',
      status: 'pending',
      created_at: '2024-07-01',
      notes: 'Both laptops are working but old. Desktop needs repair.',
    },
    {
      id: 2,
      requester_name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '555-987-6543',
      material_type: 'Paper & Cardboard',
      quantity: 'Approximately 50kg',
      pickup_address: '456 Oak Ave, Somewhere, USA',
      preferred_date: '2024-07-10',
      status: 'approved',
      created_at: '2024-06-28',
      notes: 'Mostly office paper and cardboard boxes.',
    },
    {
      id: 3,
      requester_name: 'Robert Johnson',
      email: 'robert.j@example.com',
      phone: '555-456-7890',
      material_type: 'Plastic',
      quantity: '30kg assorted plastic items',
      pickup_address: '789 Pine St, Elsewhere, USA',
      preferred_date: '2024-07-12',
      status: 'completed',
      created_at: '2024-06-25',
      notes: 'Mostly plastic bottles and containers.',
    },
  ];

  const filteredRequests = donationRequests.filter(
    (request) =>
      request.requester_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.material_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setIsDetailsModalOpen(true);
  };

  const handleStatusChange = (id, newStatus) => {
    // In a real application, this would make an API call to update the status
    console.log(`Changing request ${id} status to ${newStatus}`);
    // Then refresh the data
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <ClockIcon className="mr-1 h-4 w-4" />
            Pending
          </span>
        );
      case 'approved':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircleIcon className="mr-1 h-4 w-4" />
            Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircleIcon className="mr-1 h-4 w-4" />
            Rejected
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <CheckCircleIcon className="mr-1 h-4 w-4" />
            Completed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Donation Requests</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage donation and recycling requests from users.
          </p>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="relative rounded-md shadow-sm max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Requester
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Material Type
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Preferred Date
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredRequests.map((request) => (
                    <tr key={request.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {request.requester_name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {request.material_type}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {request.preferred_date}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {getStatusBadge(request.status)}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          type="button"
                          className="inline-flex items-center text-indigo-600 hover:text-indigo-900"
                          onClick={() => handleViewDetails(request)}
                        >
                          <EyeIcon className="h-5 w-5 mr-1" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Details Modal - In a real application, this would be a separate component */}
      {isDetailsModalOpen && selectedRequest && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Donation Request Details</h3>
                  <div className="mt-4 space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Requester Information</h4>
                      <p className="mt-1 text-sm text-gray-900">{selectedRequest.requester_name}</p>
                      <p className="mt-1 text-sm text-gray-900">{selectedRequest.email}</p>
                      <p className="mt-1 text-sm text-gray-900">{selectedRequest.phone}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Material Information</h4>
                      <p className="mt-1 text-sm text-gray-900">Type: {selectedRequest.material_type}</p>
                      <p className="mt-1 text-sm text-gray-900">Quantity: {selectedRequest.quantity}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Pickup Information</h4>
                      <p className="mt-1 text-sm text-gray-900">Address: {selectedRequest.pickup_address}</p>
                      <p className="mt-1 text-sm text-gray-900">Preferred Date: {selectedRequest.preferred_date}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Notes</h4>
                      <p className="mt-1 text-sm text-gray-900">{selectedRequest.notes}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Status</h4>
                      <div className="mt-1">{getStatusBadge(selectedRequest.status)}</div>
                    </div>
                    {selectedRequest.status === 'pending' && (
                      <div className="mt-4 flex space-x-3">
                        <button
                          type="button"
                          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          onClick={() => handleStatusChange(selectedRequest.id, 'approved')}
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          onClick={() => handleStatusChange(selectedRequest.id, 'rejected')}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setIsDetailsModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationRequests;