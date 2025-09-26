import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Pharmacy {
  id: number;
  name: string;
  address?: string;
  contact?: string;
  npi?: string;
}

const PharmacyManagement: React.FC = () => {
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [form, setForm] = useState<Omit<Pharmacy, 'id'>>({ name: '', address: '', contact: '', npi: '' });
  const [editing, setEditing] = useState<number | null>(null);

  const fetchPharmacies = async () => {
    const res = await fetch('/pharmacies');
    setPharmacies(await res.json());
  };
  useEffect(() => { fetchPharmacies(); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      await fetch(`/pharmacies/${editing}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    } else {
      await fetch('/pharmacies', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    }
    setForm({ name: '', address: '', contact: '', npi: '' });
    setEditing(null);
    fetchPharmacies();
  };

  const handleEdit = (p: Pharmacy) => {
    setForm({ name: p.name, address: p.address || '', contact: p.contact || '', npi: p.npi || '' });
    setEditing(p.id);
  };

  const handleDelete = async (id: number) => {
    await fetch(`/pharmacies/${id}`, { method: 'DELETE' });
    fetchPharmacies();
  };

  return (
    <div>
      <h2>Pharmacy Management</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
        <input name="contact" placeholder="Contact" value={form.contact} onChange={handleChange} />
        <input name="npi" placeholder="NPI" value={form.npi} onChange={handleChange} />
        <button type="submit">{editing ? 'Update' : 'Add'} Pharmacy</button>
        {editing && <button type="button" onClick={() => { setEditing(null); setForm({ name: '', address: '', contact: '', npi: '' }); }}>Cancel</button>}
      </form>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr><th>Name</th><th>Address</th><th>Contact</th><th>NPI</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {pharmacies.map(p => (
            <tr key={p.id}>
              <td><Link to={`/pharmacies/${p.id}`}>{p.name}</Link></td><td>{p.address}</td><td>{p.contact}</td><td>{p.npi}</td>
              <td>
                <button onClick={() => handleEdit(p)}>Edit</button>
                <button onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PharmacyManagement;
