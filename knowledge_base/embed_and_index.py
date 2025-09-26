import os
import json
from sentence_transformers import SentenceTransformer
import numpy as np
import sqlite3

# Load or download a free embedding model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Helper: flatten and collect all text chunks from JSON files
def collect_text_chunks():
    chunks = []
    for fname in os.listdir('.'):
        if fname.endswith('.json'):
            with open(fname, 'r', encoding='utf-8') as f:
                data = json.load(f)
                # Wikipedia
                if 'extract' in data:
                    chunks.append({'source': fname, 'text': data['extract']})
                # PubMed
                elif 'uid' in data or isinstance(data, dict) and any('title' in v for v in data.values() if isinstance(v, dict)):
                    for v in data.values():
                        if isinstance(v, dict) and 'title' in v and 'summary' in v:
                            chunks.append({'source': fname, 'text': v['title'] + '. ' + v['summary']})
                # FDA
                elif 'results' in data:
                    for r in data['results']:
                        if 'description' in r:
                            chunks.append({'source': fname, 'text': r['description'][0]})
                # CDC
                elif 'vaccines' in data:
                    for v in data['vaccines']:
                        if 'name' in v and 'description' in v:
                            chunks.append({'source': fname, 'text': v['name'] + '. ' + v['description']})
    return chunks

# Create SQLite DB for vector search
def create_db():
    conn = sqlite3.connect('kb_vectors.sqlite')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS kb (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        source TEXT,
        text TEXT,
        vector BLOB
    )''')
    conn.commit()
    return conn

# Embed and store all chunks
def embed_and_store():
    chunks = collect_text_chunks()
    conn = create_db()
    c = conn.cursor()
    for chunk in chunks:
        vec = model.encode(chunk['text'])
        c.execute('INSERT INTO kb (source, text, vector) VALUES (?, ?, ?)',
                  (chunk['source'], chunk['text'], vec.tobytes()))
    conn.commit()
    conn.close()
    print(f"Embedded and stored {len(chunks)} chunks.")

if __name__ == "__main__":
    embed_and_store()
