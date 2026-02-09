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
            
            // Fecha o modal se estiver aberto
            closeModal();
            
            // Inicializar elementos se necessário
            setTimeout(() => {
                if (tabId === 'cinema') {
                    initCarousel();
                    initHorizontalCarousels();
                    initPosterModal();
                } else if (tabId === 'library') {
                    initPosterModal();
                }
            }, 100);
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
            
            // Fecha o modal se estiver aberto
            closeModal();
            
            // Inicializar elementos se necessário
            setTimeout(() => {
                if (targetTabId === 'cinema') {
                    initCarousel();
                    initHorizontalCarousels();
                    initPosterModal();
                } else if (targetTabId === 'library') {
                    initPosterModal();
                }
            }, 100);
        });
    });
    
    // Botão voltar ao topo
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 250) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        closeModal();
    });
    
    // Animar elementos ao rolar
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.poster, .about-section, .sidebar-section');
        
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
    document.querySelectorAll('.poster, .about-section, .sidebar-section').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(10px)';
        el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
    
    // ===== SISTEMA DO CARROSSEL PRINCIPAL =====
    initCarousel();
    
    // Inicializar sistemas adicionais
    setTimeout(() => {
        initHorizontalCarousels();
        initPosterModal();
    }, 300);
    
    // Funções auxiliares
    function closeModal() {
        const modal = document.getElementById('filmModal');
        if (modal.classList.contains('show')) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    }
});

// Sistema do Carrossel Principal
function initCarousel() {
    const carouselData = [
        {
            title: "Zootopia 2",
            image: "https://image.tmdb.org/t/p/original/oMB0dF0NTXA9UPu3GxE9gGbcMwP.jpg"
        },
        {
            title: "Barbie Vida de Sereia",
            image: "https://image.tmdb.org/t/p/original/csSEukCACMBPgqDgujDBHG4bfpj.jpg"
        },
        {
            title: "Shrek 2",
            image: "https://image.tmdb.org/t/p/original/mb2QwAHlV333023HYrHcSrX8WL9.jpg"
        },
        {
            title: "Tempo com Você",
            image: "https://image.tmdb.org/t/p/original/mBl7B4r5k0PFTBPd0uTacm2ml4O.jpg"
        },
        {
            title: "Homem-Aranha: No Aranhaverso",
            image: "https://image.tmdb.org/t/p/original/bII9g04BrGysZZEyjEHv5i2HFbt.jpg"
        }
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

            // Inserir carrossel após a seção "Sobre"
            const content = cinemaTab.querySelector('#content');
            const aboutSection = content.querySelector('.about-section');
            
            if (content) {
                if (aboutSection) {
                    aboutSection.insertAdjacentHTML('afterend', carouselHTML);
                } else {
                    content.insertAdjacentHTML('afterbegin', carouselHTML);
                }
                
                // Popular carrossel
                const container = document.getElementById('carouselContainer');
                const indicators = document.getElementById('carouselIndicators');
                
                carouselData.forEach((item, index) => {
                    // Criar slide
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
            
            // Inserir no sidebar
            sidebar.insertAdjacentHTML('afterbegin', awardedHTML);
            
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

// Funções do carrossel
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

// ===== SISTEMA DE CARROSSÉIS HORIZONTAIS - CORRIGIDO =====
function initHorizontalCarousels() {
    // Configurar todos os carrosséis horizontais
    const carousels = [
        { 
            prevBtn: document.getElementById('nowPlayingPrev'),
            nextBtn: document.getElementById('nowPlayingNext'),
            container: document.getElementById('nowPlayingContainer')
        },
        { 
            prevBtn: document.getElementById('singleMoviesPrev'),
            nextBtn: document.getElementById('singleMoviesNext'),
            container: document.getElementById('singleMoviesContainer')
        },
        { 
            prevBtn: document.getElementById('dragonPrev'),
            nextBtn: document.getElementById('dragonNext'),
            container: document.getElementById('dragonContainer')
        },
        { 
            prevBtn: document.getElementById('dragonBallPrev'),
            nextBtn: document.getElementById('dragonBallNext'),
            container: document.getElementById('dragonBallContainer')
        },
        { 
            prevBtn: document.getElementById('incrediblesPrev'),
            nextBtn: document.getElementById('incrediblesNext'),
            container: document.getElementById('incrediblesContainer')
        },
        { 
            prevBtn: document.getElementById('spyFamilyPrev'),
            nextBtn: document.getElementById('spyFamilyNext'),
            container: document.getElementById('spyFamilyContainer')
        }
    ];
    
    carousels.forEach(carousel => {
        if (carousel.prevBtn && carousel.nextBtn && carousel.container) {
            setupCarouselNavigation(carousel.prevBtn, carousel.nextBtn, carousel.container);
        }
    });
}

function setupCarouselNavigation(prevBtn, nextBtn, container) {
    if (!prevBtn || !nextBtn || !container) return;
    
    // Configurar scroll suave
    const scrollAmount = 300; // Quantidade de pixels para rolar
    
    // Evento para botão anterior
    prevBtn.addEventListener('click', () => {
        container.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });
    
    // Evento para botão próximo
    nextBtn.addEventListener('click', () => {
        container.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
    
    // Atualizar visibilidade dos botões baseado na posição do scroll
    const updateButtonVisibility = () => {
        const scrollLeft = container.scrollLeft;
        const maxScroll = container.scrollWidth - container.clientWidth;
        
        // Mostrar/ocultar botões baseado na posição do scroll
        if (scrollLeft <= 10) {
            prevBtn.style.opacity = '0.3';
            prevBtn.style.pointerEvents = 'none';
        } else {
            prevBtn.style.opacity = '0.9';
            prevBtn.style.pointerEvents = 'auto';
        }
        
        if (scrollLeft >= maxScroll - 10) {
            nextBtn.style.opacity = '0.3';
            nextBtn.style.pointerEvents = 'none';
        } else {
            nextBtn.style.opacity = '0.9';
            nextBtn.style.pointerEvents = 'auto';
        }
    };
    
    // Atualizar visibilidade inicial
    updateButtonVisibility();
    
    // Atualizar visibilidade durante o scroll
    container.addEventListener('scroll', updateButtonVisibility);
    
    // Atualizar visibilidade ao redimensionar a janela
    window.addEventListener('resize', updateButtonVisibility);
}

// ===== SISTEMA DE MODAL PARA POSTERS =====
function initPosterModal() {
    const modal = document.getElementById('filmModal');
    const closeButtons = document.querySelectorAll('.modal-close');
    const posters = document.querySelectorAll('.poster');
    
    posters.forEach(poster => {
        poster.addEventListener('click', function(e) {
            // Obter dados dos atributos data-*
            const title = this.getAttribute('data-title');
            const year = this.getAttribute('data-year');
            const description = this.getAttribute('data-description');
            const rating = this.getAttribute('data-rating');
            const status = this.getAttribute('data-status');
            
            // Preencher modal
            document.getElementById('modalTitle').textContent = title;
            document.getElementById('modalYear').textContent = year;
            
            const modalRating = document.getElementById('modalRating');
            if (rating === '-' || rating === '') {
                modalRating.style.display = 'none';
            } else {
                modalRating.style.display = 'flex';
                modalRating.innerHTML = `<i class="fas fa-star"></i> ${rating}`;
            }
            
            const modalStatus = document.getElementById('modalStatus');
            modalStatus.textContent = status;
            modalStatus.setAttribute('data-status', status);
            
            document.getElementById('modalDescription').textContent = description || 'Sem descrição disponível.';
            
            // Mostrar modal
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        });
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Fechar modal com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
}
