import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


interface Customer {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
}

const CustomerManagement: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [form, setForm] = useState<Omit<Customer, 'id'>>({ name: '', email: '', phone: '', address: '' });
  const [editing, setEditing] = useState<number | null>(null);

  const fetchCustomers = async () => {
    const res = await fetch('/customers');
    setCustomers(await res.json());
  };
  useEffect(() => { fetchCustomers(); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      await fetch(`/customers/${editing}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    } else {
      await fetch('/customers', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    }
    setForm({ name: '', email: '', phone: '', address: '' });
    setEditing(null);
    fetchCustomers();
  };

  const handleEdit = (c: Customer) => {
    setForm({ name: c.name, email: c.email || '', phone: c.phone || '', address: c.address || '' });
    setEditing(c.id);
  };

  const handleDelete = async (id: number) => {
    await fetch(`/customers/${id}`, { method: 'DELETE' });
    fetchCustomers();
  };

  return (
    <div>
      <h2>Customer Management</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
        <button type="submit">{editing ? 'Update' : 'Add'} Customer</button>
        {editing && <button type="button" onClick={() => { setEditing(null); setForm({ name: '', email: '', phone: '', address: '' }); }}>Cancel</button>}
      </form>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr><th>Name</th><th>Email</th><th>Phone</th><th>Address</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {customers.map(c => (
            <tr key={c.id}>
              <td><Link to={`/customers/${c.id}`}>{c.name}</Link></td><td>{c.email}</td><td>{c.phone}</td><td>{c.address}</td>
              <td>
                <button onClick={() => handleEdit(c)}>Edit</button>
                <button onClick={() => handleDelete(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerManagement;
