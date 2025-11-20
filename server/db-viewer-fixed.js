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
  
  // Show all tables and data
  showDatabaseContent();
});

function showDatabaseContent() {
  console.log('📊 DATABASE TABLES AND CONTENT:');
  console.log('-'.repeat(40));
  
  // Get all tables
  db.all("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'", [], (err, tables) => {
    if (err) {
      console.error('Error getting tables:', err.message);
      return;
    }
    
    console.log('Tables found:');
    tables.forEach((table, index) => {
      console.log(`${index + 1}. ${table.name}`);
    });
    console.log();
    
    // Show subscribers table
    showSubscribersTable();
  });
}

function showSubscribersTable() {
  console.log('👥 SUBSCRIBERS TABLE:');
  console.log('-'.repeat(40));
  
  // Get subscribers count
  db.get("SELECT COUNT(*) as count FROM subscribers", [], (err, row) => {
    if (err) {
      console.error('Error counting subscribers:', err.message);
      return;
    }
    
    console.log(`Total Subscribers: ${row.count}\n`);
    
    if (row.count > 0) {
      // Show all subscribers with correct column names
      db.all("SELECT * FROM subscribers ORDER BY subscribed_at DESC", [], (err, subscribers) => {
        if (err) {
          console.error('Error getting subscribers:', err.message);
        } else {
          subscribers.forEach((subscriber, index) => {
            console.log(`${index + 1}. Email: ${subscriber.email}`);
            console.log(`   ID: ${subscriber.id}`);
            console.log(`   Confirmed: ${subscriber.confirmed ? 'Yes' : 'No'}`);
            console.log(`   Subscribed: ${subscriber.subscribed_at}`);
            console.log(`   Active: ${subscriber.active ? 'Yes' : 'No'}`);
            console.log(`   Confirmation Token: ${subscriber.confirmation_token || 'None'}`);
            console.log(`   Source: ${subscriber.source || 'website'}`);
            console.log(`   IP: ${subscriber.ip_address || 'N/A'}`);
            if (subscriber.tags) {
              console.log(`   Tags: ${subscriber.tags}`);
            }
            console.log();
          });
        }
        
        // Show email logs
        showEmailLogsTable();
      });
    } else {
      // Show email logs even if no subscribers
      showEmailLogsTable();
    }
  });
}

function showEmailLogsTable() {
  console.log('📧 EMAIL LOGS TABLE:');
  console.log('-'.repeat(40));
  
  // Get email logs count
  db.get("SELECT COUNT(*) as count FROM email_logs", [], (err, row) => {
    if (err) {
      console.error('Error counting email logs:', err.message);
      return;
    }
    
    console.log(`Total Email Logs: ${row.count}\n`);
    
    if (row.count > 0) {
      // Show recent email logs
      db.all("SELECT * FROM email_logs ORDER BY sent_at DESC LIMIT 20", [], (err, logs) => {
        if (err) {
          console.error('Error getting email logs:', err.message);
        } else {
          logs.forEach((log, index) => {
            console.log(`${index + 1}. Type: ${log.email_type}`);
            console.log(`   Subscriber ID: ${log.subscriber_id || 'N/A'}`);
            console.log(`   Sent: ${log.sent_at}`);
            console.log(`   Success: ${log.success ? 'Yes' : 'No'}`);
            if (log.error_message) {
              console.log(`   Error: ${log.error_message}`);
            }
            console.log();
          });
        }
        
        // Show statistics
        showCorrectStatistics();
      });
    } else {
      // Show statistics even if no email logs
      showCorrectStatistics();
    }
  });
}

function showCorrectStatistics() {
  console.log('📈 DATABASE STATISTICS:');
  console.log('-'.repeat(40));
  
  // Confirmed vs unconfirmed subscribers
  db.get("SELECT COUNT(*) as confirmed FROM subscribers WHERE confirmed = 1", [], (err, confirmed) => {
    if (err) {
      console.error('Error getting confirmed count:', err.message);
      return;
    }
    
    db.get("SELECT COUNT(*) as unconfirmed FROM subscribers WHERE confirmed = 0", [], (err, unconfirmed) => {
      if (err) {
        console.error('Error getting unconfirmed count:', err.message);
        return;
      }
      
      db.get("SELECT COUNT(*) as active FROM subscribers WHERE active = 1", [], (err, active) => {
        if (err) {
          console.error('Error getting active count:', err.message);
          return;
        }
        
        console.log(`Confirmed Subscribers: ${confirmed.confirmed}`);
        console.log(`Unconfirmed Subscribers: ${unconfirmed.unconfirmed}`);
        console.log(`Active Subscribers: ${active.active}`);
        
        // Recent activity (last 7 days)
        db.get("SELECT COUNT(*) as recent FROM subscribers WHERE datetime(subscribed_at) > datetime('now', '-7 days')", [], (err, recent) => {
          if (err) {
            console.error('Error getting recent activity:', err.message);
            return;
          }
          
          console.log(`New Subscribers (7 days): ${recent.recent}`);
          
          // Email success rate
          db.get("SELECT COUNT(*) as total, SUM(success) as successful FROM email_logs", [], (err, emails) => {
            if (err) {
              console.error('Error getting email stats:', err.message);
              return;
            }
            
            const successRate = emails.total > 0 ? ((emails.successful / emails.total) * 100).toFixed(1) : 0;
            console.log(`Email Success Rate: ${successRate}% (${emails.successful}/${emails.total})`);
            
            console.log('\n🔍 SAMPLE QUERIES YOU CAN RUN:');
            console.log('-'.repeat(40));
            console.log('• View all subscribers: SELECT * FROM subscribers;');
            console.log('• Confirmed subscribers: SELECT * FROM subscribers WHERE confirmed = 1;');
            console.log('• Recent subscribers: SELECT * FROM subscribers WHERE datetime(subscribed_at) > datetime("now", "-7 days");');
            console.log('• Email logs: SELECT * FROM email_logs ORDER BY sent_at DESC;');
            console.log('• Failed emails: SELECT * FROM email_logs WHERE success = 0;');
            
            console.log('\n🎯 Database analysis complete!');
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
  });
}