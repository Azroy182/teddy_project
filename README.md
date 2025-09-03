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

# �� **ПОДРОБНАЯ ИНСТРУКЦИЯ ПО ЗАПУСКУ ПРОЕКТА TEDDY & FRIENDS**

## �� **БЫСТРЫЙ СТАРТ (3 терминала)**

### **Терминал 1: База данных и Redis**
```bash
# Подключиться к VM
ssh admin1@192.168.1.115
su -

# Запустить инфраструктуру
cd ~/teddy_project
docker compose up -d db redis

# Проверить статус
docker compose ps
```

### **Терминал 2: NestJS API (порт 3001)**
```bash
# Подключиться к VM
ssh admin1@192.168.1.115
su -

# Запустить API
cd ~/teddy_project/apps/bot
pnpm start:dev

# Должно появиться: "Application is running on: http://localhost:3001"
```

### **Терминал 3: Next.js Admin Panel (порт 3000)**
```bash
# Подключиться к VM
ssh admin1@192.168.1.115
su -

# Создать .env.local для Admin
cd ~/teddy_project/apps/admin
cat > .env.local << 'EOF'
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=Teddy & Friends Admin
EOF

# Запустить Admin
pnpm dev

# Должно появиться: "Ready - started server on 0.0.0.0:3000"
```

---

## �� **ПОЛНАЯ ИНСТРУКЦИЯ**

### **1. Подготовка VM**
```bash
# Подключение
ssh admin1@192.168.1.115
su -

# Проверить Docker
docker --version
docker compose --version

# Проверить Node.js
node --version
pnpm --version
```

### **2. Запуск инфраструктуры**
```bash
cd ~/teddy_project

# Запустить базу и Redis
docker compose up -d db redis

# Проверить статус
docker compose ps

# Проверить логи
docker compose logs db
docker compose logs redis
```

### **3. Запуск API**
```bash
cd ~/teddy_project/apps/bot

# Проверить зависимости
pnpm install

# Сгенерировать Prisma клиент
pnpm prisma generate

# Запустить в режиме разработки
pnpm start:dev
```

### **4. Запуск Admin Panel**
```bash
cd ~/teddy_project/apps/admin

# Проверить зависимости
pnpm install

# Создать конфигурацию
cat > .env.local << 'EOF'
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=Teddy & Friends Admin
EOF

# Запустить в режиме разработки
pnpm dev
```

---

## �� **ТЕСТИРОВАНИЕ**

### **Проверка API**
```bash
# Health check
curl http://localhost:3001/api/healthz

# Логин админа
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@teddy.pt","password":"change_me"}'

# Скопировать токен из ответа и использовать:
TOKEN="YOUR_JWT_TOKEN_HERE"

# Тест защищенного endpoint
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3001/api/families
```

### **Проверка Admin Panel**
- Открыть браузер: `http://192.168.1.115:3000`
- Логин: `admin@teddy.pt`
- Пароль: `change_me`

---

## �� **ОСТАНОВКА**

### **Остановка всех сервисов**
```bash
# В терминале с API: Ctrl+C
# В терминале с Admin: Ctrl+C

# Остановить Docker контейнеры
cd ~/teddy_project
docker compose down
```

---

## �� **ДИАГНОСТИКА ПРОБЛЕМ**

### **API не отвечает**
```bash
# Проверить процесс
ps aux | grep "pnpm start:dev"

# Проверить порт
netstat -tlnp | grep 3001

# Проверить логи
cd ~/teddy_project/apps/bot
tail -f logs/app.log
```

### **Admin не подключается к API**
```bash
# Проверить .env.local
cat ~/teddy_project/apps/admin/.env.local

# Проверить доступность API
curl http://localhost:3001/api/healthz
```

### **База данных недоступна**
```bash
# Проверить Docker контейнеры
docker compose ps

# Проверить логи базы
docker compose logs db

# Перезапустить базу
docker compose restart db
```

---

## �� **СТРУКТУРА ПРОЕКТА**
```
teddy_project/
├── apps/
│   ├── bot/          # NestJS API (порт 3001)
│   └── admin/        # Next.js Admin (порт 3000)
├── packages/
│   └── shared/       # Общие типы и утилиты
├── prisma/           # Схема базы данных
├── docker-compose.yml # Инфраструктура
└── package.json      # Корневой package.json
```

---

## 🎯 **ЧЕКЛИСТ ЗАПУСКА**

- [ ] VM запущена и доступна по SSH
- [ ] Docker и Docker Compose установлены
- [ ] Node.js и pnpm установлены
- [ ] База данных и Redis запущены
- [ ] API запущен на порту 3001
- [ ] Admin Panel запущен на порту 3000
- [ ] .env.local создан для Admin
- [ ] API отвечает на health check
- [ ] Admin Panel открывается в браузере

---

## �� **ПОЛЕЗНЫЕ КОМАНДЫ**

```bash
# Очистка Docker
docker system prune -a --volumes -f

# Перезапуск всех сервисов
docker compose restart

# Просмотр логов
docker compose logs -f

# Проверка места на диске
df -h
```

**Удачи с проектом! 🚀**