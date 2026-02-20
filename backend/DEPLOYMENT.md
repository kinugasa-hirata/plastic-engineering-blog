# Backend Deployment Guide

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env with your settings

# 3. Seed database
node src/scripts/seed.js

# 4. Start server
npm start
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Server port (default: 3001) |
| `ADMIN_API_KEY` | Yes | API key for admin endpoints |
| `OPENAI_API_KEY` | No | For AI translation (optional) |
| `SMTP_HOST` | No | Email server host |
| `SMTP_USER` | No | Email username |
| `SMTP_PASS` | No | Email password |
| `OWNER_EMAIL` | No | Notification recipient |
| `ENABLE_AUTO_SCRAPE` | No | Enable daily scraping (default: true) |
| `ENABLE_WEEKLY_ANALYSIS` | No | Enable weekly reports (default: true) |
| `ENABLE_HEALTH_CHECK` | No | Enable health monitoring (default: true) |

## API Documentation

### Health Check
```bash
curl http://localhost:3001/api/health
```

### Get Articles
```bash
# List all articles
curl http://localhost:3001/api/articles

# With filters
curl "http://localhost:3001/api/articles?category=3Dプリンター技術&limit=5"

# Search
curl "http://localhost:3001/api/articles?search=Bambu+Lab"

# Get single article
curl http://localhost:3001/api/articles/formnext-2025-3d-printing-trends
```

### Analytics
```bash
# Summary
curl http://localhost:3001/api/analytics/summary

# Real-time stats
curl http://localhost:3001/api/analytics/realtime

# Daily stats
curl http://localhost:3001/api/analytics/daily?days=7
```

### Admin Operations
```bash
# Trigger manual scrape (requires API key)
curl -X POST http://localhost:3001/api/automation/scrape \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "your-admin-api-key"}'

# Generate suggestions
curl -X POST http://localhost:3001/api/automation/analyze \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "your-admin-api-key"}'

# Get system status
curl http://localhost:3001/api/admin/system \
  -H "x-api-key: your-admin-api-key"
```

## Production Deployment

### Using PM2

```bash
# Install PM2
npm install -g pm2

# Create ecosystem file
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'blog-backend',
    script: './src/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    log_file: './logs/combined.log',
    out_file: './logs/out.log',
    error_file: './logs/error.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss'
  }]
};
EOF

# Start with PM2
pm2 start ecosystem.config.js

# Save PM2 config
pm2 save
pm2 startup
```

### Using Docker

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3001

CMD ["node", "src/index.js"]
```

```bash
# Build and run
docker build -t blog-backend .
docker run -d \
  -p 3001:3001 \
  -v $(pwd)/data:/app/data \
  -v $(pwd)/logs:/app/logs \
  --env-file .env \
  --name blog-backend \
  blog-backend
```

### Using systemd

```bash
# Create service file
sudo tee /etc/systemd/system/blog-backend.service << 'EOF'
[Unit]
Description=3D Printing Blog Backend
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/blog-backend
ExecStart=/usr/bin/node src/index.js
Restart=on-failure
RestartSec=10
Environment=NODE_ENV=production
EnvironmentFile=/var/www/blog-backend/.env

[Install]
WantedBy=multi-user.target
EOF

# Enable and start
sudo systemctl enable blog-backend
sudo systemctl start blog-backend
sudo systemctl status blog-backend
```

## Nginx Reverse Proxy

```nginx
server {
    listen 80;
    server_name api.yourblog.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## SSL with Let's Encrypt

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d api.yourblog.com

# Auto-renewal test
sudo certbot renew --dry-run
```

## Monitoring

### Log Rotation

```bash
# Install logrotate config
sudo tee /etc/logrotate.d/blog-backend << 'EOF'
/var/www/blog-backend/logs/*.log {
    daily
    rotate 14
    compress
    delaycompress
    missingok
    notifempty
    create 0644 www-data www-data
    sharedscripts
    postrotate
        /bin/kill -HUP $(cat /var/run/blog-backend.pid 2>/dev/null) 2>/dev/null || true
    endscript
}
EOF
```

### Health Monitoring Script

```bash
#!/bin/bash
# health-check.sh

HEALTH=$(curl -s http://localhost:3001/api/health | grep -o '"status":"healthy"')

if [ -z "$HEALTH" ]; then
    echo "Backend is unhealthy!" | mail -s "Blog Backend Alert" admin@yourblog.com
    systemctl restart blog-backend
fi
```

Add to crontab:
```bash
*/5 * * * * /var/www/blog-backend/health-check.sh
```

## Backup

```bash
#!/bin/bash
# backup.sh

BACKUP_DIR="/backups/blog-backend"
DATE=$(date +%Y%m%d_%H%M%S)

# Backup data
tar -czf "$BACKUP_DIR/data_$DATE.tar.gz" /var/www/blog-backend/data/

# Keep only last 30 backups
ls -t $BACKUP_DIR/data_*.tar.gz | tail -n +31 | xargs -r rm
```

## Troubleshooting

### Check logs
```bash
tail -f logs/combined.log
tail -f logs/error.log
```

### Test API
```bash
curl -v http://localhost:3001/api/health
```

### Database reset
```bash
rm -rf data/*.json
node src/scripts/seed.js
```

## Frontend Integration

Update frontend API calls to point to backend:

```javascript
// src/config.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const config = {
  apiUrl: API_BASE_URL,
  // ...
};
```

## Scheduled Tasks Reference

| Task | Cron | Description |
|------|------|-------------|
| Content Scraping | `0 6 * * *` | Daily at 6:00 AM |
| Weekly Analysis | `0 9 * * 0` | Sundays at 9:00 AM |
| Health Check | `0 * * * *` | Every hour |
