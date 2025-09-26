import { useState } from 'react';
import { API } from '../api';

export default function SignUp({ onAuthed }:{ onAuthed:(email:string)=>void }) {
  const [email,setEmail]=useState('demo@pharmacy.com');
  const [password,setPassword]=useState('demo123');
  return (
    <form onSubmit={async e=>{e.preventDefault(); const r=await API.signup(email,password); onAuthed(email);}} style={{display:'flex',gap:8}}>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email"/>
      <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password"/>
      <button>Sign up / in</button>
    </form>
  );
}
