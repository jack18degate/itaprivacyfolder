const fs = require('fs');

const file = 'src/pages/fisco.astro';
let content = fs.readFileSync(file, 'utf8');

// If already updated
if (content.includes('max-w-[1400px]')) {
  process.exit(0);
}

// 1. Applica maxWidth in <Layout>
content = content.replace(/<Layout title=\{([^}]+)\}>/, '<Layout title={$1} maxWidth="max-w-[1300px] xl:max-w-[1400px]">');

// 2. Estrai Header
const headerMatch = content.match(/<header.*?<\/header>/s);
const header = headerMatch[0];
content = content.replace(headerMatch[0], '');

// 3. Estrai Sidebar (Fino al tag closing della grid </div> che precede <script )
const sidebarRegex = /<!-- Sidebar Navigation Desktop -->\s*<div class="hidden lg:block lg:col-span-4">\s*(<div class="sticky.*?<\/div>)\s*<\/div>\s*<\/div>/s;
const match = content.match(sidebarRegex);
const stickySidebar = match[1];

// 4. Rimuovi vecchio grid wrapper
content = content.replace(/<div class="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8">\s*<div class="lg:col-span-8 space-y-6 lg:space-y-10">/s, '');

// Rimuovi la sidebar e chiudi propriamente il Main container
content = content.replace(sidebarRegex, '    </div>\n  </div>');

// 5. Crea Nuova Struttura (Sidebar sx -> Content dx)
const newStructure = `
  <div class="flex flex-col lg:flex-row gap-6 lg:gap-10 xl:gap-12 items-start mt-2">
    <!-- Sidebar Navigation Left -->
    <div class="hidden lg:block w-[240px] xl:w-[270px] shrink-0 sticky top-24 order-2 lg:order-1">
      ${stickySidebar.replace('sticky top-24 ', '')}
    </div>

    <!-- Main Content Right -->
    <div class="flex-1 min-w-0 space-y-6 lg:space-y-10 order-1 lg:order-2 w-full">
      ${header}
`;

content = content.replace(/(<Layout[^>]*>)/, `$1\n${newStructure}`);

fs.writeFileSync(file, content);
console.log("Updated fisco.astro");
