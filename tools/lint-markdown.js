const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, '..', 'posts');

function checkMarkdownFormat(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const issues = [];

  if (!content.includes('#')) {
    issues.push('⚠️  No headings');
  }
  if (!content.startsWith('---')) {
    issues.push('⚠️  No frontmatter');
  }
  if (content.includes('<table') && !content.includes('|')) {
    issues.push('⚠️  HTML table without Markdown fallback');
  }

  if (issues.length > 0) {
    console.warn(`[WARN] ${filePath}\n  ${issues.join('\n  ')}`);
  }
}

function walkPosts(dir) {
  fs.readdirSync(dir).forEach((entry) => {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) return walkPosts(fullPath);
    if (fullPath.endsWith('.md')) checkMarkdownFormat(fullPath);
  });
}

walkPosts(postsDir);
