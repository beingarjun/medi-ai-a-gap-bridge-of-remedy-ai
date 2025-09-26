import { API } from '../api';
export default function Payments({ email }:{ email:string }) {
  return (
    <div style={{display:'flex',gap:8}}>
      <button onClick={async()=>alert(JSON.stringify(await API.payMock('pro')))}>Upgrade (MockPay — Free)</button>
      <button onClick={async()=>{
        // requires STRIPE_SECRET_TEST + priceId set on server; returns url in JSON
        const { url } = await API.payStripe('price_XXXX', email);
        if (url) window.location.href = url; else alert('Stripe not configured');
      }}>Upgrade (Stripe Test)</button>
    </div>
  );
}
