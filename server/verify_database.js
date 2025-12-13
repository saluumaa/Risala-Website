import sequelize from './config/db.js';
import { User, Post, Chat, Message, SProgramme } from './models/index.js';

async function verifyDatabase() {
    console.log('🔍 Database Verification Report\n');
    console.log('='.repeat(60));

    try {
        // Test connection
        await sequelize.authenticate();
        console.log('✅ Database Connection: SUCCESS\n');

        // Get all tables
        const [tables] = await sequelize.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema='public' 
            ORDER BY table_name
        `);

        console.log('📋 Tables Created:');
        tables.forEach((table, index) => {
            console.log(`   ${index + 1}. ${table.table_name}`);
        });
        console.log('');

        // Check each model
        console.log('📊 Model Verification:\n');

        // Users
        const userCount = await User.count();
        const [userColumns] = await sequelize.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name='Users' 
            ORDER BY ordinal_position
        `);
        console.log('👤 Users Table:');
        console.log(`   Records: ${userCount}`);
        console.log('   Columns:');
        userColumns.forEach(col => {
            console.log(`      - ${col.column_name} (${col.data_type})`);
        });
        console.log('');

        // Posts
        const postCount = await Post.count();
        const [postColumns] = await sequelize.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name='Posts' 
            ORDER BY ordinal_position
        `);
        console.log('📰 Posts Table:');
        console.log(`   Records: ${postCount}`);
        console.log('   Columns:');
        postColumns.forEach(col => {
            console.log(`      - ${col.column_name} (${col.data_type})`);
        });
        console.log('');

        // Chats
        const chatCount = await Chat.count();
        const [chatColumns] = await sequelize.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name='Chats' 
            ORDER BY ordinal_position
        `);
        console.log('💬 Chats Table:');
        console.log(`   Records: ${chatCount}`);
        console.log('   Columns:');
        chatColumns.forEach(col => {
            console.log(`      - ${col.column_name} (${col.data_type})`);
        });
        console.log('');

        // Messages
        const messageCount = await Message.count();
        const [messageColumns] = await sequelize.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name='Messages' 
            ORDER BY ordinal_position
        `);
        console.log('✉️  Messages Table:');
        console.log(`   Records: ${messageCount}`);
        console.log('   Columns:');
        messageColumns.forEach(col => {
            console.log(`      - ${col.column_name} (${col.data_type})`);
        });
        console.log('');

        // SProgrammes
        const programmeCount = await SProgramme.count();
        const [programmeColumns] = await sequelize.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name='SProgrammes' 
            ORDER BY ordinal_position
        `);
        console.log('🎓 SProgrammes Table:');
        console.log(`   Records: ${programmeCount}`);
        console.log('   Columns:');
        programmeColumns.forEach(col => {
            console.log(`      - ${col.column_name} (${col.data_type})`);
        });
        console.log('');

        // UserChats junction table
        const [userChatColumns] = await sequelize.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name='UserChats' 
            ORDER BY ordinal_position
        `);
        console.log('🔗 UserChats Junction Table:');
        console.log('   Columns:');
        userChatColumns.forEach(col => {
            console.log(`      - ${col.column_name} (${col.data_type})`);
        });
        console.log('');

        // Check foreign keys
        const [foreignKeys] = await sequelize.query(`
            SELECT
                tc.table_name, 
                kcu.column_name, 
                ccu.table_name AS foreign_table_name,
                ccu.column_name AS foreign_column_name 
            FROM information_schema.table_constraints AS tc 
            JOIN information_schema.key_column_usage AS kcu
                ON tc.constraint_name = kcu.constraint_name
                AND tc.table_schema = kcu.table_schema
            JOIN information_schema.constraint_column_usage AS ccu
                ON ccu.constraint_name = tc.constraint_name
                AND ccu.table_schema = tc.table_schema
            WHERE tc.constraint_type = 'FOREIGN KEY'
            ORDER BY tc.table_name, kcu.column_name
        `);

        console.log('🔑 Foreign Key Relationships:');
        foreignKeys.forEach(fk => {
            console.log(`   ${fk.table_name}.${fk.column_name} → ${fk.foreign_table_name}.${fk.foreign_column_name}`);
        });
        console.log('');

        console.log('='.repeat(60));
        console.log('✅ Database verification completed successfully!');
        console.log('');
        console.log('📈 Summary:');
        console.log(`   Total Tables: ${tables.length}`);
        console.log(`   Total Users: ${userCount}`);
        console.log(`   Total Posts: ${postCount}`);
        console.log(`   Total Chats: ${chatCount}`);
        console.log(`   Total Messages: ${messageCount}`);
        console.log(`   Total Programmes: ${programmeCount}`);
        console.log(`   Foreign Keys: ${foreignKeys.length}`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Verification failed:', error);
        process.exit(1);
    }
}

verifyDatabase();
