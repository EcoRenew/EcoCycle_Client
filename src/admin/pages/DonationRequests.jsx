import React, { useState, useEffect } from 'react';
import {
  MagnifyingGlassIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  ClockIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline';

const DonationRequests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [createFormData, setCreateFormData] = useState({
    requester_name: '',
    email: '',
    phone: '',
    material_type: '',
    quantity: '',
    pickup_address: '',
    preferred_date: '',
    notes: '',
    status: 'pending'
  });
  const [sortField, setSortField] = useState('created_at');
  const [sortDirection, setSortDirection] = useState('desc');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  // Fetch requests - using mock data since API endpoint is not implemented yet
  const fetchRequests = async () => {
    setLoading(true);
    try {
      // Mock data since the API endpoint is not implemented yet
      const mockData = [
        {
          id: 1,
          requester_name: 'John Doe',
          email: 'john@example.com',
          phone: '123-456-7890',
          material_type: 'Paper',
          quantity: '5 kg',
          pickup_address: '123 Main St, City',
          preferred_date: '2024-08-15',
          notes: 'Please pick up in the morning',
          status: 'pending',
          request_type: 'recycling',
          created_at: '2024-07-01'
        },
        {
          id: 2,
          requester_name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '987-654-3210',
          material_type: 'Electronics',
          quantity: '2 items',
          pickup_address: '456 Oak Ave, Town',
          preferred_date: '2024-08-20',
          notes: 'Old laptop and monitor',
          status: 'approved',
          request_type: 'donation',
          created_at: '2024-07-05'
        },
        {
          id: 3,
          requester_name: 'Robert Johnson',
          email: 'robert@example.com',
          phone: '555-123-4567',
          material_type: 'Plastic',
          quantity: '3 kg',
          pickup_address: '789 Pine St, Village',
          preferred_date: '2024-08-25',
          notes: '',
          status: 'completed',
          request_type: 'recycling',
          created_at: '2024-07-10'
        },
        {
          id: 4,
          requester_name: 'Emily Davis',
          email: 'emily@example.com',
          phone: '444-555-6666',
          material_type: 'Furniture',
          quantity: '1 sofa',
          pickup_address: '101 Elm St, County',
          preferred_date: '2024-08-30',
          notes: 'In good condition',
          status: 'rejected',
          request_type: 'donation',
          created_at: '2024-07-15'
        }
      ];
      
      // Simulate API delay
      setTimeout(() => {
        setRequests(mockData);
        setError(null);
        setLoading(false);
      }, 500);
      
    } catch (err) {
      console.error('Error fetching requests:', err);
      setError('Failed to load requests. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Filter and sort requests
  const getFilteredAndSortedRequests = () => {
    return requests
      .filter(request => {
        // Apply status filter
        if (filterStatus !== 'all' && request.status !== filterStatus) {
          return false;
        }
        
        // Apply type filter
        if (filterType !== 'all' && request.request_type !== filterType) {
          return false;
        }
        
        // Apply search filter
        if (searchTerm) {
          const searchLower = searchTerm.toLowerCase();
          return (
            (request.requester_name && request.requester_name.toLowerCase().includes(searchLower)) ||
            (request.material_type && request.material_type.toLowerCase().includes(searchLower)) ||
            (request.status && request.status.toLowerCase().includes(searchLower)) ||
            (request.email && request.email.toLowerCase().includes(searchLower)) ||
            (request.pickup_address && request.pickup_address.toLowerCase().includes(searchLower))
          );
        }
        
        return true;
      })
      .sort((a, b) => {
        // Handle sorting
        const fieldA = a[sortField] || '';
        const fieldB = b[sortField] || '';
        
        if (typeof fieldA === 'string' && typeof fieldB === 'string') {
          return sortDirection === 'asc' 
            ? fieldA.localeCompare(fieldB) 
            : fieldB.localeCompare(fieldA);
        } else {
          return sortDirection === 'asc' 
            ? fieldA - fieldB 
            : fieldB - fieldA;
        }
      });
  };

  const filteredRequests = getFilteredAndSortedRequests();

  // Handle view details
  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setIsDetailsModalOpen(true);
  };

  // Handle edit request
  const handleEditClick = (request) => {
    setSelectedRequest(request);
    setEditFormData({...request});
    setIsEditModalOpen(true);
  };

  // Handle delete request
  const handleDeleteClick = (request) => {
    setSelectedRequest(request);
    setIsDeleteModalOpen(true);
  };

  // Handle create request
  const handleCreateClick = () => {
    setIsCreateModalOpen(true);
  };

  // Handle status change - using mock implementation
  const handleStatusChange = async (id, newStatus) => {
    try {
      // Simulate API delay
      setTimeout(() => {
        // Update local state
        setRequests(requests.map(req => 
          req.id === id ? { ...req, status: newStatus } : req
        ));
        
        // If we're in the details modal, update the selected request
        if (selectedRequest && selectedRequest.id === id) {
          setSelectedRequest({ ...selectedRequest, status: newStatus });
        }
      }, 300);
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status. Please try again.');
    }
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

  // Handle form input change for edit
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  // Handle form input change for create
  const handleCreateFormChange = (e) => {
    const { name, value } = e.target;
    setCreateFormData({
      ...createFormData,
      [name]: value
    });
  };

  // Handle form submission for edit - using mock implementation
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulate API delay
      setTimeout(() => {
        // Update local state
        setRequests(requests.map(req => 
          req.id === selectedRequest.id ? { ...req, ...editFormData } : req
        ));
        
        setIsEditModalOpen(false);
      }, 300);
    } catch (err) {
      console.error('Error updating request:', err);
      alert('Failed to update request. Please try again.');
    }
  };

  // Handle form submission for create - using mock implementation
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulate API delay
      setTimeout(() => {
        // Create a new request with a mock ID
        const newRequest = { 
          ...createFormData, 
          id: Date.now(),
          created_at: new Date().toISOString().split('T')[0],
          request_type: createFormData.material_type.toLowerCase().includes('electronics') ? 'donation' : 'recycling'
        };
        
        // Add new request to local state
        setRequests([newRequest, ...requests]);
        
        // Reset form and close modal
        setCreateFormData({
          requester_name: '',
          email: '',
          phone: '',
          material_type: '',
          quantity: '',
          pickup_address: '',
          preferred_date: '',
          notes: '',
          status: 'pending'
        });
        setIsCreateModalOpen(false);
      }, 300);
    } catch (err) {
      console.error('Error creating request:', err);
      alert('Failed to create request. Please try again.');
    }
  };

  // Handle delete confirmation - using mock implementation
  const handleDeleteConfirm = async () => {
    try {
      // Simulate API delay
      setTimeout(() => {
        // Update local state
        setRequests(requests.filter(req => req.id !== selectedRequest.id));
        setIsDeleteModalOpen(false);
      }, 300);
    } catch (err) {
      console.error('Error deleting request:', err);
      alert('Failed to delete request. Please try again.');
    }
  };

  // Handle sort change
  const handleSortChange = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Requests</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage donation and recycling requests from users.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={handleCreateClick}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-ecoGreen px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Request
          </button>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Search */}
        <div className="relative rounded-md shadow-sm">
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
        
        {/* Status Filter */}
        <div>
          <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status-filter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        {/* Type Filter */}
        <div>
          <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Request Type
          </label>
          <select
            id="type-filter"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="all">All Types</option>
            <option value="donation">Donation</option>
            <option value="recycling">Recycling</option>
          </select>
        </div>
      </div>

      {/* Loading and Error States */}
      {loading && (
        <div className="mt-8 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ecoGreen"></div>
        </div>
      )}
      
      {error && (
        <div className="mt-8 bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
            </div>
          </div>
        </div>
      )}

      {/* Requests Table */}
      {!loading && !error && (
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      {/* Sortable column headers */}
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 cursor-pointer"
                        onClick={() => handleSortChange('requester_name')}
                      >
                        <div className="flex items-center">
                          Requester
                          {sortField === 'requester_name' && (
                            <span className="ml-2">
                              {sortDirection === 'asc' ? (
                                <ArrowUpIcon className="h-4 w-4" />
                              ) : (
                                <ArrowDownIcon className="h-4 w-4" />
                              )}
                            </span>
                          )}
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                        onClick={() => handleSortChange('material_type')}
                      >
                        <div className="flex items-center">
                          Material Type
                          {sortField === 'material_type' && (
                            <span className="ml-2">
                              {sortDirection === 'asc' ? (
                                <ArrowUpIcon className="h-4 w-4" />
                              ) : (
                                <ArrowDownIcon className="h-4 w-4" />
                              )}
                            </span>
                          )}
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                        onClick={() => handleSortChange('preferred_date')}
                      >
                        <div className="flex items-center">
                          Preferred Date
                          {sortField === 'preferred_date' && (
                            <span className="ml-2">
                              {sortDirection === 'asc' ? (
                                <ArrowUpIcon className="h-4 w-4" />
                              ) : (
                                <ArrowDownIcon className="h-4 w-4" />
                              )}
                            </span>
                          )}
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                        onClick={() => handleSortChange('status')}
                      >
                        <div className="flex items-center">
                          Status
                          {sortField === 'status' && (
                            <span className="ml-2">
                              {sortDirection === 'asc' ? (
                                <ArrowUpIcon className="h-4 w-4" />
                              ) : (
                                <ArrowDownIcon className="h-4 w-4" />
                              )}
                            </span>
                          )}
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                        onClick={() => handleSortChange('request_type')}
                      >
                        <div className="flex items-center">
                          Type
                          {sortField === 'request_type' && (
                            <span className="ml-2">
                              {sortDirection === 'asc' ? (
                                <ArrowUpIcon className="h-4 w-4" />
                              ) : (
                                <ArrowDownIcon className="h-4 w-4" />
                              )}
                            </span>
                          )}
                        </div>
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {filteredRequests.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                          No requests found
                        </td>
                      </tr>
                    ) : (
                      filteredRequests.map((request) => (
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
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {request.request_type || 'N/A'}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <div className="flex justify-end space-x-2">
                              <button
                                type="button"
                                className="inline-flex items-center text-indigo-600 hover:text-indigo-900"
                                onClick={() => handleViewDetails(request)}
                              >
                                <EyeIcon className="h-5 w-5" />
                                <span className="sr-only">View</span>
                              </button>
                              <button
                                type="button"
                                className="inline-flex items-center text-blue-600 hover:text-blue-900"
                                onClick={() => handleEditClick(request)}
                              >
                                <PencilIcon className="h-5 w-5" />
                                <span className="sr-only">Edit</span>
                              </button>
                              <button
                                type="button"
                                className="inline-flex items-center text-red-600 hover:text-red-900"
                                onClick={() => handleDeleteClick(request)}
                              >
                                <TrashIcon className="h-5 w-5" />
                                <span className="sr-only">Delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {isDetailsModalOpen && selectedRequest && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Request Details</h3>
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
                      <h4 className="text-sm font-medium text-gray-500">Request Type</h4>
                      <p className="mt-1 text-sm text-gray-900">{selectedRequest.request_type || 'N/A'}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Notes</h4>
                      <p className="mt-1 text-sm text-gray-900">{selectedRequest.notes || 'No notes provided'}</p>
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

      {/* Edit Modal */}
      {isEditModalOpen && selectedRequest && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <form onSubmit={handleEditSubmit}>
                <div>
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Request</h3>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label htmlFor="requester_name" className="block text-sm font-medium text-gray-700">
                          Requester Name
                        </label>
                        <input
                          type="text"
                          name="requester_name"
                          id="requester_name"
                          value={editFormData.requester_name || ''}
                          onChange={handleEditFormChange}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={editFormData.email || ''}
                          onChange={handleEditFormChange}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                          Phone
                        </label>
                        <input
                          type="text"
                          name="phone"
                          id="phone"
                          value={editFormData.phone || ''}
                          onChange={handleEditFormChange}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label htmlFor="material_type" className="block text-sm font-medium text-gray-700">
                          Material Type
                        </label>
                        <input
                          type="text"
                          name="material_type"
                          id="material_type"
                          value={editFormData.material_type || ''}
                          onChange={handleEditFormChange}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                          Quantity
                        </label>
                        <input
                          type="text"
                          name="quantity"
                          id="quantity"
                          value={editFormData.quantity || ''}
                          onChange={handleEditFormChange}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label htmlFor="pickup_address" className="block text-sm font-medium text-gray-700">
                          Pickup Address
                        </label>
                        <input
                          type="text"
                          name="pickup_address"
                          id="pickup_address"
                          value={editFormData.pickup_address || ''}
                          onChange={handleEditFormChange}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label htmlFor="preferred_date" className="block text-sm font-medium text-gray-700">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          name="preferred_date"
                          id="preferred_date"
                          value={editFormData.preferred_date || ''}
                          onChange={handleEditFormChange}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                          Notes
                        </label>
                        <textarea
                          name="notes"
                          id="notes"
                          rows="3"
                          value={editFormData.notes || ''}
                          onChange={handleEditFormChange}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        ></textarea>
                      </div>
                      <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                          Status
                        </label>
                        <select
                          name="status"
                          id="status"
                          value={editFormData.status || ''}
                          onChange={handleEditFormChange}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                          <option value="pending">Pending</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => setIsEditModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedRequest && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <XCircleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Request</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete this request? This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleDeleteConfirm}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setIsDeleteModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {isCreateModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <form onSubmit={handleCreateSubmit}>
                <div>
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Create New Request</h3>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label htmlFor="requester_name" className="block text-sm font-medium text-gray-700">
                          Requester Name *
                        </label>
                        <input
                          type="text"
                          name="requester_name"
                          id="requester_name"
                          required
                          value={createFormData.requester_name}
                          onChange={handleCreateFormChange}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          required
                          value={createFormData.email}
                          onChange={handleCreateFormChange}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                          Phone
                        </label>
                        <input
                          type="text"
                          name="phone"
                          id="phone"
                          value={createFormData.phone}
                          onChange={handleCreateFormChange}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label htmlFor="request_type" className="block text-sm font-medium text-gray-700">
                          Request Type *
                        </label>
                        <select
                          name="request_type"
                          id="request_type"
                          required
                          value={createFormData.request_type || ''}
                          onChange={handleCreateFormChange}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                          <option value="">Select a type</option>
                          <option value="donation">Donation</option>
                          <option value="recycling">Recycling</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="material_type" className="block text-sm font-medium text-gray-700">
                          Material Type *
                        </label>
                        <input
                          type="text"
                          name="material_type"
                          id="material_type"
                          required
                          value={createFormData.material_type}
                          onChange={handleCreateFormChange}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                          Quantity *
                        </label>
                        <input
                          type="text"
                          name="quantity"
                          id="quantity"
                          required
                          value={createFormData.quantity}
                          onChange={handleCreateFormChange}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label htmlFor="pickup_address" className="block text-sm font-medium text-gray-700">
                          Pickup Address *
                        </label>
                        <input
                          type="text"
                          name="pickup_address"
                          id="pickup_address"
                          required
                          value={createFormData.pickup_address}
                          onChange={handleCreateFormChange}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label htmlFor="preferred_date" className="block text-sm font-medium text-gray-700">
                          Preferred Date *
                        </label>
                        <input
                          type="date"
                          name="preferred_date"
                          id="preferred_date"
                          required
                          value={createFormData.preferred_date}
                          onChange={handleCreateFormChange}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                          Notes
                        </label>
                        <textarea
                          name="notes"
                          id="notes"
                          rows="3"
                          value={createFormData.notes}
                          onChange={handleCreateFormChange}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-ecoGreen text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => setIsCreateModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationRequests;