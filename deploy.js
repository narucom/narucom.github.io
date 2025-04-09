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

// 현재 브랜치 이름 저장
const currentBranch = execSync('git rev-parse --abbrev-ref HEAD')
  .toString()
  .trim();

// 임시 디렉토리가 있으면 삭제
if (fs.existsSync(tempPath)) {
  fs.rmSync(tempPath, { recursive: true, force: true });
}

// 임시 디렉토리 생성 및 dist 내용 복사
fs.mkdirSync(tempPath, { recursive: true });
fs.copyFileSync(
  path.join(__dirname, '.gitignore'),
  path.join(tempPath, '.gitignore')
);

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

// gh-pages 브랜치 생성 또는 전환
console.log('Switching to gh-pages branch...');
try {
  execSync('git checkout gh-pages', { stdio: 'inherit' });
} catch (error) {
  execSync('git checkout --orphan gh-pages', { stdio: 'inherit' });
  execSync('git rm -rf .', { stdio: 'inherit' });
}

// 임시 디렉토리의 파일들을 현재 디렉토리로 복사
console.log('Copying files to gh-pages branch...');
const files = fs.readdirSync(tempPath);
files.forEach((file) => {
  const srcPath = path.join(tempPath, file);
  const destPath = path.join(__dirname, file);
  if (fs.lstatSync(srcPath).isDirectory()) {
    copyDir(srcPath, destPath);
  } else {
    fs.copyFileSync(srcPath, destPath);
  }
});

// 변경사항을 커밋하고 푸시
console.log('Committing and pushing changes...');
execSync('git add .', { stdio: 'inherit' });
execSync('git commit -m "Update gh-pages with dist contents"', {
  stdio: 'inherit',
});
execSync('git push origin gh-pages --force', { stdio: 'inherit' });

// 임시 디렉토리 삭제
console.log('Cleaning up...');
fs.rmSync(tempPath, { recursive: true, force: true });

// 원래 브랜치로 돌아가기
console.log(`Switching back to ${currentBranch} branch...`);
execSync(`git checkout ${currentBranch}`, { stdio: 'inherit' });

console.log('Deployment completed successfully!');
