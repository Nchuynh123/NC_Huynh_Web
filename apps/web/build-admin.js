import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
  console.log('Building @band/admin...');
  // Run build command for admin workspace from the monorepo root
  execSync('npm run build -w @band/admin', {
    cwd: path.resolve(__dirname, '../..'),
    stdio: 'inherit',
  });

  const srcDir = path.resolve(__dirname, '../admin/dist');
  const destDir = path.resolve(__dirname, './dist/admin');

  console.log(`Copying built files from ${srcDir} to ${destDir}...`);
  if (fs.existsSync(destDir)) {
    fs.rmSync(destDir, { recursive: true, force: true });
  }
  fs.mkdirSync(destDir, { recursive: true });

  function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
      }
      fs.readdirSync(src).forEach((childItemName) => {
        copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
      });
    } else {
      fs.copyFileSync(src, dest);
    }
  }

  copyRecursiveSync(srcDir, destDir);
  console.log('Successfully built and integrated @band/admin into @band/web!');
} catch (error) {
  console.error('Failed to build/copy @band/admin:', error);
  process.exit(1);
}
