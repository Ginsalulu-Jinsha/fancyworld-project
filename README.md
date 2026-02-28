# 💕 Fancy World — Girly Experience Review App

A full-stack girl-life experience review platform designed exclusively for girls.
Discover, share, and review everything lovely — dining, shopping, skincare, nails, hair, and every beautiful moment in between.

## ✨ Features

- **New: Categorized Experience Tabs** — Filter stories by Fashion 👗, Nails 💅, Beauty 💄, and Hair 💇.
- **New: USA Shop Data Integration** — Automated fetching of hundreds of real boutique and salon data from Google Places API (USA region).
- **Fancy Experience Grid** — Browse stories with high-quality photos, star ratings, and beautiful hover effects.
- **Post New Stories** — Share your own experiences with location pins on Google Maps.
- **Photo Uploads** — Support for multiple photos per post (up to 6).
- **Interactive Map** — View shop locations on Google Maps integration.
- **Performance Optimized** — Redis caching for fast detail page loading and MD5-based image deduplication.

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Ant Design, Google Maps JavaScript API |
| Backend | Django 4.2, Python 3.13, Requests |
| Database | MongoDB (main data), Redis (cache) |
| API | Google Places API (New: Text Search & Photos) |

## 📁 Project Structure

```
fancyworld-project/
├── server/                  # Django backend
│   ├── app/
│   │   ├── apps.py          # API views (categorized list, add, detail, etc.)
│   │   ├── pymongo.py       # MongoDB connection
│   │   ├── pyredis.py       # Redis cache helpers
│   │   └── urls.py          # App-level routing
│   ├── fetch_shops.py       # New: Google Places API data fetching script
│   ├── settings_dev.py      # Development settings
│   ├── manage.py
│   └── requirement.txt      # Updated with requests
└── web/                     # React frontend
    ├── src/
        ├── Head.js          # Navigation bar
        ├── Body.js          # Categorized experience grid
        ├── Detail.js        # Detailed shop view
        ├── New.js           # Modal for posting new stories
        └── ...
```

## 🚀 Getting Started

### Prerequisites

- Python 3.13+
- Node.js 16+
- MongoDB (running on port 27017)
- Redis (running on port 6379)
- Google Maps/Places API key

### 1. Clone the repository

```bash
git clone https://github.com/Ginsalulu-Jinsha/fancyworld-project.git
cd fancyworld-project
```

### 2. Start the Backend

```bash
cd server
# Install dependencies
pip install -r requirement.txt

# Run the server
DJANGO_SETTINGS_MODULE=server.settings_dev python manage.py runserver
```

### 3. Fetch USA Shop Data (Optional)

To populate your database with real USA shop data from Google:

1. Create a `.env` file in the `server/` directory.
2. Add your API key: `GOOGLE_PLACES_API_KEY=your_key_here`.
3. Run the script:
   ```bash
   cd server
   export PYTHONPATH=.
   python fetch_shops.py
   ```

### 4. Start the Frontend

Create a `.env` in `web/`:
```
REACT_APP_GOOGLE_MAPS_KEY=your_key
```

```bash
cd web
npm install
npm start
```

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/list?category=<cat>` | Get experience posts (supports filtering) |
| POST | `/api/add` | Add a new experience post |
| GET | `/api/detail?id=<id>` | Get post detail |
| POST | `/api/upload` | Upload an image |
| GET | `/api/file?id=<id>` | Retrieve an image |

---

*Made with 💕 by Jinsha — because life should always be fancy.*
