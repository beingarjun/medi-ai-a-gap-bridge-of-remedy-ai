import requests
import json

def fetch_fda_drug(drug_name):
    url = f"https://api.fda.gov/drug/label.json?search=openfda.brand_name:{drug_name}&limit=1"
    resp = requests.get(url)
    if resp.status_code == 200:
        return resp.json()
    else:
        return None

def save_fda(data, filename):
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    # Example: fetch and save FDA label for 'Lipitor'
    data = fetch_fda_drug('Lipitor')
    if data:
        save_fda(data, 'lipitor_fda.json')
        print("Saved FDA label for 'Lipitor'.")
    else:
        print("Failed to fetch FDA data.")
