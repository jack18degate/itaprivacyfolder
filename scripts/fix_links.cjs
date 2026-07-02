const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

walkDir('./src', (filePath) => {
  if(filePath.endsWith('.astro') || filePath.endsWith('.md')) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Sostituisci href="/qualcosa" con href="/qualcosa/"
    let newContent = content.replace(/href="\/([a-zA-Z0-9-]+)"/g, 'href="/$1/"');
    if(content !== newContent) {
      fs.writeFileSync(filePath, newContent);
      console.log('Updated', filePath);
    }
  }
});
