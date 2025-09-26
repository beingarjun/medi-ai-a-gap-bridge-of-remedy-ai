import requests
import json

def fetch_cdc_vaccine_info():
    url = "https://www.cdc.gov/vaccines/vpd/vaccines-list.json"
    resp = requests.get(url)
    if resp.status_code == 200:
        return resp.json()
    else:
        return None

def save_cdc(data, filename):
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    # Example: fetch and save CDC vaccine info
    data = fetch_cdc_vaccine_info()
    if data:
        save_cdc(data, 'cdc_vaccines.json')
        print("Saved CDC vaccine info.")
    else:
        print("Failed to fetch CDC data.")
