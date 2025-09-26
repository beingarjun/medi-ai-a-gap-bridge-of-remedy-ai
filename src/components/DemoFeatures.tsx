import { useState } from 'react';

export default function DemoFeatures({ token }:{ token?:string }) {
  const [result, setResult] = useState<any>(null);
  const [question, setQuestion] = useState('Any FDA recalls?');
  const [config, setConfig] = useState({ personality: '', voice: '' });

  // Helper for fetch
  const api = async (url:string, opts:any = {}) => {
    if (token) opts.headers = { ...(opts.headers||{}), Authorization: `Bearer ${token}` };
    const r = await fetch(url, opts);
    if (r.headers.get('content-type')?.includes('application/json')) return r.json();
    return r.text();
  };

  return (
    <div style={{border:'1px solid #eee', borderRadius:12, padding:16, marginTop:12}}>
      <h3>Demo Features (Enterprise/AI)</h3>
      <div style={{display:'flex', flexWrap:'wrap', gap:8}}>
        {/* Adherence Tracking */}
        <button onClick={async()=>setResult(await api('/adherence-tracking/track', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({member_id:'M123456',drug:'atorvastatin 40mg',time:new Date().toISOString()})}))}>Track Pill</button>
        <button onClick={async()=>setResult(await api('/adherence-tracking/summary/M123456'))}>Get Adherence Summary</button>

        {/* Proactive Outreach */}
        <button onClick={async()=>setResult(await api('/proactive-outreach/reminder', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({member_id:'M123456',message:'Time to refill!',time:new Date().toISOString()})}))}>Schedule Reminder</button>
        <button onClick={async()=>setResult(await api('/proactive-outreach/reminders/M123456'))}>List Reminders</button>

        {/* Identity Verification */}
        <button onClick={async()=>setResult(await api('/identity-verification/voice', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({audioSample:'base64string'})}))}>Voice Verify</button>
        <button onClick={async()=>setResult(await api('/identity-verification/ehr', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({member_id:'M123456',dob:'1990-01-01'})}))}>EHR Verify</button>

        {/* Compliance Plus */}
        <button onClick={async()=>{
          const res = await fetch('/compliance-plus/audit/csv', {headers: token ? {Authorization:`Bearer ${token}`} : {}});
          const blob = await res.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url; a.download = 'audit_logs.csv'; a.click();
        }}>Download Audit CSV</button>
        <button onClick={async()=>setResult(await api('/compliance-plus/ccpa/delete', {method:'POST'}))}>CCPA Erase</button>

        {/* Testimonials */}
        <button onClick={async()=>setResult(await api('/testimonials'))}>Get Testimonials</button>

        {/* Agent Config */}
        <button onClick={async()=>setResult(await api('/agent-config'))}>Get Agent Config</button>
        <input placeholder="Personality" value={config.personality} onChange={e=>setConfig(c=>({...c,personality:e.target.value}))} style={{width:120}}/>
        <input placeholder="Voice" value={config.voice} onChange={e=>setConfig(c=>({...c,voice:e.target.value}))} style={{width:100}}/>
        <button onClick={async()=>setResult(await api('/agent-config', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(config)}))}>Update Config</button>

        {/* Agent Orchestration */}
        <button onClick={async()=>setResult(await api('/agent-orchestration/plan', {method:'POST',headers:{'Content-Type':'application/json'},body:'{}'}))}>Planner Agent</button>
        <button onClick={async()=>setResult(await api('/agent-orchestration/execute', {method:'POST',headers:{'Content-Type':'application/json'},body:'{}'}))}>Executor Agent</button>
        <button onClick={async()=>setResult(await api('/agent-orchestration/review', {method:'POST',headers:{'Content-Type':'application/json'},body:'{}'}))}>Reviewer Agent</button>

        {/* RAG Knowledge */}
        <input value={question} onChange={e=>setQuestion(e.target.value)} placeholder="Ask Knowledge Agent" style={{width:180}}/>
        <button onClick={async()=>setResult(await api('/rag-knowledge/query', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question})}))}>Ask RAG</button>
      </div>
      {result && <pre style={{marginTop:16,background:'#f9f9f9',padding:8,borderRadius:8,maxWidth:700,overflowX:'auto'}}>{typeof result==='string'?result:JSON.stringify(result,null,2)}</pre>}
    </div>
  );
}
