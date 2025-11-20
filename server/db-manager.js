const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const readline = require('readline');

// Database path
const dbPath = path.join(__dirname, 'database', 'newsletter.db');

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let db;

console.log('🗄️ SQLite Interactive Database Manager');
console.log('═'.repeat(50));
console.log(`Database: ${dbPath}`);
console.log('═'.repeat(50));

// Connect to database
db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error connecting to database:', err.message);
    process.exit(1);
  }
  console.log('✅ Connected to SQLite database\n');
  showMenu();
});

function showMenu() {
  console.log('📋 Available Commands:');
  console.log('1. view - View all data');
  console.log('2. subscribers - Show subscribers');
  console.log('3. emails - Show email logs');
  console.log('4. stats - Show statistics');
  console.log('5. query - Execute custom SQL query');
  console.log('6. add - Add test subscriber');
  console.log('7. delete - Delete subscriber by email');
  console.log('8. clear - Clear all data');
  console.log('9. backup - Create database backup');
  console.log('0. exit - Exit manager');
  console.log('-'.repeat(40));
  
  rl.question('Enter command (1-9, 0 to exit): ', handleCommand);
}

function handleCommand(command) {
  switch(command.trim()) {
    case '1':
    case 'view':
      viewAllData();
      break;
    case '2':
    case 'subscribers':
      viewSubscribers();
      break;
    case '3':
    case 'emails':
      viewEmailLogs();
      break;
    case '4':
    case 'stats':
      showStats();
      break;
    case '5':
    case 'query':
      executeCustomQuery();
      break;
    case '6':
    case 'add':
      addTestSubscriber();
      break;
    case '7':
    case 'delete':
      deleteSubscriber();
      break;
    case '8':
    case 'clear':
      clearAllData();
      break;
    case '9':
    case 'backup':
      createBackup();
      break;
    case '0':
    case 'exit':
      exitManager();
      break;
    default:
      console.log('❌ Invalid command. Please try again.\n');
      showMenu();
  }
}

function viewAllData() {
  console.log('\n📊 ALL DATABASE DATA:');
  console.log('═'.repeat(50));
  
  // Show subscribers
  db.all("SELECT * FROM subscribers ORDER BY created_at DESC", [], (err, subscribers) => {
    if (err) {
      console.error('Error:', err.message);
      showMenu();
      return;
    }
    
    console.log(`\n👥 SUBSCRIBERS (${subscribers.length}):`);
    console.log('-'.repeat(40));
    
    if (subscribers.length === 0) {
      console.log('No subscribers found.');
    } else {
      subscribers.forEach((sub, i) => {
        console.log(`${i+1}. ${sub.email} | ${sub.status} | ${new Date(sub.created_at).toLocaleString()}`);
      });
    }
    
    // Show email logs
    db.all("SELECT * FROM email_logs ORDER BY created_at DESC LIMIT 20", [], (err, logs) => {
      if (err) {
        console.error('Error:', err.message);
        showMenu();
        return;
      }
      
      console.log(`\n📧 RECENT EMAIL LOGS (${logs.length}):`);
      console.log('-'.repeat(40));
      
      if (logs.length === 0) {
        console.log('No email logs found.');
      } else {
        logs.forEach((log, i) => {
          console.log(`${i+1}. ${log.email_type} to ${log.recipient} | ${log.status} | ${new Date(log.created_at).toLocaleString()}`);
        });
      }
      
      console.log();
      showMenu();
    });
  });
}

function viewSubscribers() {
  console.log('\n👥 SUBSCRIBERS:');
  console.log('-'.repeat(40));
  
  db.all("SELECT * FROM subscribers ORDER BY created_at DESC", [], (err, subscribers) => {
    if (err) {
      console.error('Error:', err.message);
    } else {
      if (subscribers.length === 0) {
        console.log('No subscribers found.');
      } else {
        subscribers.forEach((sub, i) => {
          console.log(`\n${i+1}. Email: ${sub.email}`);
          console.log(`   ID: ${sub.id}`);
          console.log(`   Status: ${sub.status}`);
          console.log(`   Created: ${new Date(sub.created_at).toLocaleString()}`);
          console.log(`   Confirmed: ${sub.confirmed_at ? new Date(sub.confirmed_at).toLocaleString() : 'Not confirmed'}`);
          console.log(`   Token: ${sub.confirmation_token || 'None'}`);
        });
      }
    }
    console.log();
    showMenu();
  });
}

function viewEmailLogs() {
  console.log('\n📧 EMAIL LOGS:');
  console.log('-'.repeat(40));
  
  db.all("SELECT * FROM email_logs ORDER BY created_at DESC LIMIT 50", [], (err, logs) => {
    if (err) {
      console.error('Error:', err.message);
    } else {
      if (logs.length === 0) {
        console.log('No email logs found.');
      } else {
        logs.forEach((log, i) => {
          console.log(`\n${i+1}. Type: ${log.email_type}`);
          console.log(`   To: ${log.recipient}`);
          console.log(`   Status: ${log.status}`);
          console.log(`   Sent: ${new Date(log.created_at).toLocaleString()}`);
          if (log.error_message) {
            console.log(`   Error: ${log.error_message}`);
          }
        });
      }
    }
    console.log();
    showMenu();
  });
}

