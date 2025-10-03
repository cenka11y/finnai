#!/bin/bash

# SOUAI Backend Docker Başlatma Script'i

echo "🚀 SOUAI Backend Docker ile başlatılıyor..."

# Docker ve Docker Compose kontrol
if ! command -v docker &> /dev/null; then
    echo "❌ Docker kurulu değil. Lütfen Docker'ı kurun."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose kurulu değil. Lütfen Docker Compose'u kurun."
    exit 1
fi

# Önceki container'ları temizle
echo "🧹 Önceki container'lar temizleniyor..."
docker-compose down

# Volume'ları temizle (isteğe bağlı)
read -p "Veritabanı verilerini temizlemek istiyor musunuz? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🗑️ Volume'lar temizleniyor..."
    docker-compose down -v
fi

# .env dosyasını kontrol et
if [ ! -f "backend/.env" ]; then
    echo "📋 .env dosyası oluşturuluyor..."
    cp backend/.env.example backend/.env
fi

# Container'ları başlat
echo "🐳 Docker container'ları başlatılıyor..."
docker-compose up --build -d

# Durumu kontrol et
echo "📊 Container durumu:"
docker-compose ps

echo ""
echo "✅ SOUAI Backend başarıyla başlatıldı!"
echo "📡 API: http://localhost:3000"
echo "🗄️ Database: localhost:5432"
echo ""
echo "📋 Komutlar:"
echo "  - Logları görmek için: docker-compose logs -f"
echo "  - Durdurmak için: docker-compose down"
echo "  - Prisma Studio: docker-compose exec backend npx prisma studio"

# API sağlığını kontrol et
echo "🔍 API sağlık kontrolü (30 saniye bekleniyor)..."
sleep 30
if curl -f http://localhost:3000/health > /dev/null 2>&1; then
    echo "✅ API çalışıyor!"
else
    echo "⚠️ API henüz hazır değil. Logları kontrol edin: docker-compose logs backend"
fi