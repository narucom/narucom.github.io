import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// dist 폴더의 내용을 임시 폴더로 복사
const tempDir = path.join(__dirname, 'temp-deploy');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

// dist 폴더의 내용을 temp-deploy로 복사
const distDir = path.join(__dirname, 'dist');
fs.readdirSync(distDir).forEach((file) => {
  const sourcePath = path.join(distDir, file);
  const destPath = path.join(tempDir, file);
  if (fs.lstatSync(sourcePath).isDirectory()) {
    fs.mkdirSync(destPath);
    fs.readdirSync(sourcePath).forEach((subFile) => {
      const subSourcePath = path.join(sourcePath, subFile);
      const subDestPath = path.join(destPath, subFile);
      fs.copyFileSync(subSourcePath, subDestPath);
    });
  } else {
    fs.copyFileSync(sourcePath, destPath);
  }
});

// .nojekyll 파일 생성
fs.writeFileSync(path.join(tempDir, '.nojekyll'), '');

// gh-pages 브랜치로 전환하고 배포
try {
  execSync('git checkout gh-pages', { stdio: 'inherit' });
  execSync('git rm -rf .', { stdio: 'inherit' });
  execSync(`xcopy /E /I /Y "${tempDir}\\*" "."`, { stdio: 'inherit' });
  execSync('git add .', { stdio: 'inherit' });
  execSync('git commit -m "Deploy to GitHub Pages"', { stdio: 'inherit' });
  execSync('git push origin gh-pages --force', { stdio: 'inherit' });
  execSync('git checkout main', { stdio: 'inherit' });

  // 임시 폴더 정리
  fs.rmSync(tempDir, { recursive: true, force: true });

  console.log('Deployment completed successfully!');
} catch (error) {
  console.error('Deployment failed:', error);
  process.exit(1);
}
