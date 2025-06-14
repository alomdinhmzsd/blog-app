const express = require('express');
const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');
const hljs = require('highlight.js');
const matter = require('gray-matter'); // 🧠 frontmatter parser

const app = express();
const port = process.env.PORT || 4242;

// Setup markdown-it with highlight.js
const md = new MarkdownIt({
  html: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${
          hljs.highlight(str, { language: lang }).value
        }</code></pre>`;
      } catch (_) {}
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
  },
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Utility: Convert slug to title case
function titleCase(str) {
  return str
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

// Utility: Wrap <table> elements in a scrollable container
function wrapTablesAndPre(html) {
  return html
    .replace(/<table>/g, '<div class="table-wrapper"><table>')
    .replace(/<\/table>/g, '</table></div>')
    .replace(
      /<pre class="hljs">/g,
      '<div class="code-wrapper"><pre class="hljs">'
    )
    .replace(/<\/pre>/g, '</pre></div>');
}

// Home page: List all posts grouped by category
app.get('/', (req, res) => {
  const postsDir = path.join(__dirname, 'posts');

  fs.readdir(postsDir, { withFileTypes: true }, (err, categories) => {
    if (err) return res.status(500).send('Failed to read posts directory.');

    const data = [];

    for (const dirent of categories) {
      if (!dirent.isDirectory()) continue;
      const catName = dirent.name;
      const catPath = path.join(postsDir, catName);
      const files = fs.readdirSync(catPath).filter((f) => f.endsWith('.md'));

      const posts = files.map((file) => {
        const slug = path.basename(file, '.md');
        return {
          slug,
          title: titleCase(slug),
          category: catName,
        };
      });

      if (posts.length > 0) {
        data.push({
          category: catName,
          title: titleCase(catName),
          posts,
        });
      }
    }

    res.render('index', { categories: data });
  });
});

// Individual post route
app.get('/post/:category/:slug', (req, res) => {
  const { category, slug } = req.params;
  const filePath = path.join(__dirname, 'posts', category, `${slug}.md`);

  fs.readFile(filePath, 'utf8', (err, fileContent) => {
    if (err) return res.status(404).send('Post not found.');

    const { content, data } = matter(fileContent); // 🧠 Extract metadata

    const questionLinks = [];

    // Add anchors to questions
    const enhancedMarkdown = content.replace(
      /(Question\s+'SAA-(Q\d+)')/g,
      (match, _full, qid) => {
        const anchorId = `saa-${qid.toLowerCase()}`;
        questionLinks.push({ label: `SAA-${qid}`, anchor: anchorId });
        return `<div id="${anchorId}" data-anchor="${anchorId}" class="anchor-wrapper"><strong><span class="saa-label">${match}</span></strong></div>`;
      }
    );

    let htmlContent = '';
    try {
      const rendered = md.render(enhancedMarkdown);
      htmlContent = `<div class="markdown-body">${wrapTablesAndPre(
        rendered
      )}</div>`;
    } catch (err) {
      console.error('❌ Markdown rendering failed for:', filePath);
      console.error(err);
      return res.status(500).send('Error rendering post content.');
    }

    res.render('post', {
      title: data.title || titleCase(slug),
      category: data.category || titleCase(category),
      content: htmlContent,
      questionLinks,
      tags: data.tags || [],
      questionId: data.questionId || '',
    });
  });
});

// Search endpoint
app.get('/search-index', (req, res) => {
  const postsDir = path.join(__dirname, 'posts');
  const index = [];

  fs.readdir(postsDir, { withFileTypes: true }, (err, categories) => {
    if (err) return res.status(500).json({ error: 'Failed to read posts' });

    categories.forEach((category) => {
      if (!category.isDirectory()) return;
      const catPath = path.join(postsDir, category.name);
      const files = fs.readdirSync(catPath);

      files.forEach((file) => {
        if (file.endsWith('.md')) {
          const slug = path.basename(file, '.md');
          index.push({
            title: titleCase(slug),
            category: category.name,
            slug,
          });
        }
      });
    });

    res.json(index);
  });
});

app.listen(port, () => {
  console.log(`🚀 Blog running at http://localhost:${port}`);
});
