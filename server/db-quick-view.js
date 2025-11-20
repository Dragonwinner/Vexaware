const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database path
const dbPath = path.join(__dirname, 'database', 'newsletter.db');

console.log('🗄️ SQLite Query Runner for VEX Aware Newsletter');
console.log('═'.repeat(60));
console.log(`Database: ${dbPath}`);
console.log('═'.repeat(60));

// Connect to database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error connecting to database:', err.message);
    process.exit(1);
  }
  console.log('✅ Connected to SQLite database\n');
  
  // Show quick overview
  showQuickOverview();
});

function showQuickOverview() {
  console.log('📊 QUICK DATABASE OVERVIEW:');
  console.log('-'.repeat(40));
  
  // Show subscribers count and details
  db.all("SELECT * FROM subscribers ORDER BY subscribed_at DESC", [], (err, subscribers) => {
    if (err) {
      console.error('Error getting subscribers:', err.message);
      return;
    }
    
    console.log(`👥 SUBSCRIBERS (${subscribers.length}):`);
    subscribers.forEach((sub, i) => {
      console.log(`  ${i+1}. ${sub.email} | ${sub.confirmed ? 'Confirmed' : 'Pending'} | ${sub.subscribed_at}`);
    });
    
    // Show email logs
    db.all("SELECT * FROM email_logs ORDER BY sent_at DESC LIMIT 5", [], (err, logs) => {
      if (err) {
        console.error('Error getting email logs:', err.message);
        return;
      }
      
      console.log(`\n📧 RECENT EMAIL LOGS (${logs.length}):`);
      logs.forEach((log, i) => {
        console.log(`  ${i+1}. ${log.email_type} | ${log.success ? 'Success' : 'Failed'} | ${log.sent_at}`);
      });
      
      console.log('\n🔧 COMMON DATABASE OPERATIONS:');
      console.log('-'.repeat(40));
      console.log('1. View all subscribers:');
      console.log('   SELECT * FROM subscribers;');
      console.log('');
      console.log('2. Confirm a subscriber (replace email):');
      console.log('   UPDATE subscribers SET confirmed = 1 WHERE email = "user@example.com";');
      console.log('');
      console.log('3. Add a new subscriber:');
      console.log('   INSERT INTO subscribers (email, confirmation_token) VALUES ("new@example.com", "token123");');
      console.log('');
      console.log('4. Delete a subscriber:');
      console.log('   DELETE FROM subscribers WHERE email = "user@example.com";');
      console.log('');
      console.log('5. View email history:');
      console.log('   SELECT * FROM email_logs ORDER BY sent_at DESC;');
      
      console.log('\n📝 TO RUN CUSTOM QUERIES:');
      console.log('-'.repeat(40));
      console.log('Create a file called "query.sql" with your SQL commands, then run:');
      console.log('sqlite3 database/newsletter.db < query.sql');
      
      // Close database
      db.close((err) => {
        if (err) {
          console.error('Error closing database:', err.message);
        } else {
          console.log('\n✅ Database connection closed');
          console.log('🎯 You can now access the database using any SQLite tool!');
        }
      });
    });
  });
}