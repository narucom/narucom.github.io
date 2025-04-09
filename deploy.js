import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 빌드 실행
console.log('Building project...');
execSync('npm run build', { stdio: 'inherit' });

// dist 디렉토리의 파일들을 임시 디렉토리로 복사
const distPath = path.join(__dirname, 'dist');
const tempPath = path.join(__dirname, 'temp');

// 임시 디렉토리가 있으면 삭제
if (fs.existsSync(tempPath)) {
  fs.rmSync(tempPath, { recursive: true, force: true });
}

// 임시 디렉토리 생성
fs.mkdirSync(tempPath);

// 디렉토리 복사 함수
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// dist 디렉토리 복사
console.log('Copying dist files...');
copyDir(distPath, tempPath);

// .nojekyll 파일 생성
fs.writeFileSync(path.join(tempPath, '.nojekyll'), '');

// gh-pages 브랜치로 전환
console.log('Switching to gh-pages branch...');
execSync('git checkout gh-pages', { stdio: 'inherit' });

// 현재 디렉토리의 모든 파일 삭제 (git 파일 제외)
console.log('Cleaning gh-pages branch...');
const currentFiles = fs.readdirSync(__dirname);
currentFiles.forEach((file) => {
  if (file !== '.git' && file !== 'temp') {
    const filePath = path.join(__dirname, file);
    if (fs.lstatSync(filePath).isDirectory()) {
      fs.rmSync(filePath, { recursive: true, force: true });
    } else {
      fs.unlinkSync(filePath);
    }
  }
});

// 임시 디렉토리의 파일들을 현재 디렉토리로 복사
console.log('Copying files to gh-pages branch...');
copyDir(tempPath, __dirname);

// 변경사항을 커밋하고 푸시
console.log('Committing and pushing changes...');
execSync('git add .', { stdio: 'inherit' });
execSync('git commit -m "Update gh-pages"', { stdio: 'inherit' });
execSync('git push origin gh-pages', { stdio: 'inherit' });

// 임시 디렉토리 삭제
console.log('Cleaning up...');
fs.rmSync(tempPath, { recursive: true, force: true });

// main 브랜치로 돌아가기
console.log('Switching back to main branch...');
execSync('git checkout main', { stdio: 'inherit' });

console.log('Deployment completed successfully!');
