import sequelize from './config/db.js';
import { User, Post, SProgramme } from './models/index.js';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const seedData = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected...');

    // 1. Create Admin User
    const adminEmail = 'admin@risala.org';
    const adminPassword = 'adminpassword123';
    const hashedPassword = await bcryptjs.hash(adminPassword, 10);

    const [adminUser, created] = await User.findOrCreate({
      where: { email: adminEmail },
      defaults: {
        username: 'Admin User',
        password: hashedPassword,
        role: 'admin'
      }
    });

    if (created) {
      console.log('✅ Admin user created successfully.');
      console.log(`   Email: ${adminEmail}`);
      console.log(`   Password: ${adminPassword}`);
    } else {
      console.log('ℹ️ Admin user already exists.');
    }

    // 2. Create News Post
    const newsTitle = 'Risala Launches New Community Center';
    const newsBody = 'We are thrilled to announce the opening of our new community center in Borama. This facility will serve as a hub for our educational and health programs, providing a safe space for youth and families. Join us for the grand opening ceremony next week!';

    const [newsPost, newsCreated] = await Post.findOrCreate({
      where: { title: newsTitle },
      defaults: {
        body: newsBody,
        date: new Date(),
        place: 'Borama, Somaliland',
        target: 'Community',
        authorId: adminUser.id,
        images: [] // Empty array for now
      }
    });

    if (newsCreated) {
      console.log('✅ News post created successfully.');
    } else {
      console.log('ℹ️ News post already exists.');
    }

    // 3. Register Student in SProgramme
    const studentName = 'Ahmed Mohamed';
    const [student, studentCreated] = await SProgramme.findOrCreate({
      where: { participantName: studentName },
      defaults: {
        telephoneNo: '0634455667',
        age: 16,
        gender: 'Male',
        educationLevel: 'Secondary',
        school: 'Al-Aqsa Secondary School',
        area: 'Shacabka',
        isActive: true,
        authorId: adminUser.id
      }
    });

    if (studentCreated) {
      console.log('✅ Student registered successfully.');
    } else {
      console.log('ℹ️ Student registration already exists.');
    }

    console.log('🎉 Seeding completed!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
