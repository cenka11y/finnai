// Database bağlantısını test et
const { User, Course, Service } = require('./database');

async function testDatabase() {
    try {
        console.log('🔍 Database bağlantısı test ediliyor...');
        
        // Courses listesini al
        console.log('\n📚 Kursları test ediliyor...');
        const courses = await Course.findAll();
        console.log(`✅ ${courses.length} kurs bulundu:`);
        courses.forEach(course => {
            console.log(`  - ${course.title.fi} (${course.cefrLevel})`);
        });

        // Services listesini al
        console.log('\n🏢 Servisleri test ediliyor...');
        const services = await Service.findAll();
        console.log(`✅ ${services.length} servis bulundu:`);
        services.forEach(service => {
            console.log(`  - ${service.name.fi} (${service.category})`);
        });

        console.log('\n✅ Database test başarılı!');
        
    } catch (error) {
        console.error('❌ Database test hatası:', error);
    }
}

testDatabase().then(() => {
    console.log('Test tamamlandı.');
    process.exit(0);
});