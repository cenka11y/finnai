-- SOUAI Uygulaması için veritabanı başlangıç script'i
-- PostgreSQL 15 ile uyumlu

-- Veritabanının oluştuğunu kontrol et
SELECT 'Database souai_db created successfully!' as message;

-- Temel extension'ları etkinleştir
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Log tablosu
COMMENT ON DATABASE souai_db IS 'SOUAI - Online Eğitim ve Kariyer Platformu Veritabanı';

SELECT 'Database initialization completed!' as message;