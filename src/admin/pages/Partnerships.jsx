import React, { useState } from 'react';
import {
  MagnifyingGlassIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';
import PartnershipModal from '../components/PartnershipModal';
import ConfirmDialog from '../components/ConfirmDialog';

const Partnerships = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [isPartnershipModalOpen, setIsPartnershipModalOpen] = useState(false);
  const [selectedPartnership, setSelectedPartnership] = useState(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [partnershipToDelete, setPartnershipToDelete] = useState(null);

  // Mock data - replace with actual API calls
  const partnerships = [
    {
      partnership_id: 1,
      company_name: 'GreenTech Solutions',
      contact_person: 'John Smith',
      email: 'john@greentech.com',
      phone: '+1234567890',
      website: 'https://greentech.com',
      partnership_type: 'recycling_facility',
      status: 'active',
      start_date: '2024-01-01',
      end_date: '2024-12-31',
      description: 'Partnership for advanced recycling technology and processing',
      terms: 'Revenue sharing: 70/30 split, Monthly reporting required',
      created_at: '2023-12-15',
    },
    {
      partnership_id: 2,
      company_name: 'EcoLogistics Corp',
      contact_person: 'Sarah Johnson',
      email: 'sarah@ecologistics.com',
      phone: '+1234567891',
      website: 'https://ecologistics.com',
      partnership_type: 'logistics',
      status: 'pending',
      start_date: '2024-02-01',
      end_date: '2025-01-31',
      description: 'Transportation and logistics services for recyclable materials',
      terms: 'Fixed rate per pickup, 24-hour notice required',
      created_at: '2024-01-10',
    },
    {
      partnership_id: 3,
      company_name: 'Urban Waste Management',
      contact_person: 'Mike Davis',
      email: 'mike@urbanwaste.com',
      phone: '+1234567892',
      website: 'https://urbanwaste.com',
      partnership_type: 'collection',
      status: 'expired',
      start_date: '2023-01-01',
      end_date: '2023-12-31',
      description: 'Municipal waste collection and sorting services',
      terms: 'Monthly contract, performance-based bonuses',
      created_at: '2022-12-01',
    },
  ];

  const filteredPartnerships = partnerships.filter((partnership) => {
    const matchesSearch = partnership.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partnership.contact_person.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partnership.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || partnership.status === selectedStatus;
    const matchesType = selectedType === 'all' || partnership.partnership_type === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleAddPartnership = () => {
    setSelectedPartnership(null);
    setIsPartnershipModalOpen(true);
  };

  const handleEditPartnership = (partnership) => {
    setSelectedPartnership(partnership);
    setIsPartnershipModalOpen(true);
  };

  const handleDeletePartnership = (partnership) => {
    setPartnershipToDelete(partnership);
    setIsConfirmDialogOpen(true);
  };

  const confirmDelete = () => {
    // Add API call here
    console.log(`Deleting partnership ${partnershipToDelete.partnership_id}`);
    setIsConfirmDialogOpen(false);
    setPartnershipToDelete(null);
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'suspended':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeBadgeColor = (type) => {
    const colors = {
      recycling_facility: 'bg-ecoGreen text-white',
      logistics: 'bg-blue-500 text-white',
      collection: 'bg-purple-500 text-white',
      technology: 'bg-indigo-500 text-white',
      supplier: 'bg-orange-500 text-white',
    };
    return colors[type] || 'bg-gray-500 text-white';
  };

  const formatPartnershipType = (type) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Partnerships</h1>
          <p className="text-gray-600 mt-1">Manage business partnerships and collaborations</p>
        </div>
        <button
          onClick={handleAddPartnership}
          className="bg-ecoGreen text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors flex items-center space-x-2"
        >
          <PlusIcon className="h-4 w-4" />
          <span>Add Partnership</span>
        </button>
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
                placeholder="Search partnerships..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-ecoGreen focus:border-ecoGreen"
              />
            </div>
          </div>
          
          {/* Status Filter */}
          <div className="sm:w-48">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 w-full border border-gray-300 rounded-md focus:ring-ecoGreen focus:border-ecoGreen"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="expired">Expired</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>

          {/* Type Filter */}
          <div className="sm:w-48">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 w-full border border-gray-300 rounded-md focus:ring-ecoGreen focus:border-ecoGreen"
            >
              <option value="all">All Types</option>
              <option value="recycling_facility">Recycling Facility</option>
              <option value="logistics">Logistics</option>
              <option value="collection">Collection</option>
              <option value="technology">Technology</option>
              <option value="supplier">Supplier</option>
            </select>
          </div>
        </div>
      </div>

      {/* Partnerships Table */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPartnerships.map((partnership) => (
                <tr key={partnership.partnership_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <BuildingOfficeIcon className="h-8 w-8 text-gray-400" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {partnership.company_name}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <GlobeAltIcon className="h-3 w-3 mr-1" />
                          <a 
                            href={partnership.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-ecoGreen hover:text-green-600"
                          >
                            Website
                          </a>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {partnership.contact_person}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <EnvelopeIcon className="h-3 w-3 mr-1" />
                      {partnership.email}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <PhoneIcon className="h-3 w-3 mr-1" />
                      {partnership.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeBadgeColor(partnership.partnership_type)}`}>
                      {formatPartnershipType(partnership.partnership_type)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(partnership.status)}`}>
                      {partnership.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{new Date(partnership.start_date).toLocaleDateString()}</div>
                    <div className="text-xs text-gray-400">
                      to {new Date(partnership.end_date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleEditPartnership(partnership)}
                        className="text-ecoGreen hover:text-green-600 p-1"
                        title="Edit"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePartnership(partnership)}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Delete"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Partnership Modal */}
      <PartnershipModal
        isOpen={isPartnershipModalOpen}
        onClose={() => {
          setIsPartnershipModalOpen(false);
          setSelectedPartnership(null);
        }}
        partnership={selectedPartnership}
      />

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        onClose={() => {
          setIsConfirmDialogOpen(false);
          setPartnershipToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Partnership"
        message={`Are you sure you want to delete the partnership with "${partnershipToDelete?.company_name}"? This action cannot be undone.`}
        confirmText="Delete"
        confirmButtonClass="bg-red-600 hover:bg-red-700 focus:ring-red-500"
      />
    </div>
  );
};

export default Partnerships;