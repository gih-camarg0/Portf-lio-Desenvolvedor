// Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    });

// Hamburger menu
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');
    hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });
    document.querySelectorAll('.mob-link').forEach(link => {
      link.addEventListener('click', () => mobileNav.classList.remove('open'));
    });

// Certificate filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const certCards  = document.querySelectorAll('.cert-card');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.filter;
        certCards.forEach(card => {
          card.classList.toggle('hidden', f !== 'all' && card.dataset.category !== f);
        });
      });
    });

// Intersection observer for scroll-in animations
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.highlight-card, .cert-card').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity .5s ease, transform .5s ease, border-color .25s, box-shadow .25s';
      obs.observe(el);
    });

// Scroll-in animation for project cards
    const cards = document.querySelectorAll('.project-detail-card');
    const cardObs = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), 80);
                cardObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
 
    cards.forEach(card => cardObs.observe(card));

// --- LÓGICA DO LIGHTBOX E FILTROS ---
let currentSlides = [];
let currentIndex = 0;

const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img');
const lbCurrent = document.getElementById('lb-current');
const lbTotal = document.getElementById('lb-total');
const btnPrev = document.querySelector('.lb-nav.prev');
const btnNext = document.querySelector('.lb-nav.next');

document.querySelectorAll('.lightbox-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
        const type = trigger.dataset.type;
        
        if (type === 'image') {
            currentSlides = [trigger.dataset.src];
            btnPrev.style.display = 'none';
            btnNext.style.display = 'none';
        } else {
            currentSlides = trigger.dataset.slides.split(',');
            btnPrev.style.display = 'flex';
            btnNext.style.display = 'flex';
        }
        
        currentIndex = 0;
        updateLightbox();
        lb.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
});

function updateLightbox() {
    lbImg.src = currentSlides[currentIndex];
    lbCurrent.innerText = currentIndex + 1;
    lbTotal.innerText = currentSlides.length;
}

// Navegação entre slides
btnNext.onclick = (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % currentSlides.length;
    updateLightbox();
};

btnPrev.onclick = (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + currentSlides.length) % currentSlides.length;
    updateLightbox();
};

// Fechar Lightbox
document.querySelector('.lightbox-close').onclick = () => {
    lb.style.display = 'none';
    document.body.style.overflow = 'auto';
};

lb.onclick = (e) => { if(e.target === lb) document.querySelector('.lightbox-close').onclick(); };

// Atalhos do teclado
document.addEventListener('keydown', (e) => {
    if (lb.style.display === 'flex') {
        if (e.key === 'ArrowRight') btnNext.click();
        if (e.key === 'ArrowLeft') btnPrev.click();
        if (e.key === 'Escape') document.querySelector('.lightbox-close').click();
    }
});

// --- FILTRO DE PROJETOS ---
document.querySelectorAll('.btn-filter').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.btn-filter').forEach(b => b.classList.remove('ativo'));
        btn.classList.add('ativo');
        const filter = btn.dataset.filter;
        
        document.querySelectorAll('.design-card').forEach(card => {
            if(filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'flex';
                setTimeout(() => card.classList.add('visible'), 50);
            } else {
                card.style.display = 'none';
                card.classList.remove('visible');
            }
        });
    });
});