# Donate Your Blood

A full-stack blood donation management platform that connects blood donors with recipients. Built with Django, React, and PostgreSQL.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Django 6 + Django REST Framework |
| Frontend | React 18 + TypeScript + Tailwind CSS |
| Database | PostgreSQL (SQLite for development) |
| Auth | JWT (SimpleJWT) |
| Build | Vite |
| Deployment | Docker + Nginx + Gunicorn |

## Features

- **User Authentication** — Register, login, logout, password change with JWT tokens
- **Donor Management** — Register as donor, toggle availability, search/filter donors by blood type, city, and availability
- **Blood Requests** — Create, view, edit, and delete blood requests with urgency levels (normal, urgent, critical)
- **Donor Matching** — 3-tier matching algorithm that finds compatible donors (same city first, then same blood type anywhere, then compatible types)
- **Campaigns** — Organize and browse blood donation campaigns
- **Email Notifications** — Automated emails for registration, donor matches, and match responses
- **Admin Panel** — Dashboard with stats, user management, and content moderation
- **Role-Based Access** — Admin, donor, and regular user roles
- **Responsive Design** — Mobile-friendly UI with Tailwind CSS

## Project Structure

```
├── backend/
│   ├── apps/
│   │   ├── accounts/        # User model, auth, permissions
│   │   ├── donors/          # Donor search and filtering
│   │   ├── announcements/   # Blood request CRUD
│   │   ├── campaigns/       # Campaign CRUD
│   │   ├── matching/        # Donor matching algorithm
│   │   └── notifications/   # Email service and templates
│   ├── config/
│   │   └── settings/        # Split settings (base, dev, prod)
│   ├── requirements/
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── api/             # Axios API client modules
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Route page components
│   │   ├── store/           # Zustand auth store
│   │   ├── types/           # TypeScript interfaces
│   │   └── router/          # React Router config
│   ├── nginx.conf
│   └── Dockerfile
└── docker-compose.yml
```

## Getting Started

### Prerequisites

- Python 3.12+
- Node.js 22+
- PostgreSQL 16+ (optional — SQLite is used in development)

### Backend Setup

```bash
cd backend
python -m venv venv

# Windows
source venv/Scripts/activate
# macOS/Linux
source venv/bin/activate

pip install -r requirements/development.txt
cp .env.example .env
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

The API will be available at `http://localhost:8000`.

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

### Docker (Production)

```bash
docker-compose up --build
```

This starts PostgreSQL, Django (Gunicorn), and the React app (Nginx) — accessible at `http://localhost`.

## API Endpoints

| Endpoint | Methods | Description |
|----------|---------|-------------|
| `/api/v1/auth/register/` | POST | Create account |
| `/api/v1/auth/login/` | POST | Get JWT tokens |
| `/api/v1/auth/logout/` | POST | Blacklist refresh token |
| `/api/v1/auth/token/refresh/` | POST | Refresh access token |
| `/api/v1/users/me/` | GET, PATCH | Current user profile |
| `/api/v1/donors/` | GET | List/search donors |
| `/api/v1/donors/toggle-availability/` | POST | Toggle donor status |
| `/api/v1/donors/stats/` | GET | Donor statistics |
| `/api/v1/blood-requests/` | GET, POST | List/create blood requests |
| `/api/v1/blood-requests/{id}/` | GET, PATCH, DELETE | Blood request detail |
| `/api/v1/blood-requests/my/` | GET | User's own requests |
| `/api/v1/campaigns/` | GET, POST | List/create campaigns |
| `/api/v1/campaigns/{id}/` | GET, PATCH, DELETE | Campaign detail |
| `/api/v1/campaigns/upcoming/` | GET | Upcoming campaigns |
| `/api/v1/matches/` | GET | Donor's match requests |
| `/api/v1/matches/{id}/accept/` | POST | Accept a match |
| `/api/v1/matches/{id}/decline/` | POST | Decline a match |
| `/api/v1/matches/find-donors/{id}/` | POST | Trigger matching |

## Environment Variables

See `backend/.env.example` for the full list. Key variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `DEBUG` | Debug mode | `True` |
| `DJANGO_SECRET_KEY` | Django secret key | — |
| `POSTGRES_DB` | Database name | `donate_your_blood` |
| `POSTGRES_USER` | Database user | `postgres` |
| `POSTGRES_PASSWORD` | Database password | `postgres` |
| `EMAIL_BACKEND` | Email backend | Console (dev) |

## Blood Type Matching

The matching algorithm uses a 3-tier approach:

1. **Tier 1** — Exact blood type + same city + available donors
2. **Tier 2** — Exact blood type + any city + available donors
3. **Tier 3** — Compatible blood type donors (based on biological compatibility)

Each matched donor receives an email notification and can accept or decline through the dashboard.

## License

This project is for educational and non-commercial use.
