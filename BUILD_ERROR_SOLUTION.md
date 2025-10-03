# SUOAI Build Error Çözümü

## Sorun
Webpack build sırasında template dosyası bulunamıyor:
```
Module not found: Error: Can't resolve '/var/www/vhosts/voon.fi/suoai.voon.fi/frontend/public/index.html'
```

## ✅ Hızlı Çözüm 1: Simple Build (Önerilen)

Plesk'te build yapmak yerine static HTML dosyasını kullanın:

```bash
# Frontend dizinindeki index.html'i httpdocs'a kopyalayın
cd /var/www/vhosts/voon.fi/suoai.voon.fi
cp frontend/index.html httpdocs/index.html

# Gerekli asset'leri de kopyalayın
cp -r frontend/public/* httpdocs/
```

## ✅ Çözüm 2: Webpack Config Düzeltmesi

1. **Webpack config dosyasını düzeltin:**
```bash
cd /var/www/vhosts/voon.fi/suoai.voon.fi/frontend
```

2. **webpack.config.js'yi düzenleyin:**
```javascript
// Template path'ini tam path olarak belirtin
new HtmlWebpackPlugin({
  template: path.resolve(__dirname, 'public/index.html'),
  filename: 'index.html'
})
```

3. **Veya daha basit çözüm:**
```javascript
// Template'i index.html olarak değiştirin
new HtmlWebpackPlugin({
  template: './index.html', // public/index.html yerine
  filename: 'index.html'
})
```

## ✅ Çözüm 3: Template Dosyasını Taşıma

```bash
cd /var/www/vhosts/voon.fi/suoai.voon.fi/frontend

# Template dosyasını doğru yere taşı
mv public/index.html ./template.html

# Webpack config'de template path'ini güncelle
# template: './template.html'
```

## 🚀 En Hızlı Çözüm (Test İçin)

Sadece test etmek istiyorsanız:

```bash
cd /var/www/vhosts/voon.fi/suoai.voon.fi

# Frontend dizinindeki hazır HTML'i kullanın
cp frontend/index.html httpdocs/
cp -r frontend/public/icons httpdocs/
cp -r frontend/public/images httpdocs/

# Şimdi https://suoai.voon.fi çalışmalı
```

## 🔍 Debugging

Eğer hala sorun çıkarsa:

```bash
# Template dosyasının varlığını kontrol edin
ls -la /var/www/vhosts/voon.fi/suoai.voon.fi/frontend/public/index.html

# Webpack verbose output
cd frontend
npx webpack --mode production --stats verbose

# Working directory kontrolü
pwd
ls -la public/
```

## ⚡ Önerilen Aksiyon

Test için **Çözüm 1**'i kullanın (static file copy). Site çalıştıktan sonra webpack build'i düzeltebilirsiniz.