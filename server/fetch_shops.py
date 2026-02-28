import os
import django
import time
import requests

# Initialize Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings_dev')
django.setup()

from app.pymongo import MongoDB
from django.conf import settings

# ==========================================
# IMPORTANT: REPLACE WITH YOUR GOOGLE API KEY
# ==========================================
API_KEY = 'AIzaSyC5JwOOOGxwT-qBp8w1dY20_3Uyrm_3K1Y' 
BASE_URL = "https://maps.googleapis.com/maps/api/place/textsearch/json"

def fetch_places(query, target_count, api_key):
    results = []
    next_page_token = None
    
    while len(results) < target_count:
        params = {
            'query': query,
            'key': api_key,
            'language': 'en', # Changed to English for USA shops
            'region': 'us'     # Target USA
        }
        if next_page_token:
            params['pagetoken'] = next_page_token
            time.sleep(2)
        
        try:
            response = requests.get(BASE_URL, params=params).json()
        except Exception as e:
            print(f"Request failed: {e}")
            break
        
        if response.get('status') != 'OK':
            print(f"Error fetching {query}: {response.get('status')}")
            break
            
        current_results = response.get('results', [])
        results.extend(current_results)
        print(f"Fetched {len(results)} results for {query}...")
        
        next_page_token = response.get('next_page_token')
        if not next_page_token:
            break
            
    return results[:target_count]

def save_to_db(data, category):
    if not data:
        return
    
    formatted_data = []
    for item in data:
        # Check if Google provided a photo
        photos = item.get('photos', [])
        if photos:
            # Construct a direct URL for the Google Place Photo
            photo_ref = photos[0].get('photo_reference')
            img_url = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference={photo_ref}&key={API_KEY}"
        else:
            # Fallback to a high-quality fashion/beauty placeholder if no photo exists
            placeholders = {
                "women_clothing": "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400",
                "nail_salon": "https://images.unsplash.com/photo-1604654894610-df490668f807?w=400",
                "beauty_store": "https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?w=400",
                "hair_salon": "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400"
            }
            img_url = placeholders.get(category, "https://via.placeholder.com/400x300?text=Shop")

        camp = {
            "user": "System",
            "title": item.get('name', 'Unknown Shop'),
            "stars": int(item.get('rating', 5)),
            "desc": item.get('formatted_address', 'No description available.'),
            "lat": item.get('geometry', {}).get('location', {}).get('lat', 0),
            "lng": item.get('geometry', {}).get('location', {}).get('lng', 0),
            "address": item.get('formatted_address', ''),
            "comments": item.get('user_ratings_total', 0),
            "time": int(time.time()),
            "category": category,
            "imgs": [img_url] # Now storing a URL
        }
        formatted_data.append(camp)
    
    collection = MongoDB['camps']
    # Clear existing data for these categories to refresh with USA-only data
    collection.delete_many({"category": category})
    
    if formatted_data:
        result = collection.insert_many(formatted_data)
        print(f"Successfully saved {len(result.inserted_ids)} records for {category} (USA only) into 'camps' collection")

if __name__ == "__main__":
    tasks = [
        {"query": "women's boutique in USA", "count": 200, "cat": "women_clothing"},
        {"query": "nail salon in USA", "count": 100, "cat": "nail_salon"},
        {"query": "cosmetics store in USA", "count": 100, "cat": "beauty_store"},
        {"query": "hair salon in USA", "count": 100, "cat": "hair_salon"},
    ]
    
    for task in tasks:
        print(f"Starting task: {task['query']}")
        data = fetch_places(task['query'], task['count'], API_KEY)
        save_to_db(data, task['cat'])
