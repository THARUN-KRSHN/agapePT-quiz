#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting production build process...\n');

// Set production environment
process.env.NODE_ENV = 'production';
process.env.NEXT_TELEMETRY_DISABLED = '1';

try {
  // Clean previous builds
  console.log('🧹 Cleaning previous builds...');
  if (fs.existsSync('.next')) {
    fs.rmSync('.next', { recursive: true, force: true });
  }
  if (fs.existsSync('out')) {
    fs.rmSync('out', { recursive: true, force: true });
  }
  
  // Install dependencies if needed
  console.log('📦 Checking dependencies...');
  if (!fs.existsSync('node_modules')) {
    console.log('Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });
  }
  
  // Run type checking
  console.log('🔍 Running type checking...');
  execSync('npm run type-check', { stdio: 'inherit' });
  
  // Run linting
  console.log('✅ Running linting...');
  execSync('npm run lint', { stdio: 'inherit' });
  
  // Generate Prisma client
  console.log('🗄️  Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  
  // Build the application
  console.log('🏗️  Building application...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('\n🎉 Production build completed successfully!');
  console.log('\n📊 Build statistics:');
  
  // Show build output size
  const buildDir = path.join(process.cwd(), '.next');
  if (fs.existsSync(buildDir)) {
    try {
      const stats = fs.statSync(buildDir);
      const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
      console.log(`📁 Build directory size: ${sizeInMB} MB`);
    } catch (error) {
      console.log('📁 Build directory size: Unable to calculate');
    }
  }
  
  console.log('\n🚀 To start the production server:');
  console.log('   npm run start:production');
  console.log('\n📈 To analyze bundle:');
  console.log('   npm run build:analyze');
  
} catch (error) {
  console.error('\n❌ Build failed:', error.message);
  process.exit(1);
}
