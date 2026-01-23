// Sistema de Ícones Aleatórios
function setupRandomLogo() {
    const logoImage = document.getElementById('logo-image');
    if (!logoImage) return;
    
    // LISTA DE ÍCONES - ADICIONE SEUS LINKS AQUI
    const icons = [
        // Ícones de casa/casações...
        // Adicione MAIS links aqui...
        // Exemplo: 'https://seusite.com/icone1.png',
        //          'https://seusite.com/icone2.png',
    ];
    
    // Verifica se já tem um ícone salvo
    const savedIconIndex = localStorage.getItem('casa-logo-index');
    let newIndex;
    
    if (savedIconIndex !== null) {
        // Tenta pegar um índice diferente do último
        let attempts = 0;
        do {
            newIndex = Math.floor(Math.random() * icons.length);
            attempts++;
        } while (newIndex == savedIconIndex && attempts < 10);
    } else {
        newIndex = Math.floor(Math.random() * icons.length);
    }
    
    // Salva o novo índice
    localStorage.setItem('casa-logo-index', newIndex);
    
    // Adiciona efeito de fade out
    logoImage.style.opacity = '0';
    
    // Aguarda um pouco e muda o ícone
    setTimeout(() => {
        logoImage.src = icons[newIndex];
        logoImage.alt = `Ícone ${newIndex + 1} - Casa`;
        
        // Adiciona efeito de fade in
        logoImage.style.opacity = '1';
        logoImage.classList.add('fade-in');
        
        // Remove a classe após a animação
        setTimeout(() => {
            logoImage.classList.remove('fade-in');
        }, 500);
    }, 200);
    
    // Console log para debugging
    console.log(`Ícone carregado: ${newIndex + 1}/${icons.length}`);
    console.log('Para adicionar seus próprios ícones:');
    console.log('1. Abra o arquivo script.js');
    console.log('2. Encontre o array "icons"');
    console.log('3. Adicione os links das suas imagens');
}

// Chame esta função no DOMContentLoaded
// Adicione esta linha ANTES das outras funções:
setupRandomLogo();



// Sistema de Temas e Abas Funcionais
document.addEventListener('DOMContentLoaded', function() {
    const menuLinks = document.querySelectorAll('#menu a');
    const tabContents = document.querySelectorAll('.tab-content');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainMenu = document.getElementById('menu');
    const textModal = document.getElementById('textModal');
    const closeTextModal = document.getElementById('closeTextModal');
    const backToTop = document.getElementById('backToTop');
    const body = document.body;
    const themeBadge = document.getElementById('theme-badge');
    const bannerWrapper = document.getElementById('banner-wrapper');
    
    // Mapeamento de temas
    const themeConfig = {
        'blue': {
            name: 'OHANA',
            color: '#0066cc',
            bannerVisible: true
        },
        'red': {
            name: 'CINEMA MODE',
            color: '#e53935',
            bannerVisible: false
        },
        'green': {
            name: 'LIBRARY MODE',
            color: '#2e7d32',
            bannerVisible: false
        },
        'purple': {
            name: 'CURIOSITY MODE',
            color: '#7b1fa2',
            bannerVisible: false
        }
    };
    
    // Função para mudar o tema
    function changeTheme(color) {
        // Atualiza o atributo data-theme do body
        body.setAttribute('data-theme', color);
        
        // Atualiza o badge do tema
        if (themeBadge) {
            themeBadge.textContent = themeConfig[color].name;
            themeBadge.style.backgroundColor = themeConfig[color].color;
        }
        
        // Controla a visibilidade do banner
        if (bannerWrapper) {
            if (themeConfig[color].bannerVisible) {
                bannerWrapper.classList.remove('hidden');
                bannerWrapper.classList.add('visible');
            } else {
                bannerWrapper.classList.remove('visible');
                bannerWrapper.classList.add('hidden');
            }
        }
        
        // Salva o tema no localStorage
        localStorage.setItem('casa-theme', color);
    }
    
    // Menu mobile
    mobileMenuBtn.addEventListener('click', function() {
        mainMenu.classList.toggle('show');
        // Muda o ícone do botão
        const icon = this.querySelector('i');
        if (mainMenu.classList.contains('show')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Fechar menu ao clicar em um link (mobile)
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                mainMenu.classList.remove('show');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // Sistema de abas e temas
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove a classe active de todos os itens do menu
            menuLinks.forEach(item => {
                item.parentElement.classList.remove('active');
            });
            
            // Adiciona a classe active ao item clicado
            this.parentElement.classList.add('active');
            
            // Obtém o id da aba e a cor do tema
            const tabId = this.getAttribute('data-tab');
            const themeColor = this.getAttribute('data-color');
            
            // Esconde todas as abas
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Mostra a aba clicada
            document.getElementById(tabId).classList.add('active');
            
            // Muda o tema
            changeTheme(themeColor);
            
            // Scroll suave para o topo da página ao mudar de aba
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
    
    // Modal para textos completos (curiosidades)
    document.querySelectorAll('#curiosities .card').forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h4').textContent;
            const fullText = this.getAttribute('data-fulltext');
            
            document.getElementById('modalTextTitle').textContent = title;
            document.getElementById('modalTextContent').textContent = fullText;
            
            textModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Previne scroll da página
        });
    });
    
    // Fechar modal
    closeTextModal.addEventListener('click', function() {
        textModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === textModal) {
            textModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Fechar modal com tecla ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && textModal.style.display === 'block') {
            textModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
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
    
    // Fechar menu ao redimensionar a janela
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mainMenu.classList.contains('show')) {
            mainMenu.classList.remove('show');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Carregar tema salvo
    const savedTheme = localStorage.getItem('casa-theme') || 'blue';
    changeTheme(savedTheme);
    
    // Ativar a aba correspondente ao tema salvo
    const activeLink = document.querySelector(`#menu a[data-color="${savedTheme}"]`);
    if (activeLink) {
        menuLinks.forEach(item => {
            item.parentElement.classList.remove('active');
        });
        activeLink.parentElement.classList.add('active');
        
        const tabId = activeLink.getAttribute('data-tab');
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tabId).classList.add('active');
    }
    
    // Instruções para substituir a logo
    console.log('Para substituir a logo:');
    console.log('1. Abra o arquivo index.html');
    console.log('2. Encontre a linha: <img src="https://via.placeholder.com/150x60/ffffff/0066cc?text=CASA+LOGO" alt="Logo Casa" id="logo-image">');
    console.log('3. Substitua o link do "src" pelo link da sua imagem de logo');
    console.log('4. Ajuste o tamanho no CSS se necessário');
});
