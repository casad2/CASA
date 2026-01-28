// Sistema de Abas Funcionais
document.addEventListener('DOMContentLoaded', function() {
    const menuLinks = document.querySelectorAll('#menu a');
    const mobileTabs = document.querySelectorAll('.mobile-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const backToTop = document.getElementById('backToTop');
    
    // Sistema de abas (desktop)
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove a classe active de todos os itens do menu
            menuLinks.forEach(item => {
                item.parentElement.classList.remove('active');
            });
            
            // Adiciona a classe active ao item clicado
            this.parentElement.classList.add('active');
            
            // Obtém o id da aba
            const tabId = this.getAttribute('data-tab');
            
            // Esconde todas as abas
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Mostra a aba clicada
            document.getElementById(tabId).classList.add('active');
            
            // Scroll suave para o topo da página ao mudar de aba
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Fecha todos os cards expandidos ao mudar de aba
            document.querySelectorAll('.card.expanded').forEach(card => {
                card.classList.remove('expanded');
            });
            
            // Inicializar carrossel se for para a aba Cinema
            if (tabId === 'cinema') {
                setTimeout(initCarousel, 100);
            }
        });
    });
    
    // Sistema de abas (mobile)
    mobileTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove a classe active de todos os tabs mobile
            mobileTabs.forEach(item => {
                item.classList.remove('active');
            });
            
            // Adiciona a classe active ao tab clicado
            this.classList.add('active');
            
            // Atualiza o menu desktop também
            const tabId = this.getAttribute('data-tab');
            menuLinks.forEach(item => {
                item.parentElement.classList.remove('active');
                if (item.getAttribute('data-tab') === tabId) {
                    item.parentElement.classList.add('active');
                }
            });
            
            // Obtém o id da aba
            const targetTabId = this.getAttribute('href').substring(1);
            
            // Esconde todas as abas
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Mostra a aba clicada
            document.getElementById(targetTabId).classList.add('active');
            
            // Scroll suave para o topo da página ao mudar de aba
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Fecha todos os cards expandidos ao mudar de aba
            document.querySelectorAll('.card.expanded').forEach(card => {
                card.classList.remove('expanded');
            });
            
            // Inicializar carrossel se for para a aba Cinema
            if (targetTabId === 'cinema') {
                setTimeout(initCarousel, 100);
            }
        });
    });
    
    // Botão voltar ao topo
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Fecha todos os cards expandidos ao voltar ao topo
        document.querySelectorAll('.card.expanded').forEach(card => {
            card.classList.remove('expanded');
        });
    });
    
    // Sistema de expansão dos cards
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Não expandir se clicar em links dentro do card
            if (e.target.tagName === 'A') return;
            
            // Fecha outros cards expandidos
            document.querySelectorAll('.card.expanded').forEach(otherCard => {
                if (otherCard !== this) {
                    otherCard.classList.remove('expanded');
                }
            });
            
            // Alterna o estado do card clicado
            this.classList.toggle('expanded');
        });
    });
    
    // Fecha cards ao clicar fora deles
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.card') && !e.target.closest('#menu') && !e.target.closest('.mobile-tabs')) {
            document.querySelectorAll('.card.expanded').forEach(card => {
                card.classList.remove('expanded');
            });
        }
    });
    
    // Animar elementos ao rolar
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.card, .sidebar-section');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Inicializar animações
    document.querySelectorAll('.card, .sidebar-section').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Executar uma vez ao carregar
    
    // ===== SISTEMA DO CARROSSEL =====
    
    // Inicializar carrossel quando a aba Cinema for carregada
    initCarousel();
});

