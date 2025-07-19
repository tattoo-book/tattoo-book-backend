// jest.setup.ts
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

// Optional: log something to verify
console.log('Loaded .env.test for Jest');
