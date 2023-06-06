import { randomBytes } from 'crypto';

// Generate a random number between 32 and 64
const stringLength = Math.floor(Math.random() * 96) + 32;
// Generate a random string of the given length
const secret = randomBytes(stringLength).toString('hex');

// Print the secret to the console
console.log('Secret:', secret);
