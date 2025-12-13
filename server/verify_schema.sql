-- Check all tables in the database
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema='public' 
ORDER BY table_name;

-- Check Users table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'Users'
ORDER BY ordinal_position;

-- Check Posts table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'Posts'
ORDER BY ordinal_position;

-- Check Chats table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'Chats'
ORDER BY ordinal_position;

-- Check Messages table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'Messages'
ORDER BY ordinal_position;

-- Check SProgrammes table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'SProgrammes'
ORDER BY ordinal_position;

-- Check UserChats junction table
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'UserChats'
ORDER BY ordinal_position;
