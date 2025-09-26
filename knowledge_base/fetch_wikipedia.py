import requests
import json

def fetch_wikipedia_page(title):
    url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{title}"
    resp = requests.get(url)
    if resp.status_code == 200:
        return resp.json()
    else:
        return None

def save_page(data, filename):
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    # Example: fetch and save the summary for 'Pharmacy'
    page = fetch_wikipedia_page('Pharmacy')
    if page:
        save_page(page, 'pharmacy_wikipedia.json')
        print("Saved Wikipedia summary for 'Pharmacy'.")
    else:
        print("Failed to fetch Wikipedia page.")
