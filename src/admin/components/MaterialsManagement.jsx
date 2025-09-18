import React, { useState, useEffect } from 'react';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import ConfirmDialog from './ConfirmDialog';
import { materialApi, categoryApi } from '../../services/adminApi';

const MaterialsManagement = () => {
  const [materials, setMaterials] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [materialToDelete, setMaterialToDelete] = useState(null);
  const [pagination, setPagination] = useState({ current_page: 1, last_page: 1 });

  async function loadMaterials(page = 1) {
    try {
      setLoading(true);
      const { data } = await materialApi.getMaterials({ page, per_page: 10, search: searchTerm });
      setMaterials((data?.data?.data || []).map(m => ({
        ...m,
        category_name: m.category?.category_name,
      })));
      setPagination({ current_page: data?.data?.current_page || 1, last_page: data?.data?.last_page || 1 });
      setError(null);
    } catch (e) {
      setError('Failed to load materials');
    } finally {
      setLoading(false);
    }
  }

  async function loadCategories() {
    try {
      const { data } = await categoryApi.getCategories({ per_page: 100 });
      setCategories(data?.data?.data || []);
    } catch (e) {
      console.error('Failed to load categories', e);
    }
  }

  useEffect(() => { 
    loadMaterials(); 
    loadCategories(); 
  }, []);

  const filteredMaterials = materials.filter((material) =>
    material.material_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddMaterial = () => {
    setSelectedMaterial(null);
    setIsModalOpen(true);
  };

  const handleEditMaterial = (material) => {
    setSelectedMaterial(material);
    setIsModalOpen(true);
  };

  const handleDeleteMaterial = (material) => {
    setMaterialToDelete(material);
    setIsConfirmDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await materialApi.deleteMaterial(materialToDelete.material_id);
      loadMaterials();
      setIsConfirmDialogOpen(false);
    } catch (error) {
      setError('Failed to delete material');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Materials</h2>
          <button
            onClick={handleAddMaterial}
            className="btn bg-ecoGreen hover:bg-ecoGreen-dark text-white px-4 py-2 rounded-md flex items-center"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            <span>Add Material</span>
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search materials..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ecoGreen"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {/* Materials Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-ecoGreen"></div>
                    </div>
                  </td>
                </tr>
              ) : filteredMaterials.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No materials found
                  </td>
                </tr>
              ) : (
                filteredMaterials.map((material) => (
                  <tr key={material.material_id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{material.material_name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {material.category_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${material.price_per_unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {material.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEditMaterial(material)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteMaterial(material)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.last_page > 1 && (
          <div className="flex justify-center mt-6">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={() => loadMaterials(pagination.current_page - 1)}
                disabled={pagination.current_page === 1}
                className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                  pagination.current_page === 1
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                Previous
              </button>
              {[...Array(pagination.last_page)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => loadMaterials(i + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                    pagination.current_page === i + 1
                      ? 'z-10 bg-ecoGreen text-white border-ecoGreen'
                      : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => loadMaterials(pagination.current_page + 1)}
                disabled={pagination.current_page === pagination.last_page}
                className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                  pagination.current_page === pagination.last_page
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </div>

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Material"
        message="Are you sure you want to delete this material? This action cannot be undone."
      />
    </div>
  );
};

export default MaterialsManagement;