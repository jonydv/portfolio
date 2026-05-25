const fs = require('fs');
let t = fs.readFileSync('src/styles.scss', 'utf8');
let lines = t.split('\n').slice(0, 157);
const c = `
// Premium UI Utilities
.glass-panel {
  background: rgba(11, 11, 11, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

.hover-lift {
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(100, 255, 218, 0.15);
  }
}

.neon-glow:hover {
  box-shadow: 0 0 15px rgba(100, 255, 218, 0.4), 0 0 30px rgba(100, 255, 218, 0.2);
}
`;
fs.writeFileSync('src/styles.scss', lines.join('\n') + c);
