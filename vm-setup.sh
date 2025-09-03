#!/bin/bash
# Скрипт для настройки VM Debian

echo "🚀 Настройка Teddy & Friends VM..."

# Проверяем, установлен ли Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker не установлен!"
    echo "📝 Установите Docker: https://docs.docker.com/engine/install/debian/"
    exit 1
fi

# Проверяем, установлен ли Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose не установлен!"
    echo "📝 Установите Docker Compose: sudo apt install docker-compose"
    exit 1
fi

echo "✅ Docker и Docker Compose установлены"

# Создаем необходимые папки
mkdir -p storage/cards storage/vouchers

# Запускаем сервисы
echo "🐳 Запуск PostgreSQL и Redis..."
docker-compose -f docker-compose.vm.yml up -d

# Ждем запуска сервисов
echo "⏳ Ожидание запуска сервисов..."
sleep 10

# Проверяем статус
echo "📊 Статус сервисов:"
docker-compose -f docker-compose.vm.yml ps

# Показываем IP адрес
echo ""
echo "🌐 IP адрес VM:"
hostname -I | awk '{print $1}'

echo ""
echo "✅ VM настроена!"
echo "📝 Используйте этот IP в .env файле на Windows:"
echo "   DATABASE_URL=postgresql://postgres:postgres@$(hostname -I | awk '{print $1}'):5432/teddy?schema=public"
echo "   REDIS_URL=redis://$(hostname -I | awk '{print $1}'):6379"
echo ""
echo "🔍 Adminer (веб-интерфейс БД): http://$(hostname -I | awk '{print $1}'):8081"
echo "   Сервер: db, Пользователь: postgres, Пароль: postgres, База: teddy"
