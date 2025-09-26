import sqlite3
import numpy as np
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')

# Load all vectors and texts from the DB
def load_kb():
    conn = sqlite3.connect('kb_vectors.sqlite')
    c = conn.cursor()
    c.execute('SELECT id, source, text, vector FROM kb')
    rows = c.fetchall()
    kb = []
    for row in rows:
        vec = np.frombuffer(row[3], dtype=np.float32)
        kb.append({'id': row[0], 'source': row[1], 'text': row[2], 'vector': vec})
    conn.close()
    return kb

# Find top-k most similar chunks to a query
def search_kb(query, k=3):
    kb = load_kb()
    qvec = model.encode(query)
    sims = [np.dot(qvec, item['vector']) / (np.linalg.norm(qvec) * np.linalg.norm(item['vector'])) for item in kb]
    topk = np.argsort(sims)[-k:][::-1]
    return [kb[i] for i in topk]

if __name__ == "__main__":
    query = input("Enter your question: ")
    results = search_kb(query)
    for i, item in enumerate(results, 1):
        print(f"\nResult {i} (source: {item['source']}):\n{item['text']}")
