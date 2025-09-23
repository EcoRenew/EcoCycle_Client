import React, { useEffect, useState } from 'react';
import { cmsApi } from '../../services/adminApi';

const FaqManagement = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ question: '', answer: '', category: '', display_order: 0, is_active: true });

  const load = async () => {
    setLoading(true);
    const { data } = await cmsApi.listFaqs();
    setFaqs(data.data || data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const save = async (e) => {
    e.preventDefault();
    await cmsApi.createFaq(form);
    setForm({ question: '', answer: '', category: '', display_order: 0, is_active: true });
    load();
  };

  const remove = async (id) => {
    await cmsApi.deleteFaq(id);
    load();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">FAQ Management</h1>
      <form onSubmit={save} className="bg-white p-4 rounded shadow space-y-3">
        <input className="border rounded px-3 py-2 w-full" placeholder="Question" value={form.question} onChange={e=>setForm({...form, question:e.target.value})} required />
        <textarea className="border rounded px-3 py-2 w-full" placeholder="Answer" value={form.answer} onChange={e=>setForm({...form, answer:e.target.value})} required />
        <div className="flex gap-2">
          <input className="border rounded px-3 py-2" placeholder="Category" value={form.category} onChange={e=>setForm({...form, category:e.target.value})} />
          <input type="number" className="border rounded px-3 py-2" placeholder="Order" value={form.display_order} onChange={e=>setForm({...form, display_order:Number(e.target.value)})} />
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.is_active} onChange={e=>setForm({...form, is_active:e.target.checked})} /> Active</label>
        </div>
        <button className="px-4 py-2 bg-ecoGreen text-white rounded">Add FAQ</button>
      </form>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50"><tr><th className="px-4 py-2 text-left">Question</th><th className="px-4 py-2 text-left">Category</th><th></th></tr></thead>
          <tbody className="divide-y">
            {loading ? (<tr><td className="px-4 py-6">Loading...</td></tr>) : faqs.map(f => (
              <tr key={f.faq_id}><td className="px-4 py-2">{f.question}</td><td className="px-4 py-2">{f.category || '-'}</td><td className="px-4 py-2 text-right"><button onClick={()=>remove(f.faq_id)} className="text-red-600">Delete</button></td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FaqManagement;


