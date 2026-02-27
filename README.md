# 💕 Fancy World — Girly Experience Review App

A full-stack girl-life experience review platform designed exclusively for girls.
Discover, share, and review everything lovely — dining, shopping, skincare, nails, hair, and every beautiful moment in between.

## ✨ Features

- Browse fancy experience stories with ratings and photos
- Post new stories with location pin on Google Maps
- Upload up to 6 photos per post
- View experience detail page with image carousel and map
- Leave comments and star ratings
- Redis caching for fast detail page loading
- Image deduplication via MD5 hash

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Ant Design, Google Maps |
| Backend | Django 4.2, Python 3.13 |
| Database | MongoDB (main data), Redis (cache) |

## 📁 Project Structure

```
fancyworld-project/
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
        ├── App.js           # Root component & routing
        ├── Head.js          # Navigation bar
        ├── Body.js          # Home page — experience card grid
        ├── Detail.js        # Experience detail page
        ├── New.js           # Post new experience modal
        ├── Map.js           # Google Maps component
        ├── About.js         # About page
        └── Foot.js          # Footer
```

## 🚀 Getting Started

### Prerequisites

- Python 3.13+
- Node.js 16+
- MongoDB (running on port 27017)
- Redis (running on port 6379)
- Google Maps JavaScript API key

### 1. Clone the repository

```bash
git clone https://github.com/Ginsalulu-Jinsha/fancyworld-project.git
cd fancyworld-project
```

### 2. Start the Backend

```bash
cd server

# Install Python dependencies
pip install -r requirement.txt

# Run the development server
DJANGO_SETTINGS_MODULE=server.settings_dev python manage.py runserver
```

Backend runs at `http://localhost:8000`

### 3. Configure Frontend Environment

Create a `.env` file inside the `web/` directory:

```
REACT_APP_GOOGLE_MAPS_KEY=your_google_maps_api_key
```

> Get a Google Maps API key from [Google Cloud Console](https://console.cloud.google.com) with **Maps JavaScript API** enabled.

### 4. Start the Frontend

```bash
cd web
npm install
npm start
```

Frontend runs at `http://localhost:3000`

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/list` | Get all experience posts |
| POST | `/api/add` | Add a new experience post |
| GET | `/api/detail?id=<id>` | Get post detail |
| GET | `/api/comments?campID=<id>` | Get comments for a post |
| POST | `/api/comment/add` | Add a comment |
| POST | `/api/upload` | Upload an image |
| GET | `/api/file?id=<id>` | Retrieve an image |

## 🗄 Database

MongoDB collections:
- `camps` — experience posts
- `comments` — user reviews
- `images` — uploaded photos (stored as binary)

## 🔒 Notes

- The `.env` file is excluded from version control to protect your API keys.
- Redis caching is enabled by default for detail pages (1 hour TTL).
- Image deduplication is handled via MD5 hash before storing to MongoDB.

---

*Made with 💕 by Jinsha — because life should always be fancy.*
