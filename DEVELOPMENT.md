# 🚀 Локальная разработка Teddy & Friends

## 📋 Предварительные требования

1. **Node.js 20+** и **pnpm** установлены на Windows
2. **VM Debian** с запущенными Docker сервисами
3. **IP адрес VM** доступен с Windows

## 🔧 Настройка окружения

### 1. Настройка VM Debian

```bash
# В VM Debian запустите:
cd /path/to/teddy_project
docker-compose up -d db redis
```

### 2. Настройка Windows

```bash
# Скопируйте env.example в .env
cp env.example .env

# Отредактируйте .env, заменив IP_ADDRESS_VM на реальный IP:
DATABASE_URL=postgresql://postgres:postgres@192.168.1.100:5432/teddy?schema=public
REDIS_URL=redis://192.168.1.100:6379
```

## 🚀 Запуск разработки

### Вариант 1: Автоматический запуск
```bash
pnpm dev:local
```

### Вариант 2: Ручной запуск
```bash
# Терминал 1 - API
pnpm dev:api

# Терминал 2 - Admin
pnpm dev:admin
```

## 🌐 Доступные сервисы

- **NestJS API**: http://localhost:3001
- **Next.js Admin**: http://localhost:3000
- **PostgreSQL**: IP_VM:5432
- **Redis**: IP_VM:6379

## 📁 Структура разработки

```
teddy_project/
├── apps/
│   ├── bot/          # NestJS API (порт 3001)
│   └── admin/        # Next.js Admin (порт 3000)
├── packages/
│   └── shared/       # Общие типы и i18n
├── prisma/           # Схема БД
└── storage/          # PNG файлы
```

## 🔍 Отладка

### Проверка подключения к БД
```bash
pnpm prisma studio
```

### Логи API
```bash
# В терминале с API
```

### Логи Admin
```bash
# В терминале с Admin
```

## 🛠️ Полезные команды

```bash
# Генерация Prisma Client
pnpm prisma generate

# Проверка типов
pnpm typecheck

# Линтинг
pnpm lint

# Сборка
pnpm build
```

## ❗ Устранение проблем

### Ошибка подключения к БД
- Проверьте IP адрес VM
- Убедитесь, что порты 5432 и 6379 открыты
- Проверьте firewall на VM

### Ошибка портов
- Убедитесь, что порты 3000 и 3001 свободны
- Остановите другие сервисы, использующие эти порты
