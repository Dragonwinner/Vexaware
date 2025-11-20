# 🗄️ VEX AWARE - Ultimate Database Manager
## Complete SQLite Management Tool for Newsletter System

### 🚀 **Quick Start Guide**

#### **1. Basic Usage**
```bash
# Quick overview + interactive mode (default)
node vex-db-manager.js

# Quick view only  
node vex-db-manager.js view

# Advanced statistics
node vex-db-manager.js stats

# Show database schema
node vex-db-manager.js schema
```

#### **2. Interactive Commands**

Once in interactive mode, use these commands:

| Command | Purpose | Example |
|---------|---------|---------|
| `1` or `view` | Complete database content | Shows all data |
| `2` or `subs` | Detailed subscribers | Full subscriber info |
| `3` or `emails` | Email logs analysis | Delivery tracking |
| `4` or `stats` | Advanced statistics | Detailed metrics |
| `5` or `search` | Find subscribers | Search by email |
| `6` or `confirm` | Confirm subscriber | Mark as verified |
| `7` or `add` | Add test subscriber | Create new entry |
| `8` or `delete` | Remove subscriber | Delete by email |
| `9` or `query` | Custom SQL execution | Run any SQL |
| `10` or `export` | Export data | JSON/CSV formats |
| `11` or `backup` | Create database backup | Safety copies |
| `12` or `restore` | Restore from backup | Recovery tool |
| `13` or `clean` | Clean old/invalid data | Data maintenance |
| `14` or `reset` | Reset all data | **DANGER ZONE** |
| `15` or `schema` | Show database structure | Table info |
| `0` or `exit` | Exit manager | Close safely |

### 📊 **Features Overview**

#### **Database Analytics**
- **Subscriber Statistics**: Total, confirmed, pending, active
- **Email Performance**: Success rates, delivery tracking
- **Activity Reports**: Daily, weekly, monthly trends  
- **Type Breakdown**: Email categories analysis

#### **Data Management**
- **Search & Filter**: Find specific subscribers
- **Bulk Operations**: Confirm/delete multiple records
- **Export Tools**: JSON and CSV formats
- **Backup System**: Automated timestamped backups

#### **Advanced Operations**
- **Custom SQL**: Execute any SQLite query
- **Data Cleaning**: Remove old/invalid entries
- **Schema Inspection**: View table structures
- **Restore System**: Recover from backups

### 🎯 **Common Use Cases**

#### **1. Daily Monitoring**
```bash
# Check today's activity
node vex-db-manager.js stats

# View recent subscribers  
node vex-db-manager.js
# Then use command: 2
```

#### **2. Subscriber Management**
```bash
# Find specific subscriber
node vex-db-manager.js
# Command: 5 (search)
# Enter: user@example.com

# Confirm subscription
# Command: 6 (confirm)  
# Enter: user@example.com
```

#### **3. Data Export & Backup**
```bash
# Create backup
# Command: 11 (backup)

# Export to CSV
# Command: 10 (export)
# Choose: 2 (CSV format)
```

#### **4. Database Maintenance**
```bash
# Clean old data
# Command: 13 (clean)
# Choose cleaning options

# View database structure
# Command: 15 (schema)
```

### 🔧 **SQL Query Examples**

Use command `9` (query) for custom operations:

```sql
-- View all confirmed subscribers
SELECT * FROM subscribers WHERE confirmed = 1;

-- Count emails by type
SELECT email_type, COUNT(*) FROM email_logs GROUP BY email_type;

-- Recent activity (7 days)
SELECT * FROM subscribers WHERE datetime(subscribed_at) > datetime('now', '-7 days');

-- Failed email deliveries
SELECT * FROM email_logs WHERE success = 0;

-- Subscriber sources
SELECT source, COUNT(*) FROM subscribers GROUP BY source;
```

### 📁 **File Outputs**

#### **Export Files**
- `vexaware_export_YYYY-MM-DD.json` - Complete data export
- `subscribers_YYYY-MM-DD.csv` - Subscriber CSV
- `email_logs_YYYY-MM-DD.csv` - Email logs CSV

#### **Backup Files**
- `backups/newsletter_backup_YYYY-MM-DD.db` - Database backups

### ⚡ **Performance Tips**

1. **Regular Backups**: Use command 11 before major operations
2. **Clean Data**: Use command 13 monthly for maintenance  
3. **Monitor Stats**: Check command 4 for system health
4. **Export Reports**: Use command 10 for external analysis

### 🚨 **Safety Features**

- **Confirmation Prompts**: All destructive operations require confirmation
- **Automatic Backups**: System creates safety copies
- **Graceful Exit**: Proper database connection cleanup
- **Error Handling**: Comprehensive error messages

### 🎨 **Color Coding**

- 🟢 **Green**: Success messages, confirmed subscribers
- 🟡 **Yellow**: Warnings, pending subscribers  
- 🔴 **Red**: Errors, failed operations
- 🔵 **Blue**: Information, headers
- 🟣 **Magenta**: Email logs, data
- 🟦 **Cyan**: Statistics, system messages

### 📞 **Support Commands**

- **Help**: Run without arguments for quick overview
- **Schema**: Command 15 to understand database structure
- **Statistics**: Command 4 for complete system metrics
- **Backup**: Command 11 before making changes

---

## 🏆 **Merged Features Summary**

This tool combines ALL previous database utilities:
- ✅ **db-viewer.js** - Complete data viewing
- ✅ **db-viewer-fixed.js** - Enhanced display  
- ✅ **db-manager.js** - Interactive management
- ✅ **db-quick-view.js** - Fast overview
- ✅ **sample-queries.sql** - SQL examples
- ✅ **Enhanced Analytics** - Advanced statistics
- ✅ **Export Tools** - Multiple formats
- ✅ **Backup System** - Data safety

**Result**: One powerful tool for all database operations! 🎯