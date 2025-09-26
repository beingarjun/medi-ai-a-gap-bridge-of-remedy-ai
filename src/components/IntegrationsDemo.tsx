import React, { useState } from 'react';

const INTEGRATIONS = [
  { type: 'Pharmacy', vendors: ['PioneerRx', 'McKesson', 'Liberty Software', 'QS/1'] },
  { type: 'EHR', vendors: ['Epic', 'Cerner', 'Allscripts'] },
  { type: 'PBM', vendors: ['OptumRx', 'CVS Caremark', 'Express Scripts'] },
  { type: 'Insurance', vendors: ['Eligibility', 'Formulary'] },
  { type: 'CRM', vendors: ['Salesforce Health Cloud', 'Twilio', 'WhatsApp Business API'] },
  { type: 'Payments', vendors: ['Stripe Health', 'Square', 'Insurance Copay'] },
];

const API_BASE = '/integrations';

export default function IntegrationsDemo() {
  const [type, setType] = useState('Pharmacy');
  const [vendor, setVendor] = useState('PioneerRx');
  const [log, setLog] = useState<string[]>([]);
  const [result, setResult] = useState<any>(null);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const t = e.target.value;
    setType(t);
    setVendor(INTEGRATIONS.find(i => i.type === t)?.vendors[0] || '');
    setResult(null);
  };

  const handleVendorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVendor(e.target.value);
    setResult(null);
  };

  const callApi = async () => {
    let url = '';
    if (type === 'Pharmacy') {
      url = `${API_BASE}/pharmacy/${vendor.toLowerCase()}/patients`;
    } else if (type === 'EHR') {
      url = `${API_BASE}/ehr/${vendor.toLowerCase()}/patients`;
    } else if (type === 'PBM') {
      url = `${API_BASE}/pbm/${vendor.toLowerCase()}/formulary`;
    } else if (type === 'Insurance') {
      url = `${API_BASE}/insurance/eligibility?patientId=1&insuranceId=demo`;
    } else if (type === 'CRM') {
      url = `${API_BASE}/crm/${vendor.toLowerCase().replace(/ /g,'-')}/contacts`;
    } else if (type === 'Payments') {
      url = `${API_BASE}/payments/${vendor.toLowerCase().replace(/ /g,'-')}/history`;
    }
    setLog(l => [...l, `GET ${url}`]);
    const res = await fetch(url);
    const data = await res.json();
    setResult(data);
    setLog(l => [...l, JSON.stringify(data, null, 2)]);
  };

  return (
    <div className="card" style={{marginTop:24}}>
      <h2 style={{color:'var(--primary)'}}>Integrations Demo</h2>
      <div style={{display:'flex',gap:16,alignItems:'center',marginBottom:16}}>
        <label style={{fontWeight:500}}>Type:
          <select value={type} onChange={handleTypeChange} className="select">
            {INTEGRATIONS.map(i => <option key={i.type}>{i.type}</option>)}
          </select>
        </label>
        <label style={{fontWeight:500}}>Vendor:
          <select value={vendor} onChange={handleVendorChange} className="select">
            {(INTEGRATIONS.find(i => i.type === type)?.vendors || []).map(v => <option key={v}>{v}</option>)}
          </select>
        </label>
        <button className="btn" onClick={callApi}>Call API</button>
      </div>
      <div style={{marginTop:16}}>
        <strong style={{color:'var(--primary)'}}>Result:</strong>
        <pre style={{background:'#f8f8f8',padding:12,borderRadius:6,marginTop:8}}>{result ? JSON.stringify(result, null, 2) : 'No data'}</pre>
      </div>
      <div style={{marginTop:16}}>
        <strong style={{color:'var(--accent)'}}>Request/Response Log:</strong>
        <pre style={{background:'#f0f0f0',padding:10,borderRadius:6,maxHeight:200,overflow:'auto',marginTop:8}}>{log.join('\n')}</pre>
      </div>
    </div>
  );
}
