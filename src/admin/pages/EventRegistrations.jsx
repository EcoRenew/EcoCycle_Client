import React, { useEffect, useState } from 'react';
import { cmsApi } from '../../services/adminApi';

const EventRegistrations = () => {
  const [regs, setRegs] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data } = await cmsApi.listRegistrations();
    setRegs(data.data || data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    await cmsApi.updateRegistrationStatus(id, status);
    load();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Event Registrations</h1>
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50"><tr><th className="px-4 py-2 text-left">Event</th><th className="px-4 py-2 text-left">Name</th><th className="px-4 py-2 text-left">Email</th><th className="px-4 py-2 text-left">Status</th><th></th></tr></thead>
          <tbody className="divide-y">
            {loading ? (<tr><td className="px-4 py-6">Loading...</td></tr>) : regs.map(r => (
              <tr key={r.registration_id}>
                <td className="px-4 py-2">{r.event?.title}</td>
                <td className="px-4 py-2">{r.name}</td>
                <td className="px-4 py-2">{r.email}</td>
                <td className="px-4 py-2">{r.status}</td>
                <td className="px-4 py-2 text-right space-x-2">
                  <button onClick={()=>updateStatus(r.registration_id, 'approved')} className="px-3 py-1 text-xs bg-green-600 text-white rounded">Approve</button>
                  <button onClick={()=>updateStatus(r.registration_id, 'rejected')} className="px-3 py-1 text-xs bg-red-600 text-white rounded">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventRegistrations;


