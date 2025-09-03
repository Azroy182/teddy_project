# Скрипт для быстрой настройки .env с IP VM
param(
    [Parameter(Mandatory=$true)]
    [string]$VmIP
)

Write-Host "🔧 Настройка .env для подключения к VM..." -ForegroundColor Green
Write-Host "📡 IP VM: $VmIP" -ForegroundColor Cyan

# Проверяем, что env.example существует
if (-not (Test-Path "env.example")) {
    Write-Host "❌ Файл env.example не найден!" -ForegroundColor Red
    exit 1
}

# Читаем env.example
$envContent = Get-Content "env.example" -Raw

# Заменяем плейсхолдеры на реальные значения
$envContent = $envContent -replace "postgresql://postgres:postgres@db:5432/teddy", "postgresql://postgres:postgres@${VmIP}:5432/teddy"
$envContent = $envContent -replace "redis://redis:6379", "redis://${VmIP}:6379"

# Записываем в .env
$envContent | Out-File -FilePath ".env" -Encoding UTF8

Write-Host "✅ Файл .env создан!" -ForegroundColor Green
Write-Host "🔍 Проверьте содержимое:" -ForegroundColor Yellow
Write-Host "   DATABASE_URL=postgresql://postgres:postgres@${VmIP}:5432/teddy?schema=public" -ForegroundColor Gray
Write-Host "   REDIS_URL=redis://${VmIP}:6379" -ForegroundColor Gray

Write-Host ""
Write-Host "🚀 Следующие шаги:" -ForegroundColor Blue
Write-Host "   1. pnpm prisma generate" -ForegroundColor Gray
Write-Host "   2. pnpm prisma migrate deploy" -ForegroundColor Gray
Write-Host "   3. pnpm prisma db seed" -ForegroundColor Gray
Write-Host "   4. pnpm dev:local" -ForegroundColor Gray
