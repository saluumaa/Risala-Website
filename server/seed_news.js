import sequelize from './config/db.js';
import { Post, User } from './models/index.js';
import dotenv from 'dotenv';

dotenv.config();

const seedNews = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected...');

        const adminUser = await User.findOne({ where: { role: 'admin' } });

        if (!adminUser) {
            console.error('❌ Admin user not found. Please run seed_data.js first.');
            process.exit(1);
        }

        const newsItems = [
            {
                title: 'Successful Completion of Water Well Project',
                body: 'We are proud to announce the successful completion of a new water well in the rural district of Gabiley. This project will provide clean and safe drinking water to over 500 families in the area. Access to clean water is a fundamental human right, and this initiative marks a significant step towards improving public health and reducing waterborne diseases in the community.',
                date: new Date(),
                place: 'Gabiley, Somaliland',
                target: 'Community',
                authorId: adminUser.id,
                images: []
            },
            {
                title: 'Annual Health Camp serves 1000+ Patients',
                body: 'Our annual free health camp held in Hargeisa was a massive success, serving over 1000 patients in just three days. A team of dedicated doctors and nurses provided free check-ups, medicines, and consultations. We focused on maternal health, pediatric care, and general wellness. We thank our volunteers and donors for making this possible.',
                date: new Date(Date.now() - 86400000 * 5), // 5 days ago
                place: 'Hargeisa, Somaliland',
                target: 'Health',
                authorId: adminUser.id,
                images: []
            }
        ];

        for (const item of newsItems) {
            const [post, created] = await Post.findOrCreate({
                where: { title: item.title },
                defaults: item
            });

            if (created) {
                console.log(`✅ Created news: ${item.title}`);
            } else {
                console.log(`ℹ️ News already exists: ${item.title}`);
            }
        }

        console.log('🎉 News seeding completed!');
        process.exit(0);

    } catch (error) {
        console.error('❌ Error seeding news:', error);
        process.exit(1);
    }
};

seedNews();
