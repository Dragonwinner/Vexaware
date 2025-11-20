const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, 'newsletter.db');

class Database {
  constructor() {
    this.db = null;
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database(DB_PATH, (err) => {
        if (err) {
          console.error('Error opening database:', err);
          reject(err);
        } else {
          console.log('Connected to SQLite database');
          resolve();
        }
      });
    });
  }

  async initTables() {
    const createSubscribersTable = `
      CREATE TABLE IF NOT EXISTS subscribers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        confirmed BOOLEAN DEFAULT 0,
        confirmation_token TEXT,
        unsubscribe_token TEXT UNIQUE,
        ip_address TEXT,
        user_agent TEXT,
        source TEXT DEFAULT 'website',
        tags TEXT,
        active BOOLEAN DEFAULT 1
      )
    `;

    const createEmailLogsTable = `
      CREATE TABLE IF NOT EXISTS email_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        subscriber_id INTEGER,
        email_type TEXT NOT NULL,
        sent_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        success BOOLEAN DEFAULT 1,
        error_message TEXT,
        FOREIGN KEY (subscriber_id) REFERENCES subscribers (id)
      )
    `;

    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.run(createSubscribersTable, (err) => {
          if (err) reject(err);
        });
        
        this.db.run(createEmailLogsTable, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    });
  }

  // Subscriber methods
  async addSubscriber(email, ipAddress, userAgent, confirmationToken, unsubscribeToken) {
    const query = `
      INSERT INTO subscribers (email, ip_address, user_agent, confirmation_token, unsubscribe_token)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    return new Promise((resolve, reject) => {
      this.db.run(query, [email, ipAddress, userAgent, confirmationToken, unsubscribeToken], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, email });
        }
      });
    });
  }

  async getSubscriber(email) {
    const query = 'SELECT * FROM subscribers WHERE email = ? AND active = 1';
    
    return new Promise((resolve, reject) => {
      this.db.get(query, [email], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  async getAllSubscribers(limit = 100, offset = 0) {
    const query = `
      SELECT id, email, subscribed_at, confirmed, source, tags, active 
      FROM subscribers 
      WHERE active = 1 
      ORDER BY subscribed_at DESC 
      LIMIT ? OFFSET ?
    `;
    
    return new Promise((resolve, reject) => {
      this.db.all(query, [limit, offset], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  async confirmSubscriber(token) {
    const query = 'UPDATE subscribers SET confirmed = 1 WHERE confirmation_token = ?';
    
    return new Promise((resolve, reject) => {
      this.db.run(query, [token], function(err) {
        if (err) reject(err);
        else resolve(this.changes > 0);
      });
    });
  }

  async unsubscribe(token) {
    const query = 'UPDATE subscribers SET active = 0 WHERE unsubscribe_token = ?';
    
    return new Promise((resolve, reject) => {
      this.db.run(query, [token], function(err) {
        if (err) reject(err);
        else resolve(this.changes > 0);
      });
    });
  }

  // Email log methods
  async logEmail(subscriberId, emailType, success, errorMessage = null) {
    const query = `
      INSERT INTO email_logs (subscriber_id, email_type, success, error_message)
      VALUES (?, ?, ?, ?)
    `;
    
    return new Promise((resolve, reject) => {
      this.db.run(query, [subscriberId, emailType, success, errorMessage], function(err) {
        if (err) reject(err);
        else resolve({ id: this.lastID });
      });
    });
  }

  async getStats() {
    const queries = {
      totalSubscribers: 'SELECT COUNT(*) as count FROM subscribers WHERE active = 1',
      confirmedSubscribers: 'SELECT COUNT(*) as count FROM subscribers WHERE active = 1 AND confirmed = 1',
      recentSubscribers: 'SELECT COUNT(*) as count FROM subscribers WHERE active = 1 AND subscribed_at > datetime("now", "-7 days")',
      emailsSent: 'SELECT COUNT(*) as count FROM email_logs WHERE sent_at > datetime("now", "-30 days")'
    };

    const stats = {};
    
    for (const [key, query] of Object.entries(queries)) {
      stats[key] = await new Promise((resolve, reject) => {
        this.db.get(query, [], (err, row) => {
          if (err) reject(err);
          else resolve(row.count);
        });
      });
    }

    return stats;
  }

  close() {
    if (this.db) {
      this.db.close((err) => {
        if (err) console.error('Error closing database:', err);
        else console.log('Database connection closed');
      });
    }
  }
}

const database = new Database();

async function initDatabase() {
  await database.connect();
  await database.initTables();
  return database;
}

module.exports = { database, initDatabase };