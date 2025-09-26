from langchain.embeddings import HuggingFaceInferenceAPIEmbeddings
from langchain.vectorstores import Chroma
from langchain.schema import Document
import os
import json

# Set your HuggingFace API key (get one free at https://huggingface.co/settings/tokens)
HF_API_KEY = os.getenv('HF_API_KEY') or 'YOUR_HF_API_KEY'

# Load all local knowledge base chunks
kb_dir = '.'
docs = []
for fname in os.listdir(kb_dir):
    if fname.endswith('.json'):
        with open(fname, 'r', encoding='utf-8') as f:
            data = json.load(f)
            # Wikipedia
            if 'extract' in data:
                docs.append(Document(page_content=data['extract'], metadata={"source": fname}))
            # PubMed
            elif 'uid' in data or isinstance(data, dict) and any('title' in v for v in data.values() if isinstance(v, dict)):
                for v in data.values():
                    if isinstance(v, dict) and 'title' in v and 'summary' in v:
                        docs.append(Document(page_content=v['title'] + '. ' + v['summary'], metadata={"source": fname}))
            # FDA
            elif 'results' in data:
                for r in data['results']:
                    if 'description' in r:
                        docs.append(Document(page_content=r['description'][0], metadata={"source": fname}))
            # CDC
            elif 'vaccines' in data:
                for v in data['vaccines']:
                    if 'name' in v and 'description' in v:
                        docs.append(Document(page_content=v['name'] + '. ' + v['description'], metadata={"source": fname}))

# Set up embeddings and ChromaDB vector store
embeddings = HuggingFaceInferenceAPIEmbeddings(
    api_key=HF_API_KEY,
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)
db = Chroma.from_documents(docs, embeddings)

# Query function
def query_rag(question, k=3):
    results = db.similarity_search(question, k=k)
    return results

if __name__ == "__main__":
    q = input("Enter your question: ")
    results = query_rag(q)
    for i, doc in enumerate(results, 1):
        print(f"\nResult {i} (source: {doc.metadata['source']}):\n{doc.page_content}")
