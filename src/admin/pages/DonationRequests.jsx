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
import { requestApi } from '../../services/adminApi';
import { Link } from 'react-router-dom';

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
    status: 'Pending',
    request_type: 'Donation'
  });
  const [sortField, setSortField] = useState('created_at');
  const [sortDirection, setSortDirection] = useState('desc');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch donation requests from API
  const fetchRequests = async () => {
    setLoading(true);
    try {
      setError(null);
      const params = {
        page: currentPage,
        per_page: 10,
        type: 'Donation', // Filter for donation requests only
        status: filterStatus !== 'all' ? filterStatus : undefined,
        search: searchTerm || undefined,
        sort_by: sortField,
        sort_dir: sortDirection,
      };
      const response = await requestApi.getRequests(params);
      const paged = response.data.data; // Laravel paginator
      setRequests(paged.data || []);
      setTotalPages(paged.last_page || 1);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch donation requests');
      console.error('Donation requests fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [currentPage, filterStatus, searchTerm, sortField, sortDirection]);

  // Since we're fetching filtered data from API, we can use requests directly
  const filteredRequests = requests;

  // Handle view details
  const handleViewDetails = (request) => {
    // Kept for other flows, not used by button anymore
    window.location.href = `/admin/requests/${request.request_id || request.id}`;
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

  // Handle status change
  const handleStatusChange = async (request, newStatus) => {
    try {
      const id = request.request_id || request.id;
      let collectorId;
      if (newStatus === 'Assigned') {
        const entered = window.prompt('Enter Collector ID to assign to this request:');
        if (!entered) {
          return; // cancelled
        }
        collectorId = Number(entered);
        if (!collectorId || Number.isNaN(collectorId)) {
          alert('Invalid collector ID');
          return;
        }
      }
      await requestApi.updateRequestStatus(id, newStatus, collectorId);
      fetchRequests();
    } catch (err) {
      console.error('Update status error:', err);
      alert(err.response?.data?.message || 'Failed to update request status');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <ClockIcon className="mr-1 h-4 w-4" />
            Pending
          </span>
        );
      case 'Assigned':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <CheckCircleIcon className="mr-1 h-4 w-4" />
            Assigned
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircleIcon className="mr-1 h-4 w-4" />
            Completed
          </span>
        );
      case 'Canceled':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircleIcon className="mr-1 h-4 w-4" />
            Canceled
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

  // Handle form submission for edit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = selectedRequest.request_id || selectedRequest.id;
      await requestApi.updateRequest(id, editFormData);
      setIsEditModalOpen(false);
      fetchRequests();
    } catch (err) {
      console.error('Error updating request:', err);
      alert(err.response?.data?.message || 'Failed to update request. Please try again.');
    }
  };

  // Handle form submission for create
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      await requestApi.createRequest(createFormData);
      
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
        status: 'Pending',
        request_type: 'Donation'
      });
      setIsCreateModalOpen(false);
      fetchRequests();
      
    } catch (err) {
      console.error('Error creating request:', err);
      alert(err.response?.data?.message || 'Failed to create request. Please try again.');
    }
  };

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    try {
      const id = selectedRequest.request_id || selectedRequest.id;
      await requestApi.deleteRequest(id);
      setIsDeleteModalOpen(false);
      fetchRequests();
    } catch (err) {
      console.error('Error deleting request:', err);
      alert(err.response?.data?.message || 'Failed to delete request. Please try again.');
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
          <h1 className="text-xl font-semibold text-gray-900">Donation Requests</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage donation requests from users.
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
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Search */}
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
            placeholder="Search donation requests..."
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
            <option value="Pending">Pending</option>
            <option value="Assigned">Assigned</option>
            <option value="Completed">Completed</option>
            <option value="Canceled">Canceled</option>
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
                        onClick={() => handleSortChange('request_id')}
                      >
                        <div className="flex items-center">
                          Request ID
                          {sortField === 'request_id' && (
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
                        onClick={() => handleSortChange('customer')}
                      >
                        <div className="flex items-center">
                          Customer
                          {sortField === 'customer' && (
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
                        onClick={() => handleSortChange('pickup_date')}
                      >
                        <div className="flex items-center">
                          Pickup Date
                          {sortField === 'pickup_date' && (
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
                        onClick={() => handleSortChange('created_at')}
                      >
                        <div className="flex items-center">
                          Created
                          {sortField === 'created_at' && (
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
                          No donation requests found
                        </td>
                      </tr>
                    ) : (
                      filteredRequests.map((request) => (
                        <tr key={request.request_id || request.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            #{request.request_id || request.id}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {request.customer?.name || 'N/A'}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {request.pickup_date ? new Date(request.pickup_date).toLocaleDateString() : 'N/A'}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {getStatusBadge(request.status)}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {request.created_at ? new Date(request.created_at).toLocaleDateString() : 'N/A'}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <div className="flex justify-end space-x-2">
                              <Link
                                to={`/admin/requests/${request.request_id || request.id}`}
                                className="inline-flex items-center text-indigo-600 hover:text-indigo-900"
                              >
                                <EyeIcon className="h-5 w-5" />
                                <span className="sr-only">View</span>
                              </Link>
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

      {/* Pagination */}
      {!loading && !error && requests.length > 0 && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing page {currentPage} of {totalPages}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
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
                      <h4 className="text-sm font-medium text-gray-500">Request Information</h4>
                      <p className="mt-1 text-sm text-gray-900">ID: #{selectedRequest.request_id || selectedRequest.id}</p>
                      <p className="mt-1 text-sm text-gray-900">Type: {selectedRequest.request_type || 'Donation'}</p>
                      <p className="mt-1 text-sm text-gray-900">Created: {selectedRequest.created_at ? new Date(selectedRequest.created_at).toLocaleDateString() : 'N/A'}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Customer Information</h4>
                      <p className="mt-1 text-sm text-gray-900">Name: {selectedRequest.customer?.name || 'N/A'}</p>
                      <p className="mt-1 text-sm text-gray-900">Email: {selectedRequest.customer?.email || 'N/A'}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Pickup Information</h4>
                      <p className="mt-1 text-sm text-gray-900">Date: {selectedRequest.pickup_date ? new Date(selectedRequest.pickup_date).toLocaleDateString() : 'N/A'}</p>
                      <p className="mt-1 text-sm text-gray-900">Address: {selectedRequest.pickupAddress?.street || 'N/A'}</p>
                      <p className="mt-1 text-sm text-gray-900">City: {selectedRequest.pickupAddress?.city || 'N/A'}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Materials</h4>
                      {selectedRequest.requestItems && selectedRequest.requestItems.length > 0 ? (
                        <div className="mt-1">
                          {selectedRequest.requestItems.map((item, index) => (
                            <p key={index} className="text-sm text-gray-900">
                              {item.material?.material_name}: {item.quantity} {item.material?.default_unit || 'units'}
                            </p>
                          ))}
                        </div>
                      ) : (
                        <p className="mt-1 text-sm text-gray-900">No materials specified</p>
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Status</h4>
                      <div className="mt-1">{getStatusBadge(selectedRequest.status)}</div>
                    </div>
                    {selectedRequest.status === 'Pending' && (
                      <div className="mt-4 flex space-x-3">
                        <button
                          type="button"
                          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          onClick={() => handleStatusChange(selectedRequest, 'Assigned')}
                        >
                          Assign
                        </button>
                        <button
                          type="button"
                          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          onClick={() => handleStatusChange(selectedRequest, 'Completed')}
                        >
                          Complete
                        </button>
                        <button
                          type="button"
                          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          onClick={() => handleStatusChange(selectedRequest, 'Canceled')}
                        >
                          Cancel
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
                          <option value="Pending">Pending</option>
                          <option value="Assigned">Assigned</option>
                          <option value="Completed">Completed</option>
                          <option value="Canceled">Canceled</option>
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
                          value={createFormData.request_type || 'Donation'}
                          onChange={handleCreateFormChange}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                          <option value="Donation">Donation</option>
                          <option value="Recycling">Recycling</option>
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