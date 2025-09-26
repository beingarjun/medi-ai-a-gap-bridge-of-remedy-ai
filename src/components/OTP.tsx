import { useState } from 'react';
import { API } from '../api';

export function OTP() {
  const [phone,setPhone]=useState('+15555550123');
  const [code,setCode]=useState('');
  return (
    <div style={{display:'flex',gap:8}}>
      <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone"/>
      <button onClick={()=>API.otpSend(phone)}>Send OTP</button>
      <input value={code} onChange={e=>setCode(e.target.value)} placeholder="Code"/>
      <button onClick={async()=>alert(JSON.stringify(await API.otpVerify(code)))}>Verify</button>
    </div>
  );
}