// Sistema do Carrossel
function initCarousel() {
    const carouselData = [
        {
            title: "Enrolados",
            image: "https://image.tmdb.org/t/p/original/rXLw50QWqJVkQQ47Ic6M8bqWNU5.jpg"
        },
        {
            title: "Os Incríveis",
            image: "https://image.tmdb.org/t/p/original/pixYsUt2szQsuInRk59Wn9Kbyg4.jpg"
        },
        {
            title: "Ratatouille",
            image: "https://image.tmdb.org/t/p/original/jQ6Vuxe1CEPMXTF7d0fZgdIBY8U.jpg"
        },
        
        {
            title: "SpyXFamily",
            image: "https://image.tmdb.org/t/p/original/1BzFWEZROwAGjIpA4LI2hm1rqnB.jpg"
        },
        {
            title: "Viva a vida é uma festa",
            image: "https://image.tmdb.org/t/p/original/hWGEEuYpT0KnjEVRUYmNijjQ6G8.jpg"
        },
        
        

        
        
        
        
        
    ];

    const awardedData = [
        {
            title: "Os Incríveis",
            rating: "10",
            image: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/z8k5EhZZTLsCRF8NWjSe6snWNZg.jpg",
            year: "2004",
            award: "Melhor Animação"
        },
        {
            title: "Como Treinar Seu Dragão",
            rating: "10",
            image: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/sLpQSFj8A5jyUZStwzWfKpoJoAx.jpg",
            year: "2010",
            award: "Melhor Animação"
        },
        {
            title: "Enrolados",
            rating: "10",
            image: "https://www.themoviedb.org/t/p/w600_and_h900_face/wZzVkdnc0kw20lSJc13ZmgTPah3.jpg",
            year: "2010",
            award: "Melhor Animação"
        }
    ];

    // Inicializar carrossel apenas se estiver na aba Cinema
    const cinemaTab = document.getElementById('cinema');
    if (cinemaTab && cinemaTab.classList.contains('active')) {
        // Verificar se o carrossel já foi criado
        if (!document.getElementById('carouselContainer')) {
            // Criar estrutura do carrossel
            const carouselHTML = `
                <section class="carousel-section">
                    <div class="carousel">
                        <div class="carousel-container" id="carouselContainer"></div>
                        <button class="carousel-control prev" onclick="moveCarouselSlide(-1)" aria-label="Slide anterior">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        <button class="carousel-control next" onclick="moveCarouselSlide(1)" aria-label="Próximo slide">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                        <div class="carousel-indicators" id="carouselIndicators"></div>
                    </div>
                </section>
            `;

            // Inserir carrossel no início da seção Cinema
            const content = cinemaTab.querySelector('#content');
            if (content) {
                content.insertAdjacentHTML('afterbegin', carouselHTML);
                
                // Popular carrossel
                const container = document.getElementById('carouselContainer');
                const indicators = document.getElementById('carouselIndicators');
                
                carouselData.forEach((item, index) => {
                    // Criar slide (apenas imagem, sem texto)
                    const slide = document.createElement('div');
                    slide.className = 'carousel-slide';
                    slide.innerHTML = `
                        <img src="${item.image}" alt="${item.title}" loading="lazy">
                    `;
                    container.appendChild(slide);

                    // Criar indicador
                    const indicator = document.createElement('div');
                    indicator.className = 'carousel-indicator' + (index === 0 ? ' active' : '');
                    indicator.setAttribute('data-index', index);
                    indicator.addEventListener('click', () => {
                        window.currentCarouselSlide = index;
                        updateCarousel();
                    });
                    indicators.appendChild(indicator);
                });

                // Inicializar variáveis do carrossel
                window.currentCarouselSlide = 0;
                window.carouselInterval = null;

                // Iniciar autoplay
                startCarouselAutoPlay();
            }
        }

        // Adicionar filmes premiados ao sidebar
        const sidebar = cinemaTab.querySelector('#sidebar');
        if (sidebar && !document.getElementById('awardedList')) {
            const awardedHTML = `
                <div class="sidebar-section">
                    <h3><i class="fas fa-trophy"></i> Filmes Premiados</h3>
                    <div class="awarded-list" id="awardedList"></div>
                </div>
            `;
            
            // Inserir antes da seção "Sobre"
            const aboutSection = sidebar.querySelector('.sidebar-section');
            if (aboutSection) {
                aboutSection.insertAdjacentHTML('beforebegin', awardedHTML);
                
                // Popular filmes premiados
                const awardedList = document.getElementById('awardedList');
                awardedData.forEach(item => {
                    const listItem = document.createElement('div');
                    listItem.className = 'awarded-item';
                    listItem.innerHTML = `
                        <img src="${item.image}" alt="${item.title}" loading="lazy">
                        <div class="awarded-info">
                            <div class="awarded-title">${item.title}</div>
                            <div class="awarded-meta">
                                <span><i class="fas fa-star"></i> ${item.rating}</span>
                                <span>•</span>
                                <span>${item.year}</span>
                                <span class="award-badge">${item.award}</span>
                            </div>
                        </div>
                    `;
                    awardedList.appendChild(listItem);
                });
            }
        }
    }
}

// Funções do carrossel (tornadas globais)
function updateCarousel() {
    const container = document.getElementById('carouselContainer');
    const indicators = document.querySelectorAll('.carousel-indicator');
    
    if (container) {
        container.style.transform = `translateX(-${window.currentCarouselSlide * 100}%)`;
        
        indicators.forEach((indicator, index) => {
            if (index === window.currentCarouselSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
}

function moveCarouselSlide(direction) {
    const carouselContainer = document.getElementById('carouselContainer');
    if (!carouselContainer) return;
    
    const slides = carouselContainer.children;
    window.currentCarouselSlide = (window.currentCarouselSlide + direction + slides.length) % slides.length;
    updateCarousel();
    startCarouselAutoPlay();
}

function startCarouselAutoPlay() {
    if (window.carouselInterval) {
        clearInterval(window.carouselInterval);
    }
    
    window.carouselInterval = setInterval(() => {
        const carouselContainer = document.getElementById('carouselContainer');
        if (carouselContainer) {
            const slides = carouselContainer.children;
            window.currentCarouselSlide = (window.currentCarouselSlide + 1) % slides.length;
            updateCarousel();
        }
    }, 5000);
}
