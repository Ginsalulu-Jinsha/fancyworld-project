# Restaurant Review App

A full-stack restaurant review platform where users can discover, share, and review restaurants with interactive maps and photo uploads.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Ant Design, Google Maps |
| Backend | Django 4.2, Python 3.13 |
| Database | MongoDB (main data), Redis (cache) |

## Features

- Browse restaurant listings with ratings and photos
- Post new restaurant stories with location pin on Google Maps
- Upload up to 6 photos per restaurant
- View restaurant detail page with image carousel and map
- Leave comments and star ratings
- Redis caching for fast detail page loading

## Project Structure

```
restaurant-project/
├── server/                  # Django backend
│   ├── app/
│   │   ├── apps.py          # API views (list, add, detail, comments, upload)
│   │   ├── pymongo.py       # MongoDB connection
│   │   ├── pyredis.py       # Redis connection & cache helpers
│   │   └── urls.py          # App-level URL routing
│   ├── server/
│   │   ├── settings_dev.py  # Development settings
│   │   ├── settings_prd.py  # Production settings
│   │   └── urls.py          # Root URL routing (/api/)
│   ├── manage.py
│   └── requirement.txt
└── web/                     # React frontend
    ├── public/
    └── src/
        ├── App.js
        ├── Map.js           # Google Maps component
        ├── New.js           # Add new restaurant modal
        ├── Detail.js        # Restaurant detail page
        └── About.js
```

## Prerequisites

- Python 3.13+
- Node.js 16+
- MongoDB (running on port 27017)
- Redis (running on port 6379)
- Google Maps JavaScript API key

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/restaurant-project.git
cd restaurant-project
```

### 2. Start the Backend

```bash
cd server

# Install Python dependencies
pip install -r requirement.txt

# Run the development server
DJANGO_SETTINGS_MODULE=server.settings_dev python manage.py runserver
```

The backend will be available at `http://localhost:8000`

### 3. Configure Frontend Environment

Create a `.env` file in the `web/` directory:

```bash
cd web
echo "REACT_APP_GOOGLE_MAPS_KEY=your_google_maps_api_key" > .env
```

> Get a Google Maps API key from [Google Cloud Console](https://console.cloud.google.com) with **Maps JavaScript API** enabled.

### 4. Start the Frontend

```bash
cd web
npm install
npm start
```

The frontend will be available at `http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/list` | Get all restaurants |
| POST | `/api/add` | Add a new restaurant |
| GET | `/api/detail?id=<id>` | Get restaurant detail |
| GET | `/api/comments?campID=<id>` | Get comments for a restaurant |
| POST | `/api/comment/add` | Add a comment |
| POST | `/api/upload` | Upload an image |
| GET | `/api/file?id=<id>` | Retrieve an image |

## Database

MongoDB database name: `yelpcamp`

Collections:
- `camps` — restaurant entries
- `comments` — user reviews
- `images` — uploaded photos (stored as binary)

## Notes

- The `.env` file is excluded from version control to protect your API keys.
- Redis caching is enabled by default for restaurant detail pages (1 hour TTL).
- Image deduplication is handled via MD5 hash before storing to MongoDB.
