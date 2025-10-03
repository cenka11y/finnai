# SUOAI - Online Eğitim ve Kariyer Platformu

## 🚀 Hızlı Başlangıç (Docker)

### Gereksinimler
- Docker
- Docker Compose

### Başlatma

```bash
# Basit başlatma
./start-docker.sh

# Manuel başlatma
docker-compose up --build -d
```

### API Endpoints

#### 🔐 Kimlik Doğrulama
- `POST /api/auth/register` - Kullanıcı kaydı
- `POST /api/auth/login` - Kullanıcı girişi
- `POST /api/auth/logout` - Kullanıcı çıkışı
- `POST /api/auth/refresh` - Token yenileme
- `POST /api/auth/forgot-password` - Şifre sıfırlama
- `POST /api/auth/reset-password` - Şifre yenileme

#### 👥 Kullanıcı Yönetimi
- `GET /api/users/profile` - Profil görüntüleme
- `PUT /api/users/profile` - Profil güncelleme
- `POST /api/users/upload-avatar` - Avatar yükleme
- `DELETE /api/users/delete-account` - Hesap silme

#### 📚 Kurs Yönetimi
- `GET /api/courses` - Kurs listesi
- `GET /api/courses/:id` - Kurs detayı
- `POST /api/courses` - Kurs oluşturma
- `PUT /api/courses/:id` - Kurs güncelleme
- `DELETE /api/courses/:id` - Kurs silme
- `POST /api/courses/:id/enroll` - Kursa kayıt
- `GET /api/courses/:id/progress` - Kurs ilerlemesi

#### 📄 CV Yönetimi
- `GET /api/cv` - CV listesi
- `POST /api/cv` - CV oluşturma
- `GET /api/cv/:id` - CV detayı
- `PUT /api/cv/:id` - CV güncelleme
- `DELETE /api/cv/:id` - CV silme
- `POST /api/cv/:id/generate-pdf` - PDF oluşturma

#### 🎓 Hizmet Yönetimi
- `GET /api/services` - Hizmet listesi
- `GET /api/services/:id` - Hizmet detayı
- `POST /api/services/:id/request` - Hizmet talebi

#### 👨‍💼 Admin Panel
- `GET /api/admin/dashboard` - Admin paneli
- `GET /api/admin/users` - Kullanıcı yönetimi
- `GET /api/admin/courses` - Kurs yönetimi
- `GET /api/admin/analytics` - Analitik veriler

### 🐳 Docker Komutları

```bash
# Container'ları başlat
docker-compose up -d

# Logları görüntüle
docker-compose logs -f backend

# Container'lara bağlan
docker-compose exec backend sh
docker-compose exec postgres psql -U souai_user -d souai_db

# Veritabanı işlemleri
docker-compose exec backend npx prisma studio
docker-compose exec backend npx prisma db push
docker-compose exec backend npx prisma generate

# Container'ları durdur
docker-compose down

# Volume'ları da sil
docker-compose down -v
```

### 🔧 Geliştirme

```bash
# Backend'e bağlan
docker-compose exec backend sh

# NPM komutları
npm run dev      # Geliştirme modu
npm run build    # Üretim build
npm run test     # Testleri çalıştır
npm run lint     # Kod kontrolü
```

### 📊 Servisler

- **Backend API**: http://localhost:3000
- **PostgreSQL**: localhost:5432
- **Prisma Studio**: http://localhost:5555 (manuel başlatma gerekli)

### 🔒 Güvenlik Özellikleri

- JWT tabanlı kimlik doğrulama
- Bcrypt şifreleme
- Rate limiting
- CORS koruması
- Helmet güvenlik başlıkları
- Input validasyonu
- SQL injection koruması

### 📁 Proje Yapısı

```
backend/
├── src/
│   ├── controllers/     # API kontrolcüleri
│   ├── routes/         # Route tanımları
│   ├── middleware/     # Ara katman fonksiyonları
│   ├── services/       # İş mantığı
│   ├── utils/          # Yardımcı fonksiyonlar
│   ├── types/          # TypeScript tipleri
│   ├── config/         # Konfigürasyon
│   ├── app.ts          # Express uygulama
│   └── server.ts       # Sunucu başlatma
├── prisma/
│   └── schema.prisma   # Veritabanı şeması
├── Dockerfile
├── package.json
└── tsconfig.json
```

### 🐛 Sorun Giderme

```bash
# Container durumunu kontrol et
docker-compose ps

# Backend loglarını incele
docker-compose logs backend

# Veritabanı bağlantısını test et
docker-compose exec postgres psql -U souai_user -d souai_db -c "SELECT 1;"

# Container'ı yeniden başlat
docker-compose restart backend
```

### 🔄 Database Migration

```bash
# Prisma migration oluştur
docker-compose exec backend npx prisma migrate dev --name init

# Database'i güncel şemaya göre güncelle
docker-compose exec backend npx prisma db push

# Prisma client'ı yeniden oluştur
docker-compose exec backend npx prisma generate
```