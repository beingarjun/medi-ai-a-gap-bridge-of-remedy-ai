import requests
import xml.etree.ElementTree as ET
import json

def fetch_pubmed(query, retmax=5):
    # ESearch: get IDs
    esearch_url = f"https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term={query}&retmax={retmax}&retmode=json"
    ids = requests.get(esearch_url).json()['esearchresult']['idlist']
    # ESummary: get details
    esummary_url = f"https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id={','.join(ids)}&retmode=json"
    summaries = requests.get(esummary_url).json()['result']
    # Remove 'uids' key
    summaries.pop('uids', None)
    return summaries

def save_pubmed(data, filename):
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    # Example: fetch and save PubMed articles for 'pharmacy'
    articles = fetch_pubmed('pharmacy')
    save_pubmed(articles, 'pharmacy_pubmed.json')
    print("Saved PubMed articles for 'pharmacy'.")
