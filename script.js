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
    
    // Mapeamento de temas
    const themeConfig = {
        'blue': {
            name: 'OHANA',
            color: '#0066cc'
        },
        'red': {
            name: 'CINEMA MODE',
            color: '#e53935'
        },
        'green': {
            name: 'LIBRARY MODE',
            color: '#2e7d32'
        },
        'purple': {
            name: 'CURIOSITY MODE',
            color: '#7b1fa2'
        }
    };
    
    // Função para mudar o tema
    function changeTheme(color) {
        // Atualiza o atributo data-theme do body
        body.setAttribute('data-theme', color);
        
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
});