function showStats() {
  console.log('\n📈 DATABASE STATISTICS:');
  console.log('-'.repeat(40));
  
  const queries = [
    { name: 'Total Subscribers', sql: "SELECT COUNT(*) as count FROM subscribers" },
    { name: 'Confirmed Subscribers', sql: "SELECT COUNT(*) as count FROM subscribers WHERE status = 'confirmed'" },
    { name: 'Pending Subscribers', sql: "SELECT COUNT(*) as count FROM subscribers WHERE status = 'pending'" },
    { name: 'Total Emails Sent', sql: "SELECT COUNT(*) as count FROM email_logs" },
    { name: 'Successful Emails', sql: "SELECT COUNT(*) as count FROM email_logs WHERE status = 'sent'" },
    { name: 'Recent Subscribers (7 days)', sql: "SELECT COUNT(*) as count FROM subscribers WHERE created_at > datetime('now', '-7 days')" }
  ];
  
  let completed = 0;
  
  queries.forEach(query => {
    db.get(query.sql, [], (err, row) => {
      if (!err) {
        console.log(`${query.name}: ${row.count}`);
      }
      
      completed++;
      if (completed === queries.length) {
        console.log();
        showMenu();
      }
    });
  });
}

function executeCustomQuery() {
  rl.question('\nEnter SQL query: ', (query) => {
    if (!query.trim()) {
      console.log('Empty query. Returning to menu.\n');
      showMenu();
      return;
    }
    
    console.log(`\nExecuting: ${query}`);
    console.log('-'.repeat(40));
    
    const isSelect = query.trim().toLowerCase().startsWith('select');
    
    if (isSelect) {
      db.all(query, [], (err, rows) => {
        if (err) {
          console.error('❌ Error:', err.message);
        } else {
          if (rows.length === 0) {
            console.log('No results found.');
          } else {
            console.log(`Found ${rows.length} row(s):`);
            rows.forEach((row, i) => {
              console.log(`${i+1}:`, JSON.stringify(row, null, 2));
            });
          }
        }
        console.log();
        showMenu();
      });
    } else {
      db.run(query, [], function(err) {
        if (err) {
          console.error('❌ Error:', err.message);
        } else {
          console.log(`✅ Query executed successfully. Changes: ${this.changes}`);
        }
        console.log();
        showMenu();
      });
    }
  });
}

function addTestSubscriber() {
  rl.question('Enter email address: ', (email) => {
    if (!email.trim()) {
      console.log('Empty email. Returning to menu.\n');
      showMenu();
      return;
    }
    
    const sql = `INSERT INTO subscribers (email, status, confirmation_token, created_at) 
                 VALUES (?, 'pending', ?, datetime('now'))`;
    const token = Math.random().toString(36).substring(2, 15);
    
    db.run(sql, [email, token], function(err) {
      if (err) {
        console.error('❌ Error adding subscriber:', err.message);
      } else {
        console.log(`✅ Added subscriber: ${email} (ID: ${this.lastID})`);
      }
      console.log();
      showMenu();
    });
  });
}

function deleteSubscriber() {
  rl.question('Enter email address to delete: ', (email) => {
    if (!email.trim()) {
      console.log('Empty email. Returning to menu.\n');
      showMenu();
      return;
    }
    
    db.run("DELETE FROM subscribers WHERE email = ?", [email], function(err) {
      if (err) {
        console.error('❌ Error deleting subscriber:', err.message);
      } else if (this.changes === 0) {
        console.log(`❌ No subscriber found with email: ${email}`);
      } else {
        console.log(`✅ Deleted subscriber: ${email}`);
      }
      console.log();
      showMenu();
    });
  });
}

function clearAllData() {
  rl.question('⚠️  This will delete ALL data! Type "CONFIRM" to proceed: ', (confirmation) => {
    if (confirmation === 'CONFIRM') {
      db.run("DELETE FROM subscribers", [], function(err) {
        if (err) {
          console.error('Error deleting subscribers:', err.message);
          showMenu();
          return;
        }
        
        const subscribersDeleted = this.changes;
        
        db.run("DELETE FROM email_logs", [], function(err) {
          if (err) {
            console.error('Error deleting email logs:', err.message);
          } else {
            console.log(`✅ Deleted ${subscribersDeleted} subscribers and ${this.changes} email logs`);
          }
          console.log();
          showMenu();
        });
      });
    } else {
      console.log('❌ Operation cancelled.\n');
      showMenu();
    }
  });
}

function createBackup() {
  const fs = require('fs');
  const backupPath = path.join(__dirname, `newsletter_backup_${Date.now()}.db`);
  
  try {
    fs.copyFileSync(dbPath, backupPath);
    console.log(`✅ Database backup created: ${backupPath}\n`);
  } catch (err) {
    console.error('❌ Backup failed:', err.message);
  }
  
  showMenu();
}

function exitManager() {
  console.log('\n🎯 Closing database connection...');
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('✅ Database connection closed. Goodbye!');
    }
    rl.close();
    process.exit(0);
  });
}