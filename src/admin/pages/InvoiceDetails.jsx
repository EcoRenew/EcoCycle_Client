import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { invoiceApi } from '../../services/adminApi';

const InvoiceDetails = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        setLoading(true);
        const { data } = await invoiceApi.getInvoice(id);
        setInvoice(data.data || data);
      } catch (e) {
        setError('Failed to load invoice');
      } finally {
        setLoading(false);
      }
    };
    fetchInvoice();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600 text-sm">{error}</div>;
  if (!invoice) return null;

  const items = invoice.request?.request_items || invoice.request?.requestItems || [];
  const calcItemPoints = (it) => {
    const pts = it.material?.points ?? it.material?.points_per_kg ?? 0;
    return Number(pts) * Number(it.quantity || 0);
  };
  const totalPoints = items.reduce((sum, it) => sum + calcItemPoints(it), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Invoice #{invoice.invoice_id}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">Customer</h2>
          <div className="text-sm text-gray-700">{invoice.request?.customer?.name}</div>
          <div className="text-sm text-gray-500">{invoice.request?.customer?.email}</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">Invoice Info</h2>
          <div className="text-sm text-gray-700">Date: {new Date(invoice.invoice_date).toLocaleString()}</div>
          <div className="text-sm text-gray-700">Total: ${Number(invoice.total_amount).toFixed(2)}</div>
          <div className="text-sm text-gray-700">Total Points: {Math.round(totalPoints)}</div>
        </div>
      </div>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Material</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((it, idx) => (
              <tr key={it.request_item_id || `inv-${idx}` }>
                <td className="px-4 py-3 text-sm text-gray-700">{it.material?.name || it.material?.material_name}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{it.quantity}</td>
                <td className="px-4 py-3 text-sm text-gray-700">${Number(it.calculated_price || 0).toFixed(2)}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{Math.round(calcItemPoints(it))}</td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td className="px-4 py-8 text-center text-sm text-gray-500" colSpan={4}>No items</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceDetails;


