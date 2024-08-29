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

      const galleryItems = document.querySelectorAll('.gallery-item');

      galleryItems.forEach(item => {
          item.addEventListener('mousemove', (e) => {
              const rect = item.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;

              const rotateX = (y - rect.height / 2) / 20;
              const rotateY = (x - rect.width / 2) / 20;

              item.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
          });

          item.addEventListener('mouseleave', () => {
              item.style.transform = 'rotateX(0) rotateY(0)';
          });
      });
    })
    .catch(error => {
      console.error('Error loading the games:', error);
    });
});
