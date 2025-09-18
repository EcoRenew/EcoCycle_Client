import React, { useState, useEffect } from 'react';
import { materialApi } from '../../services/adminApi';
import {
  XMarkIcon,
  PhotoIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

const ContentModal = ({ isOpen, onClose, content, contentType, categories = [], onSaved }) => {
  const [formData, setFormData] = useState({
    // Material fields
    material_name: '',
    description: '',
    price_per_unit: '',
    unit: 'kg',
    category_id: '',
    image_url: '',
    
    // Article fields
    title: '',
    content: '',
    author: 'Admin',
    status: 'draft',
    featured_image: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (content) {
      setFormData(content);
    } else {
      // Reset form for new content
      setFormData({
        material_name: '',
        description: '',
        price_per_unit: '',
        unit: 'kg',
        category_id: '',
        image_url: '',
        title: '',
        content: '',
        author: 'Admin',
        status: 'draft',
        featured_image: '',
      });
    }
    setErrors({});
  }, [content, isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (contentType === 'materials') {
      if (!formData.material_name.trim()) {
        newErrors.material_name = 'Material name is required';
      }
      if (!formData.description.trim()) {
        newErrors.description = 'Description is required';
      }
      if (!formData.price_per_unit || formData.price_per_unit <= 0) {
        newErrors.price_per_unit = 'Valid price is required';
      }
      if (!formData.category_id) {
        newErrors.category_id = 'Category is required';
      }
    } else {
      if (!formData.title.trim()) {
        newErrors.title = 'Title is required';
      }
      if (!formData.content.trim()) {
        newErrors.content = 'Content is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const payload = {
        material_name: formData.material_name,
        price_per_unit: Number(formData.price_per_unit),
        unit: formData.unit === 'pieces' ? 'item' : formData.unit,
        category_id: formData.category_id,
      };
      if (content) {
        await materialApi.updateMaterial(content.material_id, payload);
      } else {
        await materialApi.createMaterial(payload);
      }
      if (onSaved) await onSaved();
      onClose();
    } catch (err) {
      // Basic error surfacing
      setErrors({ submit: err.response?.data?.message || 'Save failed' });
    }
  };

  const units = ['kg', 'pieces'];
  const articleStatuses = ['draft', 'published', 'archived'];

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 shadow-lg rounded-md bg-white max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            {contentType === 'materials' ? (
              <PhotoIcon className="h-6 w-6 text-ecoGreen" />
            ) : (
              <DocumentTextIcon className="h-6 w-6 text-ecoGreen" />
            )}
            <h3 className="text-lg font-medium text-gray-900">
              {content ? 'Edit' : 'Add'} {contentType === 'materials' ? 'Material' : 'Article'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {contentType === 'materials' ? (
            // Material Form Fields
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Material Name *
                  </label>
                  <input
                    type="text"
                    name="material_name"
                    value={formData.material_name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ecoGreen ${
                      errors.material_name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter material name"
                  />
                  {errors.material_name && (
                    <p className="mt-1 text-sm text-red-600">{errors.material_name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ecoGreen ${
                      errors.category_id ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat.category_id} value={cat.category_id}>{cat.category_name}</option>
                    ))}
                  </select>
                  {errors.category_id && (
                    <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price per Unit *
                  </label>
                  <input
                    type="number"
                    name="price_per_unit"
                    value={formData.price_per_unit}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ecoGreen ${
                      errors.price_per_unit ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="0.00"
                  />
                  {errors.price_per_unit && (
                    <p className="mt-1 text-sm text-red-600">{errors.price_per_unit}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unit
                  </label>
                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ecoGreen"
                  >
                    {units.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ecoGreen ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter material description"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ecoGreen"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div />
            </>
          ) : (
            // Article Form Fields
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ecoGreen ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter article title"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ecoGreen"
                    placeholder="Author name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ecoGreen"
                  >
                    {articleStatuses.map(status => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image URL
                </label>
                <input
                  type="url"
                  name="featured_image"
                  value={formData.featured_image}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ecoGreen"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows={8}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ecoGreen ${
                    errors.content ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter article content"
                />
                {errors.content && (
                  <p className="mt-1 text-sm text-red-600">{errors.content}</p>
                )}
              </div>
            </>
          )}

          {/* Footer */}
          <div className="pt-4 border-t border-gray-200 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-ecoGreen text-white rounded-md hover:bg-green-600 transition-colors"
            >
              {content ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContentModal;