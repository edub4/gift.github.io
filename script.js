document.addEventListener('DOMContentLoaded', function() {
  // Inicializa o carrossel
  initCarousel();
  
  // Configura o contador
  setupCountdown();
  
  // Configura o player do Spotify
  setupSpotifyPlayer();
});

// Função para inicializar o carrossel
function initCarousel() {
  const images = [
    '/img/foto1.jpeg',
    '/img/foto2.jpeg',
    '/img/foto3.jpeg',
    '/img/foto4.jpeg',
    '/img/foto5.jpeg'
  ];
  
  const swiperWrapper = document.querySelector('.swiper-wrapper');
  
  // Adiciona as imagens ao carrossel
  images.forEach(imgUrl => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      slide.innerHTML = `<img src="${imgUrl}" alt="Imagem do carrossel">`;
      swiperWrapper.appendChild(slide);
  });
  
  // Inicializa o Swiper
  new Swiper('.swiper', {
      loop: true,
      autoplay: {
          delay: 3000,
      },
      pagination: {
          el: '.swiper-pagination',
          clickable: true,
      },
      navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
      },
  });
}

// Função para configurar o contador
function setupCountdown() {
  const targetDate = new Date('2024-09-07T15:00:00');
  
  function updateCountdown() {
      const now = new Date();
      const diff = now - targetDate;
      
      // Calcula os valores
      const seconds = Math.floor(diff / 1000) % 60;
      const minutes = Math.floor(diff / (1000 * 60)) % 60;
      const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24)) % 30;
      const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30)) % 12;
      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
      
      // Atualiza os elementos HTML
      document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
      document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
      document.getElementById('hours').textContent = String(hours).padStart(2, '0');
      document.getElementById('days').textContent = String(days).padStart(2, '0');
      document.getElementById('months').textContent = String(months).padStart(2, '0');
      document.getElementById('years').textContent = String(years).padStart(2, '0');
  }
  
  // Atualiza imediatamente e depois a cada segundo
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Função para configurar o player do Spotify
function setupSpotifyPlayer() {
  const searchButton = document.getElementById('search-song');
  const songInput = document.getElementById('song-input');
  const playerContainer = document.getElementById('spotify-player');
  
  searchButton.addEventListener('click', function() {
      const songName = songInput.value.trim();
      if (songName) {
          searchSpotifyTrack(songName);
      }
  });
  
  // Opcional: permitir busca ao pressionar Enter
  songInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
          const songName = songInput.value.trim();
          if (songName) {
              searchSpotifyTrack(songName);
          }
      }
  });
}

// Função para buscar uma música no Spotify
function searchSpotifyTrack(query) {
  // Nota: Para usar a API do Spotify, você precisará se registrar no Spotify Developer Dashboard
  // e obter um token de acesso. Esta é uma implementação simplificada.
  
  // Substitua este token pelo seu próprio token de acesso do Spotify
  const accessToken = 'SEU_ACCESS_TOKEN_DO_SPOTIFY';
  
  // Limpa o player atual
  const playerContainer = document.getElementById('spotify-player');
  playerContainer.innerHTML = '<p>Carregando...</p>';
  
  // Faz a busca na API do Spotify
  fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`, {
      headers: {
          'Authorization': `Bearer ${accessToken}`
      }
  })
  .then(response => response.json())
  .then(data => {
      if (data.tracks.items.length > 0) {
          const track = data.tracks.items[0];
          embedSpotifyPlayer(track.id);
      } else {
          playerContainer.innerHTML = '<p>Nenhuma música encontrada. Tente outro termo.</p>';
      }
  })
  .catch(error => {
      console.error('Erro ao buscar música:', error);
      playerContainer.innerHTML = '<p>Erro ao buscar música. Verifique o console para detalhes.</p>';
  });
}

// Função para incorporar o player do Spotify
function embedSpotifyPlayer(trackId) {
  const playerContainer = document.getElementById('spotify-player');
  playerContainer.innerHTML = `
      <iframe src="https://open.spotify.com/embed/track/${trackId}" 
              width="100%" 
              height="80" 
              frameborder="0" 
              allowtransparency="true" 
              allow="encrypted-media">
      </iframe>
  `;
}
// Função para criar corações caindo
function createFallingHearts() {
  // Quantidade de corações na tela
  const heartCount = 15;
  
  // Cores dos corações (pode personalizar)
  const colors = ['#ff0000', '#ff69b4', '#ff1493', '#ff00ff', '#ff6347'];
  
  // Cria os corações
  for (let i = 0; i < heartCount; i++) {
      setTimeout(() => {
          const heart = document.createElement('div');
          heart.innerHTML = '❤';
          heart.classList.add('heart');
          
          // Posição aleatória na horizontal
          const left = Math.random() * 100;
          heart.style.left = `${left}%`;
          
          // Tamanho aleatório
          const size = Math.random() * 20 + 10;
          heart.style.fontSize = `${size}px`;
          
          // Cor aleatória
          const colorIndex = Math.floor(Math.random() * colors.length);
          heart.style.color = colors[colorIndex];
          
          // Duração e atraso da animação (cada coração cai em velocidade diferente)
          const duration = Math.random() * 5 + 5;
          heart.style.animationDuration = `${duration}s`;
          
          // Adiciona o coração ao corpo do documento
          document.body.appendChild(heart);
          
          // Remove o coração depois que terminar de cair
          setTimeout(() => {
              heart.remove();
          }, duration * 1000);
      }, i * 1000); // Espaça a criação dos corações
  }
  
  // Cria novos corações periodicamente
  setInterval(createFallingHearts, heartCount * 1000);
}

// Inicia o efeito quando a página carrega
window.addEventListener('load', createFallingHearts);
