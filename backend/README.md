# 3D Printing Blog Backend

Self-evolving blog backend with AI-powered content automation, analytics, and self-improvement capabilities.

## Features

### 🤖 Automated Content Collection
- **Web Scraping**: Automatically collects articles from 5+ industry sources
- **AI Translation**: Translates English content to Japanese using OpenAI
- **Auto-summarization**: Generates Japanese excerpts and full articles
- **SEO Optimization**: Auto-generates tags and meta descriptions

### 📊 Analytics & Insights
- **Real-time Tracking**: Page views, user sessions, bounce rates
- **Popular Content**: Identifies top-performing articles
- **User Journeys**: Tracks navigation patterns
- **Weekly Reports**: Automated analytics summaries

### 🧠 Self-Improvement System
- **AI-Powered Suggestions**: Generates improvement recommendations
- **Content Gap Analysis**: Identifies underrepresented topics
- **UX Optimization**: Suggests UI/UX improvements based on data
- **Auto-Implementation**: Applies low-risk changes automatically

### 📧 Email Notifications
- **New Articles**: Daily digest of auto-collected content
- **Weekly Reports**: Traffic and performance summaries
- **System Alerts**: Error notifications and health warnings
- **Improvement Suggestions**: Actionable recommendations

## API Endpoints

### Articles
- `GET /api/articles` - List articles (with filtering, pagination)
- `GET /api/articles/:slug` - Get single article
- `GET /api/articles/meta/categories` - Get categories
- `GET /api/articles/meta/popular` - Get popular articles
- `GET /api/articles/meta/latest` - Get latest articles
- `POST /api/articles/:slug/like` - Like an article

### Analytics
- `GET /api/analytics/summary` - Analytics summary
- `GET /api/analytics/realtime` - Real-time stats
- `GET /api/analytics/daily` - Daily statistics
- `GET /api/analytics/top-pages` - Top pages
- `GET /api/analytics/user-journeys` - User journey data
- `GET /api/analytics/report/weekly` - Weekly report
- `POST /api/track` - Track page view

### Admin
- `GET /api/admin/system` - System status
- `GET /api/admin/sources` - Content sources
- `PUT /api/admin/sources/:id` - Update source
- `GET /api/admin/suggestions` - Improvement suggestions
- `PUT /api/admin/suggestions/:id/implement` - Mark suggestion implemented
- `GET /api/admin/notifications` - Notifications
- `PUT /api/admin/notifications/:id/read` - Mark notification read

### Automation
- `POST /api/automation/scrape` - Trigger content scraping
- `POST /api/automation/analyze` - Generate improvement suggestions
- `GET /api/automation/health` - Check system health
- `GET /api/automation/status` - Get automation status

## Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your configuration
# - Set ADMIN_API_KEY
# - Add OpenAI API key (optional)
# - Configure SMTP (optional)

# Start server
npm start

# Or start in development mode with auto-reload
npm run dev
```

## Configuration

### Required
- `PORT` - Server port (default: 3001)
- `ADMIN_API_KEY` - API key for admin endpoints

### Optional (for full functionality)
- `OPENAI_API_KEY` - For AI translation and content generation
- `SMTP_*` - For email notifications
- `OWNER_EMAIL` - Where to send notifications

### Automation Settings
- `ENABLE_AUTO_SCRAPE` - Daily automatic scraping (default: true)
- `ENABLE_WEEKLY_ANALYSIS` - Weekly analytics reports (default: true)
- `ENABLE_HEALTH_CHECK` - Hourly health monitoring (default: true)

## Scheduled Tasks

| Task | Schedule | Description |
|------|----------|-------------|
| Content Scraping | Daily at 6:00 AM | Scrapes all active sources |
| Weekly Analysis | Sundays at 9:00 AM | Generates reports and suggestions |
| Health Check | Every hour | Monitors system health |

## Data Storage

Uses JSON file-based database stored in `/data/`:
- `articles.json` - All articles
- `analytics.json` - Analytics data
- `sources.json` - Content sources configuration
- `suggestions.json` - Improvement suggestions
- `notifications.json` - System notifications
- `system.json` - System state

## Content Sources

Pre-configured sources:
1. **3D Printing Industry** (daily)
2. **3Dnatives** (daily)
3. **MONOist** (daily)
4. **TCT Magazine** (weekly)
5. **Sculpteo Blog** (weekly)

## Development

```bash
# Run with auto-reload
npm run dev

# Manual scrape
npm run scrape

# Generate analysis
npm run analyze

# Send test notification
npm run notify
```

## Production Deployment

1. Set up environment variables
2. Configure reverse proxy (nginx)
3. Set up process manager (PM2)
4. Configure log rotation

Example PM2 config:
```json
{
  "apps": [{
    "name": "blog-backend",
    "script": "./src/index.js",
    "instances": 1,
    "autorestart": true,
    "watch": false,
    "max_memory_restart": "500M",
    "env": {
      "NODE_ENV": "production"
    }
  }]
}
```

## License

MIT
