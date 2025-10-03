// SOUAI - SQLite Database Utility
// Prisma benzeri basit ORM fonksiyonları

const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const crypto = require('crypto');

// Veritabanı bağlantısı
const dbPath = path.join(__dirname, 'dev.db');
const db = new sqlite3.Database(dbPath);

// Promise wrapper for database operations
function dbRun(query, params = []) {
    return new Promise((resolve, reject) => {
        db.run(query, params, function(err) {
            if (err) reject(err);
            else resolve({ id: this.lastID, changes: this.changes });
        });
    });
}

function dbGet(query, params = []) {
    return new Promise((resolve, reject) => {
        db.get(query, params, (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
}

function dbAll(query, params = []) {
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

// Utility fonksiyonları
function generateId() {
    return crypto.randomBytes(12).toString('hex');
}

// User işlemleri
const User = {
    async create(userData) {
        const id = generateId();
        const { email, hashedPassword } = userData;
        
        await dbRun(
            'INSERT INTO users (id, email, hashedPassword) VALUES (?, ?, ?)',
            [id, email, hashedPassword]
        );
        
        return await User.findById(id);
    },

    async findById(id) {
        return await dbGet('SELECT * FROM users WHERE id = ?', [id]);
    },

    async findByEmail(email) {
        return await dbGet('SELECT * FROM users WHERE email = ?', [email]);
    },

    async createProfile(userId, profileData) {
        const id = generateId();
        const {
            firstName = null,
            lastName = null,
            preferredLanguage = 'fi',
            city = null,
            countryOfOrigin = null,
            currentCEFRLevel = null
        } = profileData;

        await dbRun(
            `INSERT INTO user_profiles 
             (id, userId, firstName, lastName, preferredLanguage, city, countryOfOrigin, currentCEFRLevel) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [id, userId, firstName, lastName, preferredLanguage, city, countryOfOrigin, currentCEFRLevel]
        );

        return await dbGet('SELECT * FROM user_profiles WHERE id = ?', [id]);
    },

    async getProfile(userId) {
        return await dbGet('SELECT * FROM user_profiles WHERE userId = ?', [userId]);
    },

    async updateProfile(userId, profileData) {
        const setClause = Object.keys(profileData).map(key => `${key} = ?`).join(', ');
        const values = Object.values(profileData);
        values.push(userId);

        await dbRun(
            `UPDATE user_profiles SET ${setClause}, updatedAt = CURRENT_TIMESTAMP WHERE userId = ?`,
            values
        );

        return await User.getProfile(userId);
    }
};

// Course işlemleri
const Course = {
    async findAll() {
        const courses = await dbAll('SELECT * FROM courses WHERE isActive = 1 ORDER BY cefrLevel');
        return courses.map(course => ({
            ...course,
            title: JSON.parse(course.title),
            description: JSON.parse(course.description)
        }));
    },

    async findById(id) {
        const course = await dbGet('SELECT * FROM courses WHERE id = ? AND isActive = 1', [id]);
        if (course) {
            course.title = JSON.parse(course.title);
            course.description = JSON.parse(course.description);
        }
        return course;
    },

    async enroll(userId, courseId) {
        const id = generateId();
        
        // Önceden kayıt olup olmadığını kontrol et
        const existing = await dbGet(
            'SELECT * FROM course_enrollments WHERE userId = ? AND courseId = ?',
            [userId, courseId]
        );

        if (existing) {
            throw new Error('User already enrolled in this course');
        }

        await dbRun(
            'INSERT INTO course_enrollments (id, userId, courseId) VALUES (?, ?, ?)',
            [id, userId, courseId]
        );

        return { id, userId, courseId, status: 'active', progress: 0 };
    },

    async getUserEnrollments(userId) {
        const query = `
            SELECT ce.*, c.title, c.description, c.cefrLevel, c.estimatedDuration
            FROM course_enrollments ce
            JOIN courses c ON ce.courseId = c.id
            WHERE ce.userId = ?
            ORDER BY ce.enrolledAt DESC
        `;
        
        const enrollments = await dbAll(query, [userId]);
        return enrollments.map(enrollment => ({
            ...enrollment,
            title: JSON.parse(enrollment.title),
            description: JSON.parse(enrollment.description)
        }));
    }
};

// Service işlemleri
const Service = {
    async findAll(filters = {}) {
        let query = 'SELECT * FROM services WHERE isVerified = 1';
        let params = [];

        if (filters.city) {
            query += ' AND city = ?';
            params.push(filters.city);
        }

        if (filters.category) {
            query += ' AND category = ?';
            params.push(filters.category);
        }

        query += ' ORDER BY name';

        const services = await dbAll(query, params);
        return services.map(service => ({
            ...service,
            name: JSON.parse(service.name),
            description: JSON.parse(service.description),
            contactInfo: service.contactInfo ? JSON.parse(service.contactInfo) : null,
            openingHours: service.openingHours ? JSON.parse(service.openingHours) : null,
            eligibility: service.eligibility ? JSON.parse(service.eligibility) : null,
            requirements: service.requirements ? JSON.parse(service.requirements) : null,
            instructions: service.instructions ? JSON.parse(service.instructions) : null
        }));
    },

    async findById(id) {
        const service = await dbGet('SELECT * FROM services WHERE id = ?', [id]);
        if (service) {
            service.name = JSON.parse(service.name);
            service.description = JSON.parse(service.description);
            service.contactInfo = service.contactInfo ? JSON.parse(service.contactInfo) : null;
            service.openingHours = service.openingHours ? JSON.parse(service.openingHours) : null;
            service.eligibility = service.eligibility ? JSON.parse(service.eligibility) : null;
            service.requirements = service.requirements ? JSON.parse(service.requirements) : null;
            service.instructions = service.instructions ? JSON.parse(service.instructions) : null;
        }
        return service;
    }
};

// Session işlemleri
const Session = {
    async create(userId, sessionToken, expires) {
        const id = generateId();
        await dbRun(
            'INSERT INTO sessions (id, sessionToken, userId, expires) VALUES (?, ?, ?, ?)',
            [id, sessionToken, userId, expires]
        );
        return { id, sessionToken, userId, expires };
    },

    async findByToken(sessionToken) {
        return await dbGet('SELECT * FROM sessions WHERE sessionToken = ?', [sessionToken]);
    },

    async deleteByToken(sessionToken) {
        await dbRun('DELETE FROM sessions WHERE sessionToken = ?', [sessionToken]);
    }
};

// Database bağlantısını kapat
function closeDatabase() {
    return new Promise((resolve) => {
        db.close(resolve);
    });
}

module.exports = {
    User,
    Course,
    Service,
    Session,
    closeDatabase,
    // Direct database access
    dbRun,
    dbGet,
    dbAll
};