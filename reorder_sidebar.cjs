const fs = require('fs');

// 1. UPDATE LAYOUT.ASTRO
const layoutPath = 'src/layouts/Layout.astro';
let lay = fs.readFileSync(layoutPath, 'utf8');

if (!lay.includes('const { title, maxWidth = "max-w-5xl" } = Astro.props;')) {
   lay = lay.replace(/const \{ title \} = Astro\.props;/, 'const { title, maxWidth = "max-w-5xl" } = Astro.props;');
   lay = lay.replace(/<main class="flex-grow w-full max-w-5xl mx-auto px-4 lg:px-6 py-5 lg:py-10 relative z-10">/, 
                     '<main class={`flex-grow w-full ${maxWidth} mx-auto px-4 lg:px-6 py-5 lg:py-10 relative z-10`}>');
   fs.writeFileSync(layoutPath, lay);
}

// 2. REORDER PAGES
const pages = [
  'src/pages/fisco.astro',
  'src/pages/exchanges.astro',
  'src/pages/spend.astro',
  'src/pages/wallets.astro',
  'src/pages/vpn.astro'
];

pages.forEach(file => {
   if (!fs.existsSync(file)) return;
   let content = fs.readFileSync(file, 'utf8');

   if (content.includes('max-w-[1400px]')) {
      console.log(`${file} is already updated, skipping.`);
      return; 
   }

   // 2.a Add maxWidth to Layout
   content = content.replace(/<Layout title=\{([^}]+)\}>/, '<Layout title={$1} maxWidth="max-w-[1300px] xl:max-w-[1400px]">');

   // 2.b Extract Header
   const headerRegex = /<header.*?<\/header>/s;
   const headerMatch = content.match(headerRegex);
   if (!headerMatch) return;
   const header = headerMatch[0];

   // 2.c Extract Sidebar
   // Il blocco inizia con <!-- Sidebar e finsce prima di </div>\n</Layout>
   const sidebarRegex = /<!-- Sidebar Navigation Desktop -->\s*<div class="hidden lg:block lg:col-span-4">\s*(<div class="sticky.*?<\/div>)\s*<\/div>\s*<\/div>\s*<\/Layout>/s;
   const match = content.match(sidebarRegex);
   if (!match) return;
   const stickySidebar = match[1]; // L'interno della sidebar

   // 2.d Rimuovi Header, Grid Wrapper Iniziale e Sidebar originari
   content = content.replace(headerRegex, '');
   content = content.replace(/<div class="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8">\s*<div class="lg:col-span-8 space-y-6 lg:space-y-10">/s, '');
   content = content.replace(sidebarRegex, '    </div>\n  </div>\n</Layout>');

   // 2.e Costruisci il nuovo wrapper
   const newStructure = `
  <div class="flex flex-col lg:flex-row gap-6 lg:gap-10 xl:gap-12 items-start mt-2">
    <!-- Sidebar Navigation Left -->
    <div class="hidden lg:block w-[240px] xl:w-[270px] shrink-0 sticky top-24 order-2 lg:order-1">
      ${stickySidebar.replace('sticky top-24 ', '') /* Evito doppio sticky, l'ho messo sul parent */}
    </div>

    <!-- Main Content Right -->
    <div class="flex-1 min-w-0 space-y-6 lg:space-y-10 order-1 lg:order-2 w-full">
      ${header}
`;

   // 2.f Inserisci il newStructure dove originariamente c'era la griglia (sotto al tag <Layout ...>)
   // Dato che abbiamo rimosso l'header, ora il file inzia con <Layout...>\n\n<Contenuto>
   content = content.replace(/(<Layout[^>]*>)/, `$1\n${newStructure}`);

   fs.writeFileSync(file, content);
   console.log(`Updated ${file}`);
});
