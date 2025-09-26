import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Pharmacy {
  id: number;
  name: string;
  address?: string;
  contact?: string;
  npi?: string;
}

const PharmacyProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pharmacy, setPharmacy] = useState<Pharmacy | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/pharmacies`).then(res => res.json()).then((data: Pharmacy[]) => {
      const found = data.find(p => p.id === Number(id));
      setPharmacy(found || null);
    });
  }, [id]);

  if (!pharmacy) return <div>Loading or not found...</div>;

  return (
    <div>
      <h2>Pharmacy Profile</h2>
      <p><b>Name:</b> {pharmacy.name}</p>
      <p><b>Address:</b> {pharmacy.address}</p>
      <p><b>Contact:</b> {pharmacy.contact}</p>
      <p><b>NPI:</b> {pharmacy.npi}</p>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default PharmacyProfile;
