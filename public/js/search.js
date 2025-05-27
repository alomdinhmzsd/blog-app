document.addEventListener('DOMContentLoaded', () => {
  const searchBox = document.getElementById('searchBox');
  const resultsContainer = document.getElementById('searchResults');
  let postsIndex = [];

  // Fetch search index
  fetch('/search-index')
    .then((res) => res.json())
    .then((data) => {
      postsIndex = data;
    })
    .catch((err) => {
      console.error('Failed to load search index:', err);
    });

  // Live search logic
  searchBox.addEventListener('input', () => {
    const term = searchBox.value.toLowerCase().trim();
    if (!term) {
      resultsContainer.innerHTML = '';
      return;
    }

    const matches = postsIndex.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
    );

    resultsContainer.innerHTML = matches
      .map(
        (p) => `<li><a href="/post/${p.category}/${p.slug}">${p.title}</a></li>`
      )
      .join('');
  });
});
