# 🖥️ Настройка VM Debian для Teddy & Friends

## 📋 Требования

- **Debian/Ubuntu** с Docker и Docker Compose
- **Открытые порты**: 5432 (PostgreSQL), 6379 (Redis), 8081 (Adminer)

## 🚀 Быстрая настройка

### 1. В VM Debian:

```bash
# Скопируйте проект в VM
git clone <repository_url>
cd teddy_project

# Дайте права на выполнение скрипта
chmod +x vm-setup.sh

# Запустите настройку
./vm-setup.sh
```

### 2. В Windows:

```bash
# Замените IP_ADDRESS на реальный IP VM
pnpm setup:env IP_ADDRESS

# Пример:
# pnpm setup:env YOUR_VM_IP
```

### 3. Проверьте подключение:

```bash
# Генерируем Prisma Client
pnpm prisma generate

# Создаем таблицы в БД
pnpm db:migrate

# Заполняем тестовыми данными
pnpm db:seed

# Запускаем разработку
pnpm dev:local
```

## 🛠️ Управление VM

### Запуск сервисов:
```bash
docker-compose -f docker-compose.vm.yml up -d
```

### Остановка сервисов:
```bash
docker-compose -f docker-compose.vm.yml down
```

### Логи:
```bash
docker-compose -f docker-compose.vm.yml logs -f
```

### Очистка данных:
```bash
docker-compose -f docker-compose.vm.yml down -v
```

## 🔍 Полезные инструменты

- **Adminer** (веб-интерфейс БД): `http://VM_IP:8081`
  - Сервер: `db`
  - Пользователь: `postgres` 
  - Пароль: `postgres`
  - База данных: `teddy`

- **Prisma Studio**: `pnpm db:studio` (запускается на Windows)

## ❗ Устранение проблем

### Порты заняты:
```bash
sudo netstat -tlnp | grep :5432
sudo netstat -tlnp | grep :6379
```

### Проблемы с Docker:
```bash
sudo systemctl status docker
sudo systemctl start docker
```

### Проблемы с подключением:
```bash
# Проверьте firewall
sudo ufw status
sudo ufw allow 5432
sudo ufw allow 6379
sudo ufw allow 8081
```
