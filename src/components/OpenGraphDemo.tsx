import { useState } from 'react';

export default function OpenGraphDemo() {
  const [wiki, setWiki] = useState<any>(null);
  const [pubmed, setPubmed] = useState<any>(null);
  const [recalls, setRecalls] = useState<any>(null);
  const [vaccines, setVaccines] = useState<any>(null);
  const [competitors, setCompetitors] = useState<any>(null);
  const [graph, setGraph] = useState<any>(null);
  const [query, setQuery] = useState('atorvastatin');

  return (
    <div style={{border:'1px solid #eee', borderRadius:12, padding:16, marginTop:12}}>
      <h3>Open Knowledge Graph Demo (Free Sources)</h3>
      <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:8}}>
        <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Drug/Disease" style={{width:160}}/>
        <button onClick={async()=>setWiki(await (await fetch(`/open-graph/wikipedia/${encodeURIComponent(query)}`)).json())}>Wikipedia</button>
        <button onClick={async()=>setPubmed(await (await fetch(`/open-graph/pubmed/${encodeURIComponent(query)}`)).json())}>PubMed</button>
        <button onClick={async()=>setRecalls(await (await fetch('/open-graph/fda/recalls')).json())}>FDA Recalls</button>
        <button onClick={async()=>setVaccines(await (await fetch('/open-graph/cdc/vaccines')).json())}>CDC Vaccines</button>
        <button onClick={async()=>setCompetitors(await (await fetch('/open-graph/competitors')).json())}>Competitors</button>
        <button onClick={async()=>setGraph(await (await fetch('/open-graph/graph')).json())}>Show Graph</button>
      </div>
      {wiki && <pre style={{background:'#f9f9f9',padding:8,borderRadius:8,maxWidth:700,overflowX:'auto'}}>Wikipedia: {JSON.stringify(wiki,null,2)}</pre>}
      {pubmed && <pre style={{background:'#f9f9f9',padding:8,borderRadius:8,maxWidth:700,overflowX:'auto'}}>PubMed: {JSON.stringify(pubmed,null,2)}</pre>}
      {recalls && <pre style={{background:'#f9f9f9',padding:8,borderRadius:8,maxWidth:700,overflowX:'auto'}}>FDA Recalls: {JSON.stringify(recalls,null,2)}</pre>}
      {vaccines && <pre style={{background:'#f9f9f9',padding:8,borderRadius:8,maxWidth:700,overflowX:'auto'}}>CDC Vaccines: {JSON.stringify(vaccines,null,2)}</pre>}
      {competitors && <pre style={{background:'#f9f9f9',padding:8,borderRadius:8,maxWidth:700,overflowX:'auto'}}>Competitors: {JSON.stringify(competitors,null,2)}</pre>}
      {graph && <pre style={{background:'#f9f9f9',padding:8,borderRadius:8,maxWidth:700,overflowX:'auto'}}>Graph: {JSON.stringify(graph,null,2)}</pre>}
    </div>
  );
}
