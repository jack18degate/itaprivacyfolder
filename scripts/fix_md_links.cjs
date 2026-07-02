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
  if(filePath.endsWith('.md')) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Markdown link: [testo](/path) -> [testo](/path/)
    // Ignora link che finiscono già con uno slash o che puntano a un'ancora
    let newContent = content.replace(/\]\(\/([a-zA-Z0-9-\/]+)\b\/?\)/g, '](/$$1/)');
    // Elimina i doppi slash accidentali se ci sono
    newContent = newContent.replace(/\]\(\/([a-zA-Z0-9-\/]+)\/\/\)/g, '](/$$1/)');
    
    if(content !== newContent) {
      fs.writeFileSync(filePath, newContent);
      console.log('Updated MD', filePath);
    }
  }
});
