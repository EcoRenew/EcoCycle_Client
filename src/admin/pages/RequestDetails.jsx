import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { requestApi, requestEmailApi } from '../../services/adminApi';

const RequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [emails, setEmails] = useState([]);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const { data } = await requestApi.getRequest(id);
        setRequest(data.data || data);
        // fetch emails after request loads
        const emailsRes = await requestEmailApi.getEmails(id);
        setEmails(emailsRes.data.data || emailsRes.data || []);
      } catch (e) {
        setError('Failed to load request details');
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600 text-sm">{error}</div>;
  if (!request) return null;

  const items = request.request_items || request.requestItems || [];
  const invoiceId = request.invoice?.invoice_id || null;
  const pickup = request.pickupAddress || request.pickup_address || {};
  const collector = request.collector || null;
  const itemPoints = (it) => {
    const pts = it.material?.points ?? it.material?.points_per_kg ?? 0;
    return Number(pts) * Number(it.quantity || 0);
  };
  const totalPoints = items.reduce((sum, it) => sum + itemPoints(it), 0);

  const resend = async (type) => {
    try {
      setResending(true);
      await requestEmailApi.resendEmail(request.request_id || id, type);
      const emailsRes = await requestEmailApi.getEmails(id);
      setEmails(emailsRes.data.data || emailsRes.data || []);
    } catch (e) {
      alert('Failed to resend email');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Request #{request.request_id || request.id}</h1>
          <p className="text-sm text-gray-600">Type: {request.request_type} • Status: {request.status}</p>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={() => navigate(-1)} className="px-3 py-2 text-sm border rounded">Back</button>
          {invoiceId && (
            <Link to={`/admin/invoices/${invoiceId}`} className="px-3 py-2 text-sm bg-ecoGreen text-white rounded">View Invoice</Link>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded shadow p-4 md:col-span-2">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Items</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Material</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Calculated Price</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {items.map((it, idx) => (
                  <tr key={it.request_item_id || `${it.material?.id || it.material_id || 'mat'}-${idx}`}>
                    <td className="px-4 py-3 text-sm text-gray-700">{it.material?.name || it.material?.material_name}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{it.quantity}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">${Number(it.calculated_price || 0).toFixed(2)}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{Math.round(itemPoints(it))}</td>
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
        <div className="space-y-6">
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-sm font-semibold text-gray-700 mb-2">Customer</h2>
            <div className="text-sm text-gray-700">{request.customer?.name}</div>
            <div className="text-sm text-gray-500">{request.customer?.email}</div>
          </div>
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-sm font-semibold text-gray-700 mb-2">Pickup</h2>
            <div className="text-sm text-gray-700">{pickup.full_address || [pickup.street, pickup.city].filter(Boolean).join(', ') || 'N/A'}</div>
            <div className="text-sm text-gray-500">{request.pickup_date ? new Date(request.pickup_date).toLocaleString() : 'N/A'}</div>
          </div>
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-sm font-semibold text-gray-700 mb-2">Collector</h2>
            {collector ? (
              <div className="space-y-1">
                <div className="text-sm text-gray-700">{collector.name}</div>
                <div className="text-sm text-gray-500">{collector.email}</div>
                {collector.primary_phone && (
                  <div className="text-sm text-gray-500">{collector.primary_phone}</div>
                )}
              </div>
            ) : (
              <div className="text-sm text-gray-500">No collector assigned</div>
            )}
          </div>
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-sm font-semibold text-gray-700 mb-2">Total Points</h2>
            <div className="text-sm text-gray-700">{Math.round(totalPoints)}</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded shadow p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-700">Emails</h2>
          <div className="flex items-center gap-2">
            <button disabled={resending} onClick={() => resend('request_confirmation')} className="px-3 py-1 text-xs border rounded">Resend Confirmation</button>
            <button disabled={resending} onClick={() => resend('collector_assigned')} className="px-3 py-1 text-xs border rounded">Resend Assignment</button>
            <button disabled={resending || !invoiceId} onClick={() => resend('completion_invoice')} className="px-3 py-1 text-xs border rounded disabled:opacity-50">Resend Invoice</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sent At</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {emails.map((em, idx) => (
                <tr key={em.email_log_id || `${em.email_type}-${em.sent_at || 'na'}-${idx}`}>
                  <td className="px-4 py-2 text-sm text-gray-700">{em.email_type}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{em.to_email}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{em.subject || '-'}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{em.status}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{em.sent_at ? new Date(em.sent_at).toLocaleString() : '-'}</td>
                </tr>
              ))}
              {emails.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-sm text-gray-500">No emails logged yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RequestDetails;


