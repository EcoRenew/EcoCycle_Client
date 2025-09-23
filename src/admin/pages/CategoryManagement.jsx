import React, { useEffect, useMemo, useState } from 'react';
import { categoryApi } from '../../services/adminApi';
import { FaPlus, FaTrash, FaEdit, FaSpinner } from 'react-icons/fa';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({ current_page: 1, last_page: 1 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ category_name: '', parent_category_id: '' });
  const [editing, setEditing] = useState(null);

  const parentOptions = useMemo(() => {
    return [{ category_id: '', category_name: 'None' }, ...categories.map(c => ({ category_id: c.category_id, category_name: c.category_name }))];
  }, [categories]);

  async function load(page = 1) {
    try {
      setLoading(true);
      const { data } = await categoryApi.getCategories({ page });
      setCategories(data.data.data || []);
      setPagination({ current_page: data.data.current_page, last_page: data.data.last_page });
      setError(null);
    } catch (e) {
      setError('Failed to load categories');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        category_name: form.category_name.trim(),
        parent_category_id: form.parent_category_id || null,
      };
      if (editing) {
        await categoryApi.updateCategory(editing.category_id, payload);
      } else {
        await categoryApi.createCategory(payload);
      }
      setForm({ category_name: '', parent_category_id: '' });
      setEditing(null);
      await load(pagination.current_page);
    } catch (e) {
      setError(e.response?.data?.message || 'Save failed');
    } finally {
      setLoading(false);
    }
  };

  const onEdit = (cat) => {
    setEditing(cat);
    setForm({ category_name: cat.category_name, parent_category_id: cat.parent_category_id || '' });
  };

  const onDelete = async (cat) => {
    if (!window.confirm(`Delete category "${cat.category_name}"?`)) return;
    try {
      setLoading(true);
      await categoryApi.deleteCategory(cat.category_id);
      await load(pagination.current_page);
    } catch (e) {
      setError(e.response?.data?.message || 'Delete failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Category Management</h1>
      </div>

      {error && (
        <div className="text-red-600">{error}</div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold mb-4">{editing ? 'Edit Category' : 'Add New Category'}</h2>
        <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            className="border rounded px-3 py-2"
            placeholder="Category name"
            value={form.category_name}
            onChange={(e) => setForm({ ...form, category_name: e.target.value })}
            required
          />
          <select
            className="border rounded px-3 py-2"
            value={form.parent_category_id}
            onChange={(e) => setForm({ ...form, parent_category_id: e.target.value })}
          >
            {parentOptions.map(opt => (
              <option key={opt.category_id} value={opt.category_id}>{opt.category_name}</option>
            ))}
          </select>
          <button type="submit" className="inline-flex items-center bg-ecoGreen text-white px-4 py-2 rounded">
            {loading ? <FaSpinner className="animate-spin mr-2" /> : <FaPlus className="mr-2" />}
            {editing ? 'Update' : 'Create'}
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Categories</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Parent</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categories.map(cat => (
                <tr key={cat.category_id}>
                  <td className="px-4 py-2 text-sm text-gray-700">{cat.category_id}</td>
                  <td className="px-4 py-2 text-sm text-gray-900">{cat.category_name}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{cat.parent_category?.category_name || '-'}</td>
                  <td className="px-4 py-2 text-right">
                    <button onClick={() => onEdit(cat)} className="inline-flex items-center text-blue-600 mr-3"><FaEdit className="mr-1" /> Edit</button>
                    <button onClick={() => onDelete(cat)} className="inline-flex items-center text-red-600"><FaTrash className="mr-1" /> Delete</button>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && !loading && (
                <tr>
                  <td className="px-4 py-6 text-center text-gray-500" colSpan="4">No categories found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-end space-x-2 mt-4">
          <button
            disabled={pagination.current_page <= 1}
            onClick={() => load(pagination.current_page - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >Prev</button>
          <span className="text-sm text-gray-600">Page {pagination.current_page} of {pagination.last_page}</span>
          <button
            disabled={pagination.current_page >= pagination.last_page}
            onClick={() => load(pagination.current_page + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >Next</button>
        </div>
      </div>
    </div>
  );
};

export default CategoryManagement;


