# Teddy & Friends - WhatsApp Bot

WhatsApp Business API bot for Teddy & Friends playground with loyalty system, admin panel, and voucher management.

## Features

- 🤖 **WhatsApp Bot**: Automated customer service with loyalty tracking
- 🎯 **Loyalty System**: 5 visits = 1 hour free voucher
- 📱 **Admin Panel**: Staff management, visit tracking, voucher redemption
- 🖼️ **Image Generation**: PNG loyalty cards and vouchers
- 🌍 **i18n**: English and Portuguese support
- 🔐 **Security**: JWT auth, rate limiting, webhook validation
- 🐳 **Docker**: Complete containerized setup

## Tech Stack

- **Backend**: NestJS + Fastify, Prisma ORM, BullMQ
- **Frontend**: Next.js 14, Tailwind CSS, shadcn/ui
- **Database**: PostgreSQL 16
- **Cache**: Redis 7
- **Queue**: BullMQ for background jobs
- **Images**: node-canvas for PNG generation

## Quick Start

### Prerequisites

- Docker & Docker Compose
- Node.js 20+
- pnpm

### 1. Setup Environment

```bash
# Copy environment file
cp env.example .env

# Edit .env with your settings
# At minimum, change ADMIN_SEED_PASSWORD
```

### 2. Start Services

```bash
# Start all services
make up

# Run migrations and seed data
make migrate
make seed
```

### 3. Access Applications

- **Admin Panel**: http://localhost:8080/admin
- **API**: http://localhost:8080/api
- **Database**: localhost:5432 (postgres/postgres)

### 4. Login to Admin

- Email: `admin@teddy.pt`
- Password: (from ADMIN_SEED_PASSWORD in .env)

## Development

```bash
# Development mode with live reload
make dev

# View logs
make logs

# Run tests
make test

# Lint code
make lint

# Type check
make typecheck
```

## E2E Demo Flow

1. **Create Test Family**
   - Go to Admin Panel → Families
   - Add new family with phone number

2. **Generate Visit Code**
   - Select family → "Generate Code"
   - Get one-time code (valid 10 minutes)

3. **Confirm Visit**
   - Use code in "Confirm Visit" section
   - See loyalty progress (1/5)

4. **Complete Loyalty**
   - Repeat until 5/5 visits
   - System generates voucher automatically

5. **Redeem Voucher**
   - Go to Vouchers page
   - Scan QR or enter code
   - Mark as redeemed

## Project Structure

```
teddy-bot/
├── apps/
│   ├── bot/          # NestJS API
│   ├── admin/        # Next.js Admin Panel
│   └── worker/       # BullMQ Worker
├── packages/
│   └── shared/       # Shared types & i18n
├── prisma/           # Database schema
├── infra/            # Docker & scripts
└── storage/          # Generated images
```

## API Endpoints

- `POST /api/webhooks/whatsapp` - WhatsApp webhook
- `POST /api/visits/issue-code` - Generate visit code
- `POST /api/visits/confirm` - Confirm visit
- `GET /api/loyalty/card/:id.png` - Loyalty card image
- `GET /api/vouchers/:id.png` - Voucher image
- `GET /api/menu` - Menu items

## Environment Variables

See `env.example` for all available variables. Key ones:

- `DATABASE_URL` - PostgreSQL connection
- `REDIS_URL` - Redis connection
- `JWT_SECRET` - JWT signing secret
- `WABA_*` - WhatsApp Business API settings

## Contributing

1. Follow Conventional Commits
2. Run tests before committing
3. Use TypeScript strict mode
4. Follow ESLint/Prettier rules

## License

Private - Teddy & Friends
