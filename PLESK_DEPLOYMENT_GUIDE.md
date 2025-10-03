# SUOAI Plesk Deployment Rehberi

## Düzeltilen Sorunlar ✅
1. **Package.json düzeltmeleri**: Tüm dosyalarda "souai" → "suoai" değişimi tamamlandı
2. **Problematik .npmrc kaldırıldı**: Prefix conflict'i çözüldü
3. **Workspace ismi güncellenedi**: Artık doğru "suoai-frontend@1.0.0" görünecek

## Plesk'te Deployment Adımları

### 1. Güncel Dosyaları İndirin
```bash
cd /var/www/vhosts/voon.fi/suoai.voon.fi
git pull origin main
```

### 2. Node Modules'ları Temizleyin
```bash
rm -rf node_modules package-lock.json
rm -rf frontend/node_modules frontend/package-lock.json
```

### 3. Yeni .npmrc Oluşturun (Plesk için)
```bash
# Ana dizinde
echo "prefix=/var/www/vhosts/voon.fi/suoai.voon.fi/.npm-global" > .npmrc

# Frontend dizininde
echo "prefix=/var/www/vhosts/voon.fi/suoai.voon.fi/.npm-global" > frontend/.npmrc
```

### 4. Dependencies'leri Yükleyin
```bash
# Ana dizinde
npm install

# Frontend için
cd frontend
npm install
```

### 5. Build Yapın
```bash
cd frontend
npm run build
```

### 6. Dist Dosyalarını Kontrol Edin
Build başarılıysa `frontend/dist/` klasörü oluşacak. Bu klasördeki dosyalar web sunucunuz tarafından serve edilmeli.

### 7. Plesk Domain Settings
Plesk'te domain ayarlarında:
- Document root: `/var/www/vhosts/voon.fi/suoai.voon.fi/frontend/dist`
- veya symbolic link yapın: `ln -s /var/www/vhosts/voon.fi/suoai.voon.fi/frontend/dist /var/www/vhosts/voon.fi/suoai.voon.fi/httpdocs`

## Hata Giderme

### Build Hatası Alırsanız:
```bash
# Verbose build için
cd frontend
npm run build -- --stats-children

# Veya webpack direkt çalıştırın
npx webpack --mode production --stats-children
```

### Permission Hatası Alırsanız:
```bash
chmod -R 755 /var/www/vhosts/voon.fi/suoai.voon.fi
chown -R [plesk_user]:[plesk_group] /var/www/vhosts/voon.fi/suoai.voon.fi
```

## Test
Build tamamlandıktan sonra https://suoai.voon.fi açılmalı.

### Alternative: Static Build
Eğer hala sorun çıkarsa, basit HTML versiyonu kullanabilirsiniz:
```bash
cp /var/www/vhosts/voon.fi/suoai.voon.fi/frontend/index.html /var/www/vhosts/voon.fi/suoai.voon.fi/httpdocs/
```

## Sonraki Adımlar
1. Build başarılı olduktan sonra backend'i de çalıştırabilirsiniz
2. Database bağlantısını yapılandırın
3. Environment variables'ları (.env) ayarlayın