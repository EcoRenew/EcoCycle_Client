import React, { useState, useEffect } from 'react';
import { 
  FaSearch, 
  FaFilter as FunnelIcon, 
  FaSpinner, 
  FaExclamationTriangle,
  FaEye,
  FaTrash,
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight
} from 'react-icons/fa';
import { requestApi } from '../../services/adminApi';
import ConfirmDialog from '../components/ConfirmDialog';
import { Link, useNavigate } from 'react-router-dom';

const RequestManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortDir, setSortDir] = useState('desc');
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, [currentPage, selectedStatus, searchTerm, sortBy, sortDir]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = {
        page: currentPage,
        per_page: 10,
        type: 'Recycling', // Filter for recycling requests only
        status: selectedStatus !== 'all' ? selectedStatus : undefined,
        search: searchTerm || undefined,
        sort_by: sortBy,
        sort_dir: sortDir,
      };
      const response = await requestApi.getRequests(params);
      const paged = response.data.data; // Laravel paginator
      setRequests(paged.data || []);
      setTotalPages(paged.last_page || 1);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch requests');
      console.error('Requests fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRequest = (request) => {
    setRequestToDelete(request);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const id = requestToDelete.request_id || requestToDelete.id;
      await requestApi.deleteRequest(id);
      setIsDeleteDialogOpen(false);
      setRequestToDelete(null);
      fetchRequests();
    } catch (err) {
      console.error('Delete request error:', err);
      alert(err.response?.data?.message || 'Failed to delete request');
    }
  };

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

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Assigned':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Canceled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const columns = [
    { key: 'request_id', label: 'Request ID' },
    { key: 'customer', label: 'Customer' },
    { key: 'pickup_date', label: 'Pickup Date' },
    { key: 'status', label: 'Status' },
    { key: 'created_at', label: 'Created' },
  ];

  const onSort = (key) => {
    if (key === 'customer') return; // not sortable directly
    setSortBy(key);
    setSortDir((prev) => (sortBy === key ? (prev === 'asc' ? 'desc' : 'asc') : 'asc'));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Recycling Requests</h1>
          <p className="text-gray-600 mt-1">Search, filter, sort and manage requests</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by ID, customer, collector, address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-ecoGreen focus:border-ecoGreen"
              />
            </div>
          </div>
          <div className="sm:w-48">
            <div className="relative">
              <FunnelIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-ecoGreen focus:border-ecoGreen appearance-none"
              >
                <option value="all">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Assigned">Assigned</option>
                <option value="Completed">Completed</option>
                <option value="Canceled">Canceled</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((col) => (
                  <th key={col.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => onSort(col.key)}>
                    {col.label}
                  </th>
                ))}
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.map((request) => (
                <tr key={request.request_id || request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">#{request.request_id || request.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{request.customer?.name}</div>
                    <div className="text-sm text-gray-500">{request.customer?.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{request.pickup_date ? new Date(request.pickup_date).toLocaleDateString() : '-'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(request.status)}`}>{request.status}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.created_at ? new Date(request.created_at).toLocaleDateString() : '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        to={`/admin/requests/${request.request_id || request.id}`}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="View details"
                      >
                        <FaEye className="h-4 w-4" />
                      </Link>
                      <select
                        value={request.status}
                        onChange={(e) => handleStatusChange(request, e.target.value)}
                        className="text-sm border border-gray-300 rounded-md focus:ring-ecoGreen focus:border-ecoGreen"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Assigned">Assigned</option>
                        <option value="Completed">Completed</option>
                        <option value="Canceled">Canceled</option>
                      </select>
                      <button
                        onClick={() => handleDeleteRequest(request)}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Delete request"
                      >
                        <FaTrash className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!loading && requests.length > 0 && (
          <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">Showing page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span></p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50">
                    <span className="sr-only">First</span>
                    <FaAngleDoubleLeft className="h-5 w-5" />
                  </button>
                  <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1} className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50">
                    <span className="sr-only">Previous</span>
                    <FaAngleLeft className="h-5 w-5" />
                  </button>
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button key={pageNum} onClick={() => setCurrentPage(pageNum)} className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === pageNum ? 'z-10 bg-ecoGreen border-ecoGreen text-white' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                        {pageNum}
                      </button>
                    );
                  })}
                  <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50">
                    <span className="sr-only">Next</span>
                    <FaAngleRight className="h-5 w-5" />
                  </button>
                  <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50">
                    <span className="sr-only">Last</span>
                    <FaAngleDoubleRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}

        {!loading && requests.length === 0 && (
          <div className="px-6 py-10 text-center">
            <FaExclamationTriangle className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No requests found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter.</p>
          </div>
        )}

        {loading && (
          <div className="px-6 py-10 text-center">
            <FaSpinner className="mx-auto h-12 w-12 text-gray-400 animate-spin" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Loading requests...</h3>
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => { setIsDeleteDialogOpen(false); setRequestToDelete(null); }}
        onConfirm={confirmDelete}
        title="Delete Request"
        message={`Are you sure you want to delete request #${requestToDelete?.request_id || requestToDelete?.id}? This action cannot be undone.`}
        confirmText="Delete"
        confirmButtonClass="bg-red-600 hover:bg-red-700 focus:ring-red-500"
      />
    </div>
  );
};

export default RequestManagement;