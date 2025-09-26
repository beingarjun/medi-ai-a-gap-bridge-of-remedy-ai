import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Customer {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
}

const CustomerProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/customers`).then(res => res.json()).then((data: Customer[]) => {
      const found = data.find(c => c.id === Number(id));
      setCustomer(found || null);
    });
  }, [id]);

  if (!customer) return <div>Loading or not found...</div>;

  return (
    <div>
      <h2>Customer Profile</h2>
      <p><b>Name:</b> {customer.name}</p>
      <p><b>Email:</b> {customer.email}</p>
      <p><b>Phone:</b> {customer.phone}</p>
      <p><b>Address:</b> {customer.address}</p>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default CustomerProfile;
