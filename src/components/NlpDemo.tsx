import { useState } from 'react';

export default function NlpDemo() {
  const [text, setText] = useState('Aspirin is used to reduce pain, fever, or inflammation. It is often prescribed for heart attack prevention.');
  const [tfidf, setTfidf] = useState<any>(null);
  const [phrases, setPhrases] = useState<any>(null);

  return (
    <div style={{border:'1px solid #eee', borderRadius:12, padding:16, marginTop:12}}>
      <h3>NLP Demo (TF-IDF & Phrase Extraction)</h3>
      <textarea value={text} onChange={e=>setText(e.target.value)} rows={4} style={{width:'100%',maxWidth:700}}/>
      <div style={{display:'flex',gap:8,marginTop:8}}>
        <button onClick={async()=>{
          const res = await fetch('/nlp/tfidf', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({docs:[text]})});
          setTfidf(await res.json());
        }}>TF-IDF</button>
        <button onClick={async()=>{
          const res = await fetch('/nlp/phrases', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text})});
          setPhrases(await res.json());
        }}>Extract Phrases</button>
      </div>
      {tfidf && <pre style={{background:'#f9f9f9',padding:8,borderRadius:8,maxWidth:700,overflowX:'auto'}}>TF-IDF: {JSON.stringify(tfidf,null,2)}</pre>}
      {phrases && <pre style={{background:'#f9f9f9',padding:8,borderRadius:8,maxWidth:700,overflowX:'auto'}}>Phrases: {JSON.stringify(phrases,null,2)}</pre>}
    </div>
  );
}
