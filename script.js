document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search');
  const sortSelect = document.getElementById('sort');
  let gamesData = [];

  // Fetch and display games
  fetch('games.json')
    .then(response => response.json())
    .then(games => {
      gamesData = games;
      sortAndDisplayGames('title-asc');  // Default to A-Z sorting
    })
    .catch(error => {
      console.error('Error loading the games:', error);
    });

  // Search games
  searchInput.addEventListener('input', () => {
    const searchQuery = searchInput.value.toLowerCase();
    const filteredGames = gamesData.filter(game => 
      game.title.toLowerCase().includes(searchQuery)
    );
    displayGames(filteredGames);
  });

  // Sort and filter games by console
  sortSelect.addEventListener('change', () => {
    const sortValue = sortSelect.value;
    sortAndDisplayGames(sortValue);
  });

  // Function to sort and display games
  function sortAndDisplayGames(sortValue) {
    let sortedGames = [...gamesData];

    if (sortValue === 'title-asc') {
      sortedGames.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortValue === 'n64') {
      sortedGames = sortedGames.filter(game => game.console === 'Nintendo N64');
    } else if (sortValue === 'genesis') {
      sortedGames = sortedGames.filter(game => game.console === 'Sega Genesis');
    } else if (sortValue === 'gba') {
      sortedGames = sortedGames.filter(game => game.console === 'Game Boy Advance');
    }

    displayGames(sortedGames);
  }

  // Function to display games
  function displayGames(games) {
    const container = document.getElementById('gallery-container');
    container.innerHTML = ''; // Clear existing content
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

    // Reapply hover effect after sorting
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
  }
});
