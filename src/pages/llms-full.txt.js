import { getCollection } from 'astro:content';
import fs from 'fs';
import path from 'path';

export async function GET() {
  let output = '';

  // 1. Leggi l'indice principale da llms.txt in /public
  try {
    const publicLlmsPath = path.resolve('public', 'llms.txt');
    const indexContent = fs.readFileSync(publicLlmsPath, 'utf-8');
    output += indexContent;
    output += '\n\n---\n\n## Contenuto Completo Guide (Italiano)\n\n';
  } catch (error) {
    console.error('Errore durante la lettura di llms.txt', error);
  }

  // 2. Aggiungi il contenuto Markdown di tutte le guide in italiano
  try {
    const guideEntries = await getCollection('guide');
    
    guideEntries.forEach((entry) => {
      output += `### ${entry.data.title}\n`;
      output += `> ${entry.data.description}\n\n`;
      
      // Il body originale del file markdown senza il frontmatter YAML
      output += `${entry.body}\n\n`;
      output += `---\n\n`;
    });
  } catch (error) {
    console.error('Errore durante il fetch delle guide:', error);
  }

  output += '\n\n---\n\n## Complete Content of Guides (English)\n\n';

  // 3. Aggiungi il contenuto Markdown di tutte le guide in inglese
  try {
    const guideEntriesEn = await getCollection('guide_en');
    
    guideEntriesEn.forEach((entry) => {
      output += `### ${entry.data.title}\n`;
      output += `> ${entry.data.description}\n\n`;
      
      // Il body originale del file markdown senza il frontmatter YAML
      output += `${entry.body}\n\n`;
      output += `---\n\n`;
    });
  } catch (error) {
    console.error('Errore durante il fetch delle guide inglesi:', error);
  }

  return new Response(output, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
}
