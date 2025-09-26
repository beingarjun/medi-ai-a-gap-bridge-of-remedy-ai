import { API } from '../api';

export default function UseCases({ email }:{ email:string }) {
  return (
    <div style={{display:'grid', gap:12}}>
      <div><strong>Insurance & Copay</strong></div>
      <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
        <button onClick={async()=>alert(JSON.stringify(await API.eligibility('M123456')))}>Eligibility</button>
        <button onClick={async()=>alert(JSON.stringify(await API.copay({ member_id:'M123456', drug_name:'atorvastatin 40mg', qty:30, days_supply:30, brand:false })))}>Copay Estimate</button>
      </div>

      <div><strong>Adherence</strong></div>
      <button onClick={async()=>alert(JSON.stringify(await API.adherenceSet('M123456','atorvastatin 40mg','8am')))}>Schedule Reminder</button>

      <div><strong>Drug Interactions</strong></div>
      <button onClick={async()=>alert(JSON.stringify(await API.interactions(['atorvastatin','clarithromycin'])))}>Check Interactions</button>

      <div><strong>Prior Authorization</strong></div>
      <button onClick={async()=>alert(JSON.stringify(await API.priorAuth('M123456','Ozempic','E11.9')))}>Submit PA</button>

      <div><strong>Clinical Scheduling</strong></div>
      <button onClick={async()=>alert(JSON.stringify(await API.clinicalBook('M123456','Flu Shot','2025-10-05 14:00')))}>Book Flu Shot</button>

      <div><strong>Knowledge / FAQ</strong></div>
      <button onClick={async()=>alert(JSON.stringify(await API.faq('What are your hours?')))}>Ask Hours</button>

      <div><strong>Compliance</strong></div>
      <button onClick={async()=>{ await API.auditLog('demo_action', {email}); alert('Logged'); }}>Write Audit Log</button>
      <button onClick={async()=>alert(JSON.stringify(await API.auditExport()))}>Export Audit</button>
      <button onClick={async()=>alert(JSON.stringify(await API.gdprErase()))}>GDPR Erase My Data</button>

      <div><strong>ROI</strong></div>
      <button onClick={async()=>alert(JSON.stringify(await API.roi({ monthly_calls:2000, avg_handle_time_minutes:3.5, staff_hourly_cost:28 })))}>Calculate ROI</button>
    </div>
  );
}
