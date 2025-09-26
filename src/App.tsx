import React, { useState } from 'react';
import './App.css';
import SignUp from './components/SignUp';
import { OTP } from './components/OTP';
import UseCases from './components/UseCases';
import Payments from './components/Payments';
import { Telepharmacy } from './components/Telepharmacy';
import DemoFeatures from './components/DemoFeatures';
import NlpDemo from './components/NlpDemo';
import IntegrationsDemo from './components/IntegrationsDemo';
import { FaUserShield, FaDollarSign, FaRobot, FaCapsules, FaCheckCircle, FaSignInAlt } from 'react-icons/fa';

export default function App() {
  const [email, setEmail] = useState<string>('');
  return (
    <div className="app-container">
      <header style={{display:'flex',alignItems:'center',gap:16,marginBottom:24}}>
        <img src="/logo192.png" alt="Medi.ai Logo" style={{height:40,marginRight:8}} />
        <h2 style={{margin:0,flex:1}}>Medi.ai <span style={{color:'var(--primary)'}}>&mdash; End-to-End Demo</span></h2>
        <SignUp onAuthed={setEmail} />
      </header>

      <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:8}}>
        <FaSignInAlt color="var(--primary)" />
        {email
          ? <span style={{color:'var(--success)'}}>Signed in as <strong>{email}</strong></span>
          : <span style={{color:'var(--gray)'}}>Sign up to unlock the flows &nbsp; <span style={{background:'#e3e8ee',padding:'2px 8px',borderRadius:6,fontSize:12}}>demo@pharmacy.com / password</span></span>
        }
      </div>

      <section>
        <h3><FaCheckCircle color="var(--primary)" style={{marginRight:8}} />Identity (OTP)</h3>
        <OTP />
      </section>

      <section>
        <h3><FaCapsules color="var(--primary)" style={{marginRight:8}} />Use Cases & Features</h3>
        <UseCases email={email} />
      </section>

      <section>
        <h3><FaRobot color="var(--primary)" style={{marginRight:8}} />Telepharmacy <span style={{fontWeight:400}}>(Free via Jitsi)</span></h3>
        <Telepharmacy />
      </section>

      <section>
        <h3><FaDollarSign color="var(--primary)" style={{marginRight:8}} />Payments</h3>
        <Payments email={email} />
        <p style={{ fontSize: 12, color: '#666', marginTop: 4 }}>MockPay is free; Stripe runs in TEST mode (no real charges).</p>
      </section>

      <section>
        <h3><FaUserShield color="var(--primary)" style={{marginRight:8}} />Demo Features <span style={{fontWeight:400}}>(Enterprise/AI)</span></h3>
        <DemoFeatures />
      </section>

      <section>
        <h3 style={{color:'var(--accent)'}}>NLP Demo <span style={{fontWeight:400}}>(TF-IDF & Phrase Extraction)</span></h3>
        <NlpDemo />
      </section>

      <section>
        <h3 style={{color:'var(--primary)'}}>Integrations Demo</h3>
        <IntegrationsDemo />
      </section>

      <footer style={{marginTop:32,paddingTop:16,borderTop:'1px solid #e3e8ee',textAlign:'center',fontSize:14,color:'#888'}}>
        &copy; {new Date().getFullYear()} Medi.ai &mdash; <a href="mailto:info@medi.ai" style={{color:'var(--primary)'}}>Contact Us</a> &nbsp;|&nbsp; <a href="https://medi.ai" style={{color:'var(--primary)'}}>Website</a>
      </footer>
    </div>
  );
}
