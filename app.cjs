// app.cjs — köprü: backend'i başlatır
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

// Gerekli env örnekleri (Plesk'te gerçeklerini tanımla)
process.env.PORT = process.env.PORT || '3000'; // Passenger/Node için port
// process.env.DATABASE_URL ||= 'postgresql://user:pass@host:5432/db'
// process.env.JWT_SECRET   ||= 'super-secret'

try {
  // Backend build çıktısını başlat
  require('./backend/dist/server.js');
} catch (err) {
  console.error('SUOAI start error:', err);
  process.exit(1);
}
