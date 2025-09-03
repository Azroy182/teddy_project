# Скрипт для локальной разработки Teddy & Friends
# Запуск NestJS API и Next.js Admin локально

Write-Host "🚀 Запуск Teddy & Friends в режиме разработки..." -ForegroundColor Green

# Проверяем, что .env файл существует
if (-not (Test-Path ".env")) {
    Write-Host "❌ Файл .env не найден!" -ForegroundColor Red
    Write-Host "📝 Скопируйте env.example в .env и настройте подключение к VM" -ForegroundColor Yellow
    Write-Host "🔧 DATABASE_URL=postgresql://postgres:postgres@IP_VM:5432/teddy?schema=public" -ForegroundColor Yellow
    Write-Host "🔧 REDIS_URL=redis://IP_VM:6379" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ .env файл найден" -ForegroundColor Green

# Генерируем Prisma Client
Write-Host "🔧 Генерация Prisma Client..." -ForegroundColor Blue
pnpm prisma generate

# Запускаем API и Admin параллельно
Write-Host "🚀 Запуск NestJS API и Next.js Admin..." -ForegroundColor Green
Write-Host "📱 API будет доступен на http://localhost:3001" -ForegroundColor Cyan
Write-Host "🖥️ Admin будет доступен на http://localhost:3000" -ForegroundColor Cyan

# Запускаем в параллельных процессах
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd apps/bot; pnpm start:dev"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd apps/admin; pnpm dev"

Write-Host "✅ Сервисы запущены в отдельных окнах PowerShell" -ForegroundColor Green
Write-Host "💡 Закройте окна PowerShell для остановки сервисов" -ForegroundColor Yellow
