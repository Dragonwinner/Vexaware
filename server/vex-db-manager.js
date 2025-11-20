#!/usr/bin/env node
/**
 * VEX Aware - Ultimate SQLite Database Manager
 * Comprehensive tool for managing newsletter database
 * Author: VEX Aware Team
 * Version: 1.0.0
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const readline = require('readline');

// Database configuration
const DB_PATH = path.join(__dirname, 'database', 'newsletter.db');
const BACKUP_DIR = path.join(__dirname, 'backups');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

class VexAwareDatabaseManager {
  constructor() {
    this.db = null;
    this.rl = null;
    this.isInteractive = false;
  }

  // Initialize the database manager
  async init() {
    console.log(`${colors.cyan}${colors.bright}`);
    console.log('🗄️ VEX AWARE - ULTIMATE DATABASE MANAGER');
    console.log('═'.repeat(60));
    console.log(`${colors.reset}${colors.white}Database: ${DB_PATH}${colors.reset}`);
    console.log('═'.repeat(60));

    // Check if database exists
    if (!fs.existsSync(DB_PATH)) {
      console.log(`${colors.red}❌ Database file not found: ${DB_PATH}${colors.reset}`);
      process.exit(1);
    }

    // Connect to database
    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database(DB_PATH, (err) => {
        if (err) {
          console.error(`${colors.red}❌ Error connecting to database: ${err.message}${colors.reset}`);
          reject(err);
        } else {
          console.log(`${colors.green}✅ Connected to SQLite database${colors.reset}\n`);
          resolve();
        }
      });
    });
  }

  // Quick database overview
  async quickView() {
    console.log(`${colors.blue}📊 QUICK DATABASE OVERVIEW${colors.reset}`);
    console.log('-'.repeat(40));

    try {
      const subscribers = await this.queryAsync("SELECT * FROM subscribers ORDER BY subscribed_at DESC");
      const emailLogs = await this.queryAsync("SELECT * FROM email_logs ORDER BY sent_at DESC LIMIT 10");
      const stats = await this.getStatistics();

      // Show subscribers
      console.log(`${colors.yellow}👥 SUBSCRIBERS (${subscribers.length}):${colors.reset}`);
      if (subscribers.length === 0) {
        console.log('   No subscribers found.');
      } else {
        subscribers.forEach((sub, i) => {
          const status = sub.confirmed ? `${colors.green}Confirmed${colors.reset}` : `${colors.yellow}Pending${colors.reset}`;
          console.log(`   ${i+1}. ${sub.email} | ${status} | ${sub.subscribed_at}`);
        });
      }

      // Show email logs
      console.log(`\n${colors.magenta}📧 RECENT EMAIL LOGS (${emailLogs.length}):${colors.reset}`);
      if (emailLogs.length === 0) {
        console.log('   No email logs found.');
      } else {
        emailLogs.forEach((log, i) => {
          const status = log.success ? `${colors.green}Success${colors.reset}` : `${colors.red}Failed${colors.reset}`;
          console.log(`   ${i+1}. ${log.email_type} | ${status} | ${log.sent_at}`);
        });
      }

      // Show statistics
      console.log(`\n${colors.cyan}📈 STATISTICS:${colors.reset}`);
      console.log(`   Total Subscribers: ${stats.totalSubscribers}`);
      console.log(`   Confirmed: ${colors.green}${stats.confirmedSubscribers}${colors.reset}`);
      console.log(`   Pending: ${colors.yellow}${stats.pendingSubscribers}${colors.reset}`);
      console.log(`   Email Success Rate: ${colors.green}${stats.emailSuccessRate}%${colors.reset}`);
      console.log(`   Recent Activity (7 days): ${stats.recentActivity}`);

    } catch (error) {
      console.error(`${colors.red}Error in quick view: ${error.message}${colors.reset}`);
    }
  }

  // Interactive mode
  async startInteractive() {
    this.isInteractive = true;
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    console.log(`\n${colors.bright}🎮 INTERACTIVE MODE ACTIVATED${colors.reset}`);
    this.showMenu();
  }

  showMenu() {
    console.log(`\n${colors.cyan}📋 AVAILABLE COMMANDS:${colors.reset}`);
    console.log('1.  view      - View all database content');
    console.log('2.  subs      - Show subscribers details');
    console.log('3.  emails    - Show email logs');
    console.log('4.  stats     - Show detailed statistics');
    console.log('5.  search    - Search subscribers by email');
    console.log('6.  confirm   - Confirm subscriber by email');
    console.log('7.  add       - Add new test subscriber');
    console.log('8.  delete    - Delete subscriber by email');
    console.log('9.  query     - Execute custom SQL query');
    console.log('10. export    - Export data to JSON/CSV');
    console.log('11. backup    - Create database backup');
    console.log('12. restore   - Restore from backup');
    console.log('13. clean     - Clean old/invalid data');
    console.log('14. reset     - Reset all data (DANGER!)');
    console.log('15. schema    - Show database schema');
    console.log('0.  exit      - Exit manager');
    console.log('-'.repeat(50));

    this.rl.question(`${colors.yellow}Enter command (1-15, 0 to exit): ${colors.reset}`, (command) => {
      this.handleCommand(command.trim());
    });
  }

  async handleCommand(command) {
    try {
      switch(command.toLowerCase()) {
        case '1':
        case 'view':
          await this.viewAllData();
          break;
        case '2':
        case 'subs':
          await this.viewSubscribers();
          break;
        case '3':
        case 'emails':
          await this.viewEmailLogs();
          break;
        case '4':
        case 'stats':
          await this.showDetailedStats();
          break;
        case '5':
        case 'search':
          await this.searchSubscribers();
          break;
        case '6':
        case 'confirm':
          await this.confirmSubscriber();
          break;
        case '7':
        case 'add':
          await this.addTestSubscriber();
          break;
        case '8':
        case 'delete':
          await this.deleteSubscriber();
          break;
        case '9':
        case 'query':
          await this.executeCustomQuery();
          break;
        case '10':
        case 'export':
          await this.exportData();
          break;
        case '11':
        case 'backup':
          await this.createBackup();
          break;
        case '12':
        case 'restore':
          await this.restoreBackup();
          break;
        case '13':
        case 'clean':
          await this.cleanData();
          break;
        case '14':
        case 'reset':
          await this.resetAllData();
          break;
        case '15':
        case 'schema':
          await this.showSchema();
          break;
        case '0':
        case 'exit':
          await this.exit();
          return;
        default:
          console.log(`${colors.red}❌ Invalid command. Please try again.${colors.reset}`);
          this.showMenu();
      }
    } catch (error) {
      console.error(`${colors.red}Error executing command: ${error.message}${colors.reset}`);
      this.showMenu();
    }
  }

  // Database operations
  async viewAllData() {
    console.log(`\n${colors.blue}📊 COMPLETE DATABASE CONTENT${colors.reset}`);
    console.log('═'.repeat(50));

    const subscribers = await this.queryAsync("SELECT * FROM subscribers ORDER BY subscribed_at DESC");
    const emailLogs = await this.queryAsync("SELECT * FROM email_logs ORDER BY sent_at DESC");

    console.log(`\n${colors.yellow}👥 ALL SUBSCRIBERS (${subscribers.length}):${colors.reset}`);
    this.displaySubscribers(subscribers);

    console.log(`\n${colors.magenta}📧 ALL EMAIL LOGS (${emailLogs.length}):${colors.reset}`);
    this.displayEmailLogs(emailLogs);

    this.showMenu();
  }

  async viewSubscribers() {
    console.log(`\n${colors.yellow}👥 SUBSCRIBERS DETAILED VIEW${colors.reset}`);
    console.log('-'.repeat(50));

    const subscribers = await this.queryAsync("SELECT * FROM subscribers ORDER BY subscribed_at DESC");
    this.displaySubscribers(subscribers, true);
    this.showMenu();
  }

  async viewEmailLogs() {
    console.log(`\n${colors.magenta}📧 EMAIL LOGS DETAILED VIEW${colors.reset}`);
    console.log('-'.repeat(50));

    const emailLogs = await this.queryAsync("SELECT * FROM email_logs ORDER BY sent_at DESC");
    this.displayEmailLogs(emailLogs, true);
    this.showMenu();
  }

  async showDetailedStats() {
    console.log(`\n${colors.cyan}📈 DETAILED DATABASE STATISTICS${colors.reset}`);
    console.log('═'.repeat(50));

    const stats = await this.getDetailedStatistics();
    
    console.log(`${colors.bright}SUBSCRIBER STATISTICS:${colors.reset}`);
    console.log(`  Total Subscribers: ${stats.totalSubscribers}`);
    console.log(`  Confirmed: ${colors.green}${stats.confirmedSubscribers}${colors.reset}`);
    console.log(`  Pending: ${colors.yellow}${stats.pendingSubscribers}${colors.reset}`);
    console.log(`  Active: ${colors.green}${stats.activeSubscribers}${colors.reset}`);
    console.log(`  Inactive: ${colors.red}${stats.inactiveSubscribers}${colors.reset}`);

    console.log(`\n${colors.bright}EMAIL STATISTICS:${colors.reset}`);
    console.log(`  Total Emails: ${stats.totalEmails}`);
    console.log(`  Successful: ${colors.green}${stats.successfulEmails}${colors.reset}`);
    console.log(`  Failed: ${colors.red}${stats.failedEmails}${colors.reset}`);
    console.log(`  Success Rate: ${colors.green}${stats.emailSuccessRate}%${colors.reset}`);

    console.log(`\n${colors.bright}ACTIVITY STATISTICS:${colors.reset}`);
    console.log(`  Today: ${stats.todayActivity}`);
    console.log(`  This Week: ${stats.weekActivity}`);
    console.log(`  This Month: ${stats.monthActivity}`);

    console.log(`\n${colors.bright}EMAIL TYPE BREAKDOWN:${colors.reset}`);
    Object.entries(stats.emailTypes).forEach(([type, count]) => {
      console.log(`  ${type}: ${count}`);
    });

    this.showMenu();
  }

  async searchSubscribers() {
    this.rl.question('Enter email to search (partial match allowed): ', async (email) => {
      if (!email.trim()) {
        console.log(`${colors.red}Empty search term.${colors.reset}`);
        this.showMenu();
        return;
      }

      const subscribers = await this.queryAsync(
        "SELECT * FROM subscribers WHERE email LIKE ? ORDER BY subscribed_at DESC",
        [`%${email}%`]
      );

      console.log(`\n${colors.yellow}🔍 SEARCH RESULTS for "${email}":${colors.reset}`);
      if (subscribers.length === 0) {
        console.log('No subscribers found.');
      } else {
        this.displaySubscribers(subscribers, true);
      }
      this.showMenu();
    });
  }

  async confirmSubscriber() {
    this.rl.question('Enter email to confirm: ', async (email) => {
      if (!email.trim()) {
        console.log(`${colors.red}Empty email.${colors.reset}`);
        this.showMenu();
        return;
      }

      try {
        const result = await this.runAsync(
          "UPDATE subscribers SET confirmed = 1 WHERE email = ?",
          [email]
        );

        if (result.changes === 0) {
          console.log(`${colors.red}❌ No subscriber found with email: ${email}${colors.reset}`);
        } else {
          console.log(`${colors.green}✅ Confirmed subscriber: ${email}${colors.reset}`);
        }
      } catch (error) {
        console.error(`${colors.red}Error confirming subscriber: ${error.message}${colors.reset}`);
      }
      this.showMenu();
    });
  }

  async addTestSubscriber() {
    this.rl.question('Enter email address: ', async (email) => {
      if (!email.trim()) {
        console.log(`${colors.red}Empty email.${colors.reset}`);
        this.showMenu();
        return;
      }

      const token = Math.random().toString(36).substring(2, 15);
      const unsubToken = Math.random().toString(36).substring(2, 15);

      try {
        const result = await this.runAsync(
          `INSERT INTO subscribers (email, confirmation_token, unsubscribe_token, subscribed_at) 
           VALUES (?, ?, ?, datetime('now'))`,
          [email, token, unsubToken]
        );

        console.log(`${colors.green}✅ Added subscriber: ${email} (ID: ${result.lastID})${colors.reset}`);
      } catch (error) {
        if (error.message.includes('UNIQUE constraint failed')) {
          console.log(`${colors.red}❌ Email already exists: ${email}${colors.reset}`);
        } else {
          console.error(`${colors.red}Error adding subscriber: ${error.message}${colors.reset}`);
        }
      }
      this.showMenu();
    });
  }

  async deleteSubscriber() {
    this.rl.question('Enter email to delete: ', async (email) => {
      if (!email.trim()) {
        console.log(`${colors.red}Empty email.${colors.reset}`);
        this.showMenu();
        return;
      }

      this.rl.question(`${colors.red}⚠️  Confirm deletion of ${email}? (y/N): ${colors.reset}`, async (confirm) => {
        if (confirm.toLowerCase() === 'y' || confirm.toLowerCase() === 'yes') {
          try {
            const result = await this.runAsync("DELETE FROM subscribers WHERE email = ?", [email]);
            
            if (result.changes === 0) {
              console.log(`${colors.red}❌ No subscriber found with email: ${email}${colors.reset}`);
            } else {
              console.log(`${colors.green}✅ Deleted subscriber: ${email}${colors.reset}`);
            }
          } catch (error) {
            console.error(`${colors.red}Error deleting subscriber: ${error.message}${colors.reset}`);
          }
        } else {
          console.log(`${colors.yellow}❌ Deletion cancelled.${colors.reset}`);
        }
        this.showMenu();
      });
    });
  }

  async executeCustomQuery() {
    this.rl.question('Enter SQL query: ', async (query) => {
      if (!query.trim()) {
        console.log(`${colors.red}Empty query.${colors.reset}`);
        this.showMenu();
        return;
      }

      try {
        const isSelect = query.trim().toLowerCase().startsWith('select');
        
        console.log(`\n${colors.blue}Executing: ${query}${colors.reset}`);
        console.log('-'.repeat(50));

        if (isSelect) {
          const rows = await this.queryAsync(query);
          if (rows.length === 0) {
            console.log('No results found.');
          } else {
            console.log(`Found ${rows.length} row(s):`);
            rows.forEach((row, i) => {
              console.log(`${i+1}:`, JSON.stringify(row, null, 2));
            });
          }
        } else {
          const result = await this.runAsync(query);
          console.log(`${colors.green}✅ Query executed successfully. Changes: ${result.changes}${colors.reset}`);
        }
      } catch (error) {
        console.error(`${colors.red}❌ SQL Error: ${error.message}${colors.reset}`);
      }
      this.showMenu();
    });
  }

  async exportData() {
    console.log(`\n${colors.blue}📤 EXPORT DATA${colors.reset}`);
    console.log('1. JSON format');
    console.log('2. CSV format');
    
    this.rl.question('Choose format (1-2): ', async (choice) => {
      const format = choice === '2' ? 'csv' : 'json';
      
      try {
        const subscribers = await this.queryAsync("SELECT * FROM subscribers ORDER BY subscribed_at DESC");
        const emailLogs = await this.queryAsync("SELECT * FROM email_logs ORDER BY sent_at DESC");
        
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        
        if (format === 'json') {
          const data = { subscribers, emailLogs, exportedAt: new Date().toISOString() };
          const filename = `vexaware_export_${timestamp}.json`;
          fs.writeFileSync(filename, JSON.stringify(data, null, 2));
          console.log(`${colors.green}✅ Data exported to: ${filename}${colors.reset}`);
        } else {
          // CSV export
          const subsFilename = `subscribers_${timestamp}.csv`;
          const emailsFilename = `email_logs_${timestamp}.csv`;
          
          // Export subscribers CSV
          let csvContent = 'id,email,confirmed,subscribed_at,source,ip_address\n';
          subscribers.forEach(sub => {
            csvContent += `${sub.id},"${sub.email}",${sub.confirmed},"${sub.subscribed_at}","${sub.source || ''}","${sub.ip_address || ''}"\n`;
          });
          fs.writeFileSync(subsFilename, csvContent);
          
          // Export email logs CSV
          csvContent = 'id,subscriber_id,email_type,sent_at,success,error_message\n';
          emailLogs.forEach(log => {
            csvContent += `${log.id},${log.subscriber_id || ''},"${log.email_type}","${log.sent_at}",${log.success},"${log.error_message || ''}"\n`;
          });
          fs.writeFileSync(emailsFilename, csvContent);
          
          console.log(`${colors.green}✅ Data exported to: ${subsFilename} & ${emailsFilename}${colors.reset}`);
        }
      } catch (error) {
        console.error(`${colors.red}Export error: ${error.message}${colors.reset}`);
      }
      this.showMenu();
    });
  }

  async createBackup() {
    try {
      // Ensure backup directory exists
      if (!fs.existsSync(BACKUP_DIR)) {
        fs.mkdirSync(BACKUP_DIR, { recursive: true });
      }
      
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupPath = path.join(BACKUP_DIR, `newsletter_backup_${timestamp}.db`);
      
      fs.copyFileSync(DB_PATH, backupPath);
      console.log(`${colors.green}✅ Database backup created: ${backupPath}${colors.reset}`);
    } catch (error) {
      console.error(`${colors.red}Backup failed: ${error.message}${colors.reset}`);
    }
    this.showMenu();
  }

  async restoreBackup() {
    try {
      if (!fs.existsSync(BACKUP_DIR)) {
        console.log(`${colors.red}❌ No backup directory found.${colors.reset}`);
        this.showMenu();
        return;
      }
      
      const backups = fs.readdirSync(BACKUP_DIR).filter(f => f.endsWith('.db'));
      
      if (backups.length === 0) {
        console.log(`${colors.red}❌ No backup files found.${colors.reset}`);
        this.showMenu();
        return;
      }
      
      console.log(`\n${colors.yellow}Available backups:${colors.reset}`);
      backups.forEach((backup, i) => {
        console.log(`${i + 1}. ${backup}`);
      });
      
      this.rl.question('Choose backup to restore (number): ', (choice) => {
        const index = parseInt(choice) - 1;
        
        if (index >= 0 && index < backups.length) {
          this.rl.question(`${colors.red}⚠️  This will overwrite current database. Confirm? (y/N): ${colors.reset}`, (confirm) => {
            if (confirm.toLowerCase() === 'y' || confirm.toLowerCase() === 'yes') {
              try {
                const backupPath = path.join(BACKUP_DIR, backups[index]);
                fs.copyFileSync(backupPath, DB_PATH);
                console.log(`${colors.green}✅ Database restored from: ${backups[index]}${colors.reset}`);
              } catch (error) {
                console.error(`${colors.red}Restore failed: ${error.message}${colors.reset}`);
              }
            } else {
              console.log(`${colors.yellow}❌ Restore cancelled.${colors.reset}`);
            }
            this.showMenu();
          });
        } else {
          console.log(`${colors.red}❌ Invalid selection.${colors.reset}`);
          this.showMenu();
        }
      });
    } catch (error) {
      console.error(`${colors.red}Error listing backups: ${error.message}${colors.reset}`);
      this.showMenu();
    }
  }

  async cleanData() {
    console.log(`\n${colors.yellow}🧹 DATA CLEANING OPTIONS:${colors.reset}`);
    console.log('1. Remove unconfirmed subscribers older than 30 days');
    console.log('2. Remove failed email logs older than 7 days');
    console.log('3. Remove inactive subscribers');
    console.log('4. All of the above');
    
    this.rl.question('Choose cleaning option (1-4): ', async (choice) => {
      try {
        let cleaned = 0;
        
        if (choice === '1' || choice === '4') {
          const result = await this.runAsync(
            "DELETE FROM subscribers WHERE confirmed = 0 AND datetime(subscribed_at) < datetime('now', '-30 days')"
          );
          cleaned += result.changes;
          console.log(`${colors.green}✅ Removed ${result.changes} old unconfirmed subscribers${colors.reset}`);
        }
        
        if (choice === '2' || choice === '4') {
          const result = await this.runAsync(
            "DELETE FROM email_logs WHERE success = 0 AND datetime(sent_at) < datetime('now', '-7 days')"
          );
          cleaned += result.changes;
          console.log(`${colors.green}✅ Removed ${result.changes} old failed email logs${colors.reset}`);
        }
        
        if (choice === '3' || choice === '4') {
          const result = await this.runAsync(
            "DELETE FROM subscribers WHERE active = 0 AND datetime(subscribed_at) < datetime('now', '-90 days')"
          );
          cleaned += result.changes;
          console.log(`${colors.green}✅ Removed ${result.changes} inactive subscribers${colors.reset}`);
        }
        
        console.log(`${colors.green}🎯 Total records cleaned: ${cleaned}${colors.reset}`);
      } catch (error) {
        console.error(`${colors.red}Cleaning error: ${error.message}${colors.reset}`);
      }
      this.showMenu();
    });
  }

  async resetAllData() {
    console.log(`${colors.red}${colors.bright}⚠️  WARNING: This will delete ALL data!${colors.reset}`);
    this.rl.question('Type "RESET" to confirm complete data deletion: ', async (confirmation) => {
      if (confirmation === 'RESET') {
        try {
          await this.runAsync("DELETE FROM subscribers");
          await this.runAsync("DELETE FROM email_logs");
          await this.runAsync("DELETE FROM sqlite_sequence WHERE name IN ('subscribers', 'email_logs')");
          
          console.log(`${colors.green}✅ All data has been reset${colors.reset}`);
        } catch (error) {
          console.error(`${colors.red}Reset error: ${error.message}${colors.reset}`);
        }
      } else {
        console.log(`${colors.yellow}❌ Reset cancelled.${colors.reset}`);
      }
      this.showMenu();
    });
  }

  async showSchema() {
    console.log(`\n${colors.blue}🏗️ DATABASE SCHEMA${colors.reset}`);
    console.log('═'.repeat(50));

    try {
      const tables = await this.queryAsync("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'");
      
      for (const table of tables) {
        console.log(`\n${colors.bright}TABLE: ${table.name}${colors.reset}`);
        console.log('-'.repeat(30));
        
        const columns = await this.queryAsync(`PRAGMA table_info(${table.name})`);
        columns.forEach(col => {
          const nullable = col.notnull ? 'NOT NULL' : 'NULL';
          const pk = col.pk ? ' (PRIMARY KEY)' : '';
          const defaultVal = col.dflt_value ? ` DEFAULT ${col.dflt_value}` : '';
          console.log(`  ${col.name}: ${col.type} ${nullable}${pk}${defaultVal}`);
        });
      }
    } catch (error) {
      console.error(`${colors.red}Schema error: ${error.message}${colors.reset}`);
    }
    this.showMenu();
  }

  // Helper methods
  displaySubscribers(subscribers, detailed = false) {
    if (subscribers.length === 0) {
      console.log('   No subscribers found.');
      return;
    }

    subscribers.forEach((sub, i) => {
      const status = sub.confirmed ? `${colors.green}Confirmed${colors.reset}` : `${colors.yellow}Pending${colors.reset}`;
      const active = sub.active ? `${colors.green}Active${colors.reset}` : `${colors.red}Inactive${colors.reset}`;
      
      if (detailed) {
        console.log(`\n${i+1}. ${colors.bright}${sub.email}${colors.reset}`);
        console.log(`   ID: ${sub.id}`);
        console.log(`   Status: ${status}`);
        console.log(`   Active: ${active}`);
        console.log(`   Subscribed: ${sub.subscribed_at}`);
        console.log(`   Source: ${sub.source || 'N/A'}`);
        console.log(`   IP: ${sub.ip_address || 'N/A'}`);
        if (sub.confirmation_token) {
          console.log(`   Token: ${sub.confirmation_token}`);
        }
      } else {
        console.log(`   ${i+1}. ${sub.email} | ${status} | ${sub.subscribed_at}`);
      }
    });
  }

  displayEmailLogs(logs, detailed = false) {
    if (logs.length === 0) {
      console.log('   No email logs found.');
      return;
    }

    logs.forEach((log, i) => {
      const status = log.success ? `${colors.green}Success${colors.reset}` : `${colors.red}Failed${colors.reset}`;
      
      if (detailed) {
        console.log(`\n${i+1}. ${colors.bright}${log.email_type}${colors.reset}`);
        console.log(`   ID: ${log.id}`);
        console.log(`   Subscriber ID: ${log.subscriber_id || 'N/A'}`);
        console.log(`   Status: ${status}`);
        console.log(`   Sent: ${log.sent_at}`);
        if (log.error_message) {
          console.log(`   Error: ${colors.red}${log.error_message}${colors.reset}`);
        }
      } else {
        console.log(`   ${i+1}. ${log.email_type} | ${status} | ${log.sent_at}`);
      }
    });
  }

  async getStatistics() {
    const totalSubs = await this.getAsync("SELECT COUNT(*) as count FROM subscribers");
    const confirmedSubs = await this.getAsync("SELECT COUNT(*) as count FROM subscribers WHERE confirmed = 1");
    const pendingSubs = await this.getAsync("SELECT COUNT(*) as count FROM subscribers WHERE confirmed = 0");
    const totalEmails = await this.getAsync("SELECT COUNT(*) as count FROM email_logs");
    const successEmails = await this.getAsync("SELECT COUNT(*) as count FROM email_logs WHERE success = 1");
    const recentSubs = await this.getAsync("SELECT COUNT(*) as count FROM subscribers WHERE datetime(subscribed_at) > datetime('now', '-7 days')");

    const successRate = totalEmails.count > 0 ? ((successEmails.count / totalEmails.count) * 100).toFixed(1) : 0;

    return {
      totalSubscribers: totalSubs.count,
      confirmedSubscribers: confirmedSubs.count,
      pendingSubscribers: pendingSubs.count,
      emailSuccessRate: successRate,
      recentActivity: recentSubs.count
    };
  }

  async getDetailedStatistics() {
    const stats = await this.getStatistics();
    
    const activeSubs = await this.getAsync("SELECT COUNT(*) as count FROM subscribers WHERE active = 1");
    const inactiveSubs = await this.getAsync("SELECT COUNT(*) as count FROM subscribers WHERE active = 0");
    const failedEmails = await this.getAsync("SELECT COUNT(*) as count FROM email_logs WHERE success = 0");
    const todayActivity = await this.getAsync("SELECT COUNT(*) as count FROM subscribers WHERE date(subscribed_at) = date('now')");
    const weekActivity = await this.getAsync("SELECT COUNT(*) as count FROM subscribers WHERE datetime(subscribed_at) > datetime('now', '-7 days')");
    const monthActivity = await this.getAsync("SELECT COUNT(*) as count FROM subscribers WHERE datetime(subscribed_at) > datetime('now', '-30 days')");
    
    const emailTypes = await this.queryAsync("SELECT email_type, COUNT(*) as count FROM email_logs GROUP BY email_type");
    const emailTypesObj = {};
    emailTypes.forEach(type => {
      emailTypesObj[type.email_type] = type.count;
    });

    return {
      ...stats,
      activeSubscribers: activeSubs.count,
      inactiveSubscribers: inactiveSubs.count,
      totalEmails: stats.totalSubscribers > 0 ? await this.getAsync("SELECT COUNT(*) as count FROM email_logs").then(r => r.count) : 0,
      successfulEmails: await this.getAsync("SELECT COUNT(*) as count FROM email_logs WHERE success = 1").then(r => r.count),
      failedEmails: failedEmails.count,
      todayActivity: todayActivity.count,
      weekActivity: weekActivity.count,
      monthActivity: monthActivity.count,
      emailTypes: emailTypesObj
    };
  }

  // Database promise wrappers
  queryAsync(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  getAsync(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  runAsync(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err) reject(err);
        else resolve({ changes: this.changes, lastID: this.lastID });
      });
    });
  }

  async exit() {
    console.log(`\n${colors.cyan}🎯 Closing database connection...${colors.reset}`);
    
    if (this.db) {
      await new Promise((resolve) => {
        this.db.close((err) => {
          if (err) {
            console.error(`${colors.red}Error closing database: ${err.message}${colors.reset}`);
          } else {
            console.log(`${colors.green}✅ Database connection closed${colors.reset}`);
          }
          resolve();
        });
      });
    }

    if (this.rl) {
      this.rl.close();
    }

    console.log(`${colors.bright}${colors.cyan}Thank you for using VEX Aware Database Manager!${colors.reset}`);
    process.exit(0);
  }
}

// Main execution
async function main() {
  const manager = new VexAwareDatabaseManager();
  
  try {
    await manager.init();
    
    // Check command line arguments
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
      // No arguments - show quick view and start interactive mode
      await manager.quickView();
      await manager.startInteractive();
    } else {
      // Handle command line arguments
      switch (args[0].toLowerCase()) {
        case 'view':
        case 'quick':
          await manager.quickView();
          break;
        case 'subs':
        case 'subscribers':
          await manager.viewSubscribers();
          break;
        case 'emails':
          await manager.viewEmailLogs();
          break;
        case 'stats':
          await manager.showDetailedStats();
          break;
        case 'schema':
          await manager.showSchema();
          break;
        case 'backup':
          await manager.createBackup();
          break;
        case 'export':
          await manager.exportData();
          break;
        case 'interactive':
        case 'i':
          await manager.quickView();
          await manager.startInteractive();
          break;
        default:
          console.log(`${colors.yellow}Unknown command: ${args[0]}${colors.reset}`);
          console.log(`${colors.cyan}Available commands: view, subs, emails, stats, schema, backup, export, interactive${colors.reset}`);
          break;
      }
      
      if (!manager.isInteractive) {
        await manager.exit();
      }
    }
  } catch (error) {
    console.error(`${colors.red}Fatal error: ${error.message}${colors.reset}`);
    process.exit(1);
  }
}

// Handle process termination gracefully
process.on('SIGINT', async () => {
  console.log(`\n${colors.yellow}Received interrupt signal. Closing gracefully...${colors.reset}`);
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log(`\n${colors.yellow}Received termination signal. Closing gracefully...${colors.reset}`);
  process.exit(0);
});

// Run the application
if (require.main === module) {
  main().catch(console.error);
}

module.exports = VexAwareDatabaseManager;