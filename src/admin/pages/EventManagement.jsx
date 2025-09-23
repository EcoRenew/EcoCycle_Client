import React, { useEffect, useState } from 'react';
import { cmsApi } from '../../services/adminApi';

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: '', description: '', date: '', time: '', location: '', image_url: '', is_active: true });

  const load = async () => {
    setLoading(true);
    const { data } = await cmsApi.listEvents();
    setEvents(data.data || data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const save = async (e) => {
    e.preventDefault();
    await cmsApi.createEvent(form);
    setForm({ title: '', description: '', date: '', time: '', location: '', image_url: '', is_active: true });
    load();
  };

  const remove = async (id) => {
    await cmsApi.deleteEvent(id);
    load();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Event Management</h1>
      <form onSubmit={save} className="bg-white p-4 rounded shadow space-y-3">
        <input className="border rounded px-3 py-2 w-full" placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} required />
        <textarea className="border rounded px-3 py-2 w-full" placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <input type="date" className="border rounded px-3 py-2" value={form.date} onChange={e=>setForm({...form, date:e.target.value})} />
          <input className="border rounded px-3 py-2" placeholder="Time" value={form.time} onChange={e=>setForm({...form, time:e.target.value})} />
          <input className="border rounded px-3 py-2" placeholder="Location" value={form.location} onChange={e=>setForm({...form, location:e.target.value})} />
        </div>
        <input className="border rounded px-3 py-2 w-full" placeholder="Image URL" value={form.image_url} onChange={e=>setForm({...form, image_url:e.target.value})} />
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.is_active} onChange={e=>setForm({...form, is_active:e.target.checked})} /> Active</label>
        <button className="px-4 py-2 bg-ecoGreen text-white rounded">Add Event</button>
      </form>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50"><tr><th className="px-4 py-2 text-left">Title</th><th className="px-4 py-2 text-left">Date</th><th></th></tr></thead>
          <tbody className="divide-y">
            {loading ? (<tr><td className="px-4 py-6">Loading...</td></tr>) : events.map(ev => (
              <tr key={ev.event_id}><td className="px-4 py-2">{ev.title}</td><td className="px-4 py-2">{ev.date || '-'}</td><td className="px-4 py-2 text-right"><button onClick={()=>remove(ev.event_id)} className="text-red-600">Delete</button></td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventManagement;


