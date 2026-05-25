const fs = require('fs');
const files = ['nextjs.svg', 'tailwindcss.svg', 'aws.svg', 'claude.svg', 'nextauth.svg', 'tanstack.svg'];
for (const file of files) {
  try {
    let content = fs.readFileSync('src/assets/icons/' + file, 'utf8');
    if (!content.includes('<svg')) continue;
    if (!content.includes('fill=')) {
      content = content.replace('<svg ', '<svg fill="#cecece" ');
    } else {
      content = content.replace(/fill="[^"]*"/g, 'fill="#cecece"');
    }
    fs.writeFileSync('src/assets/icons/' + file, content);
  } catch(e) { console.error('Error with ' + file); }
}
