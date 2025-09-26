from fastapi import FastAPI, Query
from pydantic import BaseModel
from typing import List
from rag_pipeline import query_rag

app = FastAPI()

class QueryRequest(BaseModel):
    question: str
    k: int = 3

class QueryResult(BaseModel):
    source: str
    text: str

@app.post("/rag/query", response_model=List[QueryResult])
def rag_query(req: QueryRequest):
    results = query_rag(req.question, k=req.k)
    return [{"source": doc.metadata["source"], "text": doc.page_content} for doc in results]

# To run: uvicorn rag_api:app --reload
