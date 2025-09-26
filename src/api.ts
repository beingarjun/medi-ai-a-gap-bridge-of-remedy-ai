let token = '';
export function setToken(t: string) { token = t; }
const HEADERS = () => ({ 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) });

export const API = {
  signup: (email: string, password: string) =>
    fetch('http://localhost:8787/auth/signup', { method: 'POST', headers: HEADERS(), body: JSON.stringify({ email, password }) }).then(r=>r.json()).then(d=>{ setToken(d.token); return d; }),
  login: (email: string, password: string) =>
    fetch('http://localhost:8787/auth/login', { method: 'POST', headers: HEADERS(), body: JSON.stringify({ email, password }) }).then(r=>r.json()).then(d=>{ setToken(d.token); return d; }),

  otpSend: (phone: string) =>
    fetch('http://localhost:8787/auth/otp/send', { method: 'POST', headers: HEADERS(), body: JSON.stringify({ phone }) }).then(r=>r.json()),
  otpVerify: (code: string) =>
    fetch('http://localhost:8787/auth/otp/verify', { method: 'POST', headers: HEADERS(), body: JSON.stringify({ code }) }).then(r=>r.json()),

  eligibility: (member_id: string) =>
    fetch('http://localhost:8787/insurance/eligibility', { method: 'POST', headers: HEADERS(), body: JSON.stringify({ member_id }) }).then(r=>r.json()),
  copay: (payload: any) =>
    fetch('http://localhost:8787/insurance/copay', { method: 'POST', headers: HEADERS(), body: JSON.stringify(payload) }).then(r=>r.json()),

  adherenceSet: (member_id: string, drug: string, time: string) =>
    fetch('http://localhost:8787/adherence/reminder', { method:'POST', headers: HEADERS(), body: JSON.stringify({ member_id, drug, time }) }).then(r=>r.json()),
  interactions: (drugs: string[]) =>
    fetch('http://localhost:8787/interactions/check', { method:'POST', headers: HEADERS(), body: JSON.stringify({ drugs }) }).then(r=>r.json()),
  priorAuth: (member_id: string, drug: string, diagnosis?: string) =>
    fetch('http://localhost:8787/prior-auth/request', { method:'POST', headers: HEADERS(), body: JSON.stringify({ member_id, drug, diagnosis }) }).then(r=>r.json()),
  clinicalBook: (member_id: string, service: string, date: string) =>
    fetch('http://localhost:8787/clinical/book', { method:'POST', headers: HEADERS(), body: JSON.stringify({ member_id, service, date }) }).then(r=>r.json()),
  faq: (q: string) =>
    fetch('http://localhost:8787/knowledge/faq', { method:'POST', headers: HEADERS(), body: JSON.stringify({ q }) }).then(r=>r.json()),
  auditLog: (action: string, meta: any) =>
    fetch('http://localhost:8787/compliance/log', { method:'POST', headers: HEADERS(), body: JSON.stringify({ action, meta }) }),
  auditExport: () =>
    fetch('http://localhost:8787/compliance/audit/export', { headers: HEADERS() }).then(r=>r.json()),
  gdprErase: () =>
    fetch('http://localhost:8787/compliance/gdpr/delete', { method:'POST', headers: HEADERS() }).then(r=>r.json()),
  roi: (payload: any) =>
    fetch('http://localhost:8787/roi/calculator', { method:'POST', headers: HEADERS(), body: JSON.stringify(payload) }).then(r=>r.json()),
  payMock: (plan = 'pro') =>
    fetch('http://localhost:8787/payments/mock', { method:'POST', headers: HEADERS(), body: JSON.stringify({ plan }) }).then(r=>r.json()),
  payStripe: (priceId: string, customer_email: string) =>
    fetch('http://localhost:8787/payments/checkout', { method:'POST', headers: HEADERS(), body: JSON.stringify({ priceId, customer_email }) }).then(r=>r.json())
};
