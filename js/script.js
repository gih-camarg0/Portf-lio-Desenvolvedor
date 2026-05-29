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