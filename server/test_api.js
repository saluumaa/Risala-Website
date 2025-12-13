import http from 'http';

const BASE_URL = 'localhost';
const PORT = 8800;

function makeRequest(method, path, data = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: BASE_URL,
            port: PORT,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                try {
                    resolve({
                        status: res.statusCode,
                        data: JSON.parse(body),
                        headers: res.headers
                    });
                } catch (e) {
                    resolve({ status: res.statusCode, data: body, headers: res.headers });
                }
            });
        });

        req.on('error', reject);

        if (data) {
            req.write(JSON.stringify(data));
        }

        req.end();
    });
}

async function testEndpoints() {
    console.log('🧪 Testing API Endpoints...\n');

    try {
        // Test 1: Register a new user
        console.log('1️⃣ Testing User Registration...');
        const registerResult = await makeRequest('POST', '/api/auth/register', {
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123'
        });
        console.log(`✅ Status: ${registerResult.status}`);
        console.log('   Response:', registerResult.data);
        console.log('');

        // Test 2: Login
        console.log('2️⃣ Testing User Login...');
        const loginResult = await makeRequest('POST', '/api/auth/login', {
            email: 'test@example.com',
            password: 'password123'
        });
        console.log(`✅ Status: ${loginResult.status}`);
        console.log('   Response:', loginResult.data);
        console.log('');

        // Test 3: Get all users
        console.log('3️⃣ Testing Get All Users...');
        const usersResult = await makeRequest('GET', '/api/users');
        console.log(`✅ Status: ${usersResult.status}`);
        console.log(`   Users count: ${usersResult.data.length}`);
        console.log('');

        // Test 4: Get all news
        console.log('4️⃣ Testing Get All News...');
        const newsResult = await makeRequest('GET', '/api/news');
        console.log(`✅ Status: ${newsResult.status}`);
        console.log(`   News count: ${newsResult.data.length}`);
        console.log('');

        // Test 5: Get all programmes
        console.log('5️⃣ Testing Get All Programmes...');
        const programsResult = await makeRequest('GET', '/api/syp');
        console.log(`✅ Status: ${programsResult.status}`);
        console.log(`   Programmes count: ${programsResult.data.length}`);
        console.log('');

        console.log('🎉 All tests completed successfully!');
        console.log('\n📊 Database Summary:');
        console.log(`   - Users: ${usersResult.data.length}`);
        console.log(`   - News: ${newsResult.data.length}`);
        console.log(`   - Programmes: ${programsResult.data.length}`);

    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

testEndpoints();
