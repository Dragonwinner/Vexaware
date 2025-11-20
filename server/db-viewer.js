const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database path
const dbPath = path.join(__dirname, 'database', 'newsletter.db');

console.log('🗄️ SQLite Database Viewer for VEX Aware Newsletter');
console.log('═'.repeat(60));
console.log(`Database Location: ${dbPath}`);
console.log('═'.repeat(60));

// Connect to database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error connecting to database:', err.message);
    return;
  }
  console.log('✅ Connected to SQLite database\n');
  
  // Show all tables
  showTables();
});

function showTables() {
  console.log('📊 DATABASE TABLES:');
  console.log('-'.repeat(40));
  
  db.all("SELECT name FROM sqlite_master WHERE type='table'", [], (err, tables) => {
    if (err) {
      console.error('Error getting tables:', err.message);
      return;
    }
    
    tables.forEach((table, index) => {
      console.log(`${index + 1}. ${table.name}`);
    });
    
    console.log();
    
    // Show subscribers table
    showSubscribers();
    
    // Show email logs table
    showEmailLogs();
    
    // Show table schemas
    showTableSchemas();
  });
}

function showSubscribers() {
  console.log('👥 SUBSCRIBERS TABLE:');
  console.log('-'.repeat(40));
  
  // Get count first
  db.get("SELECT COUNT(*) as count FROM subscribers", [], (err, row) => {
    if (err) {
      console.error('Error counting subscribers:', err.message);
      return;
    }
    
    console.log(`Total Subscribers: ${row.count}\n`);
    
    if (row.count > 0) {
      // Show all subscribers
      db.all("SELECT * FROM subscribers ORDER BY created_at DESC", [], (err, subscribers) => {
        if (err) {
          console.error('Error getting subscribers:', err.message);
          return;
        }
        
        subscribers.forEach((subscriber, index) => {
          console.log(`${index + 1}. ${subscriber.email}`);
          console.log(`   Status: ${subscriber.status}`);
          console.log(`   Created: ${new Date(subscriber.created_at).toLocaleString()}`);
          console.log(`   Confirmed: ${subscriber.confirmed_at ? new Date(subscriber.confirmed_at).toLocaleString() : 'Not confirmed'}`);
          console.log(`   Token: ${subscriber.confirmation_token || 'None'}`);
          console.log();
        });
      });
    }
  });
}

function showEmailLogs() {
  console.log('📧 EMAIL LOGS TABLE:');
  console.log('-'.repeat(40));
  
  // Get count first
  db.get("SELECT COUNT(*) as count FROM email_logs", [], (err, row) => {
    if (err) {
      console.error('Error counting email logs:', err.message);
      return;
    }
    
    console.log(`Total Email Logs: ${row.count}\n`);
    
    if (row.count > 0) {
      // Show recent email logs
      db.all("SELECT * FROM email_logs ORDER BY created_at DESC LIMIT 10", [], (err, logs) => {
        if (err) {
          console.error('Error getting email logs:', err.message);
          return;
        }
        
        logs.forEach((log, index) => {
          console.log(`${index + 1}. ${log.email_type} to ${log.recipient}`);
          console.log(`   Status: ${log.status}`);
          console.log(`   Sent: ${new Date(log.created_at).toLocaleString()}`);
          if (log.error_message) {
            console.log(`   Error: ${log.error_message}`);
          }
          console.log();
        });
      });
    }
  });
}

function showTableSchemas() {
  setTimeout(() => {
    console.log('🏗️ TABLE SCHEMAS:');
    console.log('-'.repeat(40));
    
    // Subscribers table schema
    db.all("PRAGMA table_info(subscribers)", [], (err, columns) => {
      if (err) {
        console.error('Error getting subscribers schema:', err.message);
        return;
      }
      
      console.log('SUBSCRIBERS TABLE STRUCTURE:');
      columns.forEach(column => {
        console.log(`  ${column.name}: ${column.type}${column.pk ? ' (PRIMARY KEY)' : ''}${column.notnull ? ' NOT NULL' : ''}${column.dflt_value ? ` DEFAULT ${column.dflt_value}` : ''}`);
      });
      console.log();
      
      // Email logs table schema
      db.all("PRAGMA table_info(email_logs)", [], (err, columns) => {
        if (err) {
          console.error('Error getting email_logs schema:', err.message);
          return;
        }
        
        console.log('EMAIL_LOGS TABLE STRUCTURE:');
        columns.forEach(column => {
          console.log(`  ${column.name}: ${column.type}${column.pk ? ' (PRIMARY KEY)' : ''}${column.notnull ? ' NOT NULL' : ''}${column.dflt_value ? ` DEFAULT ${column.dflt_value}` : ''}`);
        });
        console.log();
        
        // Show statistics
        showStatistics();
      });
    });
  }, 2000);
}

function showStatistics() {
  console.log('📈 DATABASE STATISTICS:');
  console.log('-'.repeat(40));
  
  // Confirmed vs pending subscribers
  db.get("SELECT COUNT(*) as confirmed FROM subscribers WHERE status = 'confirmed'", [], (err, confirmed) => {
    if (err) {
      console.error('Error getting confirmed count:', err.message);
      return;
    }
    
    db.get("SELECT COUNT(*) as pending FROM subscribers WHERE status = 'pending'", [], (err, pending) => {
      if (err) {
        console.error('Error getting pending count:', err.message);
        return;
      }
      
      console.log(`Confirmed Subscribers: ${confirmed.confirmed}`);
      console.log(`Pending Confirmations: ${pending.pending}`);
      
      // Recent activity
      db.get("SELECT COUNT(*) as recent FROM subscribers WHERE created_at > datetime('now', '-7 days')", [], (err, recent) => {
        if (err) {
          console.error('Error getting recent activity:', err.message);
          return;
        }
        
        console.log(`New Subscribers (7 days): ${recent.recent}`);
        
        // Email success rate
        db.get("SELECT COUNT(*) as total, SUM(CASE WHEN status = 'sent' THEN 1 ELSE 0 END) as sent FROM email_logs", [], (err, emails) => {
          if (err) {
            console.error('Error getting email stats:', err.message);
            return;
          }
          
          const successRate = emails.total > 0 ? ((emails.sent / emails.total) * 100).toFixed(1) : 0;
          console.log(`Email Success Rate: ${successRate}% (${emails.sent}/${emails.total})`);
          
          console.log('\n🎯 Database access complete!');
          console.log('═'.repeat(60));
          
          // Close database connection
          db.close((err) => {
            if (err) {
              console.error('Error closing database:', err.message);
            } else {
              console.log('✅ Database connection closed');
            }
          });
        });
      });
    });
  });
}