-- VEX Aware Newsletter Database Queries
-- Run with: sqlite3 database/newsletter.db < sample-queries.sql

.mode table
.headers on

-- Show database info
SELECT 'DATABASE OVERVIEW' as info;
SELECT name as 'Table Name' FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';

-- Show all subscribers
SELECT '' as '';
SELECT 'ALL SUBSCRIBERS' as info;
SELECT 
  id,
  email,
  CASE 
    WHEN confirmed = 1 THEN 'Confirmed' 
    ELSE 'Pending' 
  END as status,
  subscribed_at as 'Subscribed Date',
  source,
  ip_address as 'IP Address'
FROM subscribers 
ORDER BY subscribed_at DESC;

-- Show email statistics
SELECT '' as '';
SELECT 'EMAIL STATISTICS' as info;
SELECT 
  email_type as 'Email Type',
  COUNT(*) as 'Total Sent',
  SUM(success) as 'Successful',
  ROUND(AVG(success) * 100, 2) || '%' as 'Success Rate'
FROM email_logs 
GROUP BY email_type;

-- Show recent activity
SELECT '' as '';
SELECT 'RECENT ACTIVITY (Last 7 days)' as info;
SELECT 
  s.email,
  s.subscribed_at as 'Subscription Date',
  COUNT(el.id) as 'Emails Sent'
FROM subscribers s
LEFT JOIN email_logs el ON s.id = el.subscriber_id
WHERE datetime(s.subscribed_at) > datetime('now', '-7 days')
GROUP BY s.id, s.email
ORDER BY s.subscribed_at DESC;

-- Show unconfirmed subscribers
SELECT '' as '';
SELECT 'UNCONFIRMED SUBSCRIBERS' as info;
SELECT 
  email,
  subscribed_at as 'Subscribed Date',
  confirmation_token as 'Confirmation Token'
FROM subscribers 
WHERE confirmed = 0
ORDER BY subscribed_at DESC;