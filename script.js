document.addEventListener('DOMContentLoaded', () => {
    fetch('games.json')
      .then(response => response.json())
      .then(games => {
        const container = document.getElementById('gallery-container');
        games.forEach(game => {
          const article = document.createElement('article');
          article.className = 'gallery-item';
          article.innerHTML = `
            <a href="${game.link}">
              <img src="${game.image}" alt="${game.title}">
              <div class="desc">${game.description}</div>
            </a>
          `;
          container.appendChild(article);
        });
      })
      .catch(error => {
        console.error('Error loading the games:', error);
      });
  });
  