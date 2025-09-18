import React, { useState, useEffect } from 'react';
import { FaPlus, FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import { adminApi } from '../../services/adminApi';
import ConfirmDialog from '../components/ConfirmDialog';

// Material Modal Component
const MaterialModal = ({ isOpen, onClose, material, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'plastic',
    points_per_kg: '',
    image_url: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (material) {
      setFormData({
        name: material.name || '',
        description: material.description || '',
        type: material.type || 'plastic',
        points_per_kg: material.points_per_kg ? material.points_per_kg.toString() : '',
        image_url: material.image_url || ''
      });
    } else {
      setFormData({
        name: '',
        description: '',
        type: 'plastic',
        points_per_kg: '',
        image_url: ''
      });
    }
  }, [material]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const materialData = {
        ...formData,
        points_per_kg: parseFloat(formData.points_per_kg)
      };
      
      await onSave(materialData);
      onClose();
    } catch (err) {
      console.error('Submit error:', err);
      alert('Failed to save material. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {material ? 'Edit Material' : 'Add New Material'}
                  </h3>
                  <button onClick={onClose} className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none">
                    <span className="sr-only">Close</span>
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  {/* Material Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Material Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-ecoGreen focus:border-ecoGreen sm:text-sm"
                      required
                    />
                  </div>
                  
                  {/* Description */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      name="description"
                      id="description"
                      rows="3"
                      value={formData.description}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-ecoGreen focus:border-ecoGreen sm:text-sm"
                      required
                    />
                  </div>
                  
                  {/* Type and Points */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="type" className="block text-sm font-medium text-gray-700">Material Type</label>
                      <select
                        name="type"
                        id="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-ecoGreen focus:border-ecoGreen sm:text-sm"
                      >
                        <option value="plastic">Plastic</option>
                        <option value="paper">Paper</option>
                        <option value="glass">Glass</option>
                        <option value="metal">Metal</option>
                        <option value="electronics">Electronics</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="points_per_kg" className="block text-sm font-medium text-gray-700">Points per KG</label>
                      <input
                        type="number"
                        name="points_per_kg"
                        id="points_per_kg"
                        value={formData.points_per_kg}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-ecoGreen focus:border-ecoGreen sm:text-sm"
                        required
                        min="0"
                        step="0.1"
                      />
                    </div>
                  </div>
                  
                  {/* Image URL */}
                  <div>
                    <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">Image URL</label>
                    <input
                      type="url"
                      name="image_url"
                      id="image_url"
                      value={formData.image_url}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-ecoGreen focus:border-ecoGreen sm:text-sm"
                    />
                  </div>
                  
                  {/* Form Actions */}
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ecoGreen sm:text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-ecoGreen text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ecoGreen sm:text-sm disabled:opacity-50"
                    >
                      {isSubmitting ? 'Saving...' : 'Save Material'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main MaterialManagement Component
const MaterialManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [modals, setModals] = useState({
    create: false,
    edit: false,
    delete: false
  });
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 10,
    total: 0,
    last_page: 1
  });

  useEffect(() => {
    fetchMaterials();
  }, [pagination.current_page, selectedType, searchTerm]);

  const fetchMaterials = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.current_page,
        per_page: pagination.per_page
      };

      if (searchTerm) params.search = searchTerm;
      if (selectedType !== 'all') params.type = selectedType;

      const response = await adminApi.getMaterials(params);
      setMaterials(response.data.data);
      setPagination({
        current_page: response.data.current_page,
        per_page: response.data.per_page,
        total: response.data.total,
        last_page: response.data.last_page
      });
      setError(null);
    } catch (err) {
      console.error('Error fetching materials:', err);
      setError('Failed to load materials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditMaterial = (material) => {
    setSelectedMaterial(material);
    setModals({ ...modals, edit: true });
  };

  const handleDeleteMaterial = (material) => {
    setSelectedMaterial(material);
    setModals({ ...modals, delete: true });
  };

  const confirmDelete = async () => {
    try {
      await adminApi.deleteMaterial(selectedMaterial.id);
      fetchMaterials();
      setModals({ ...modals, delete: false });
    } catch (err) {
      console.error('Error deleting material:', err);
      alert('Failed to delete material. Please try again.');
    }
  };

  const handleMaterialSave = async (materialData) => {
    try {
      if (selectedMaterial) {
        await adminApi.updateMaterial(selectedMaterial.id, materialData);
      } else {
        await adminApi.createMaterial(materialData);
      }
      fetchMaterials();
      setModals({ create: false, edit: false, delete: false });
    } catch (err) {
      console.error('Error saving material:', err);
      throw err;
    }
  };

  const getTypeBadgeColor = (type) => {
    const colors = {
      plastic: 'bg-blue-100 text-blue-800',
      paper: 'bg-yellow-100 text-yellow-800',
      glass: 'bg-green-100 text-green-800',
      metal: 'bg-gray-100 text-gray-800',
      electronics: 'bg-purple-100 text-purple-800',
      other: 'bg-pink-100 text-pink-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Materials Management</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage recyclable materials, their descriptions, points values, and images.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={() => {
              setSelectedMaterial(null);
              setModals({ ...modals, create: true });
            }}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-ecoGreen px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-ecoGreen focus:ring-offset-2 sm:w-auto"
          >
            <FaPlus className="-ml-1 mr-2 h-4 w-4" />
            Add Material
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            name="search"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search materials..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-ecoGreen focus:border-ecoGreen sm:text-sm"
          />
        </div>
        <div className="sm:w-64">
          <select
            id="type"
            name="type"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-ecoGreen focus:border-ecoGreen sm:text-sm"
          >
            <option value="all">All Types</option>
            <option value="plastic">Plastic</option>
            <option value="paper">Paper</option>
            <option value="glass">Glass</option>
            <option value="metal">Metal</option>
            <option value="electronics">Electronics</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Materials Table */}
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Type</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Points per KG</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Created Date</th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="py-10 text-center text-gray-500">
                        <div className="flex justify-center">
                          <svg className="animate-spin h-8 w-8 text-ecoGreen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        </div>
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan="5" className="py-10 text-center text-red-500">{error}</td>
                    </tr>
                  ) : materials.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="py-10 text-center text-gray-500">
                        No materials found. Try adjusting your filters or add a new material.
                      </td>
                    </tr>
                  ) : (
                    materials.map((material) => (
                      <tr key={material.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {material.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeBadgeColor(material.type)}`}>
                            {material.type}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {material.points_per_kg}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {new Date(material.created_at).toLocaleDateString()}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button
                            onClick={() => handleEditMaterial(material)}
                            className="text-ecoGreen hover:text-green-600 mr-4"
                          >
                            <FaEdit className="h-4 w-4 inline mr-1" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteMaterial(material)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FaTrash className="h-4 w-4 inline mr-1" />
                            Delete
                          </button>
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

      {/* Simple Pagination */}
      {!loading && !error && materials.length > 0 && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4">
          <div className="flex flex-1 justify-between">
            <button
              onClick={() => setPagination({ ...pagination, current_page: Math.max(1, pagination.current_page - 1) })}
              disabled={pagination.current_page === 1}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {pagination.current_page} of {pagination.last_page}
            </span>
            <button
              onClick={() => setPagination({ ...pagination, current_page: Math.min(pagination.last_page, pagination.current_page + 1) })}
              disabled={pagination.current_page === pagination.last_page}
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Material Modal */}
      <MaterialModal
        isOpen={modals.create || modals.edit}
        onClose={() => setModals({ ...modals, create: false, edit: false })}
        material={selectedMaterial}
        onSave={handleMaterialSave}
      />

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={modals.delete}
        title="Delete Material"
        message={`Are you sure you want to delete ${selectedMaterial?.name}? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setModals({ ...modals, delete: false })}
      />
    </div>
  );
};

export default MaterialManagement;