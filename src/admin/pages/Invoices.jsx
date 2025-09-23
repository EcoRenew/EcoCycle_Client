import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { invoiceApi } from '../../services/adminApi';

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [search, setSearch] = useState('');
  const [meta, setMeta] = useState(null);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const { data } = await invoiceApi.getInvoices({ page, per_page: perPage, search });
      const payload = data.data || data;
      setInvoices(payload.data || payload.items || []);
      setMeta(payload);
    } catch (e) {
      setError('Failed to load invoices');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
    // eslint-disable-next-line
  }, [page, search]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Invoices</h1>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer name/email"
            className="border rounded-md px-3 py-2 text-sm"
          />
        </div>
      </div>

      {error && <div className="text-red-600 text-sm">{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-md shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice #</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoices.map((inv) => (
                <tr key={inv.invoice_id}>
                  <td className="px-4 py-3 text-sm text-gray-900">{inv.invoice_id}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{new Date(inv.invoice_date).toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{inv.request?.customer?.name} ({inv.request?.customer?.email})</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">${Number(inv.total_amount).toFixed(2)}</td>
                  <td className="px-4 py-3 text-right">
                    <Link to={`/admin/invoices/${inv.invoice_id}`} className="text-ecoGreen hover:underline text-sm">View</Link>
                  </td>
                </tr>
              ))}
              {invoices.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-sm text-gray-500">No invoices found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {meta && (
        <div className="flex items-center justify-end space-x-2">
          <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="px-3 py-1 text-sm border rounded disabled:opacity-50">Prev</button>
          <span className="text-sm text-gray-600">Page {meta.current_page || page} of {meta.last_page || 1}</span>
          <button disabled={meta.current_page >= meta.last_page} onClick={() => setPage((p) => p + 1)} className="px-3 py-1 text-sm border rounded disabled:opacity-50">Next</button>
        </div>
      )}
    </div>
  );
};

export default Invoices;


