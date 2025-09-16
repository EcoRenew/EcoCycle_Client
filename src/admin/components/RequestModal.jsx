import React from 'react';
import {
  XMarkIcon,
  CalendarIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

const RequestModal = ({ isOpen, onClose, request }) => {
  if (!isOpen || !request) return null;

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

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-medium text-gray-900">
              Request Details #{request.request_id}
            </h3>
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeBadgeColor(request.request_type)}`}>
              {request.request_type}
            </span>
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(request.status)}`}>
              {request.status}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-6 space-y-6">
          {/* Customer Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center">
              <UserIcon className="h-5 w-5 mr-2 text-ecoGreen" />
              Customer Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <p className="mt-1 text-sm text-gray-900">{request.customer.full_name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 flex items-center">
                  <EnvelopeIcon className="h-4 w-4 mr-1" />
                  Email
                </label>
                <p className="mt-1 text-sm text-gray-900">{request.customer.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 flex items-center">
                  <PhoneIcon className="h-4 w-4 mr-1" />
                  Phone
                </label>
                <p className="mt-1 text-sm text-gray-900">{request.customer.phone}</p>
              </div>
              {request.customer.address && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 flex items-center">
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    Address
                  </label>
                  <p className="mt-1 text-sm text-gray-900">{request.customer.address}</p>
                </div>
              )}
            </div>
          </div>

          {/* Request Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2 text-ecoGreen" />
              Request Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Request Date</label>
                <p className="mt-1 text-sm text-gray-900">
                  {new Date(request.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Pickup Date</label>
                <p className="mt-1 text-sm text-gray-900">
                  {new Date(request.pickup_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Request Type</label>
                <p className="mt-1 text-sm text-gray-900 capitalize">{request.request_type}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 flex items-center">
                  <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                  Total Amount
                </label>
                <p className="mt-1 text-sm text-gray-900 font-semibold">
                  ${request.total_amount.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-md font-medium text-gray-900 mb-3">Items</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Material
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Unit
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {request.items.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.material_name}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                        {item.unit}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                        ${((item.quantity * (item.price_per_unit || 2.5))).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Notes */}
          {request.notes && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-md font-medium text-gray-900 mb-3">Notes</h4>
              <p className="text-sm text-gray-700">{request.notes}</p>
            </div>
          )}

          {/* Admin Notes */}
          {request.admin_notes && (
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="text-md font-medium text-gray-900 mb-3">Admin Notes</h4>
              <p className="text-sm text-gray-700">{request.admin_notes}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestModal;