// Navbar scroll effect - subtle background blur on scroll
(function() {
  const navbar = document.querySelector('.navbar');
  
  if (!navbar) return;
  
  function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  
  // Throttle scroll events for performance
  let ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });
  
  // Check initial scroll position
  handleScroll();
})();

// Service cards scroll animation - fade in when visible
(function() {
  function observeServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    // If IntersectionObserver is not supported, show cards immediately
    if (typeof IntersectionObserver === 'undefined') {
      serviceCards.forEach(function(card) {
        card.classList.add('animate-in');
      });
      return;
    }

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe service cards with staggered delays
    serviceCards.forEach(function(card, index) {
      card.style.setProperty('--animation-delay', (index * 0.1) + 's');
      observer.observe(card);
    });
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeServiceCards);
  } else {
    observeServiceCards();
  }
})();

// Section reveal animations on scroll
(function() {
  if (typeof IntersectionObserver === 'undefined') {
    return;
  }

  const sectionsToReveal = [
    '.services-preview',
    '.partners',
    '.contact',
    '.service-detail',
    '.section-intro'
  ];

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  function initSectionReveals() {
    sectionsToReveal.forEach(function(selector) {
      const elements = document.querySelectorAll(selector);
      elements.forEach(function(element) {
        if (!element.classList.contains('revealed')) {
          element.classList.add('reveal-section');
          observer.observe(element);
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSectionReveals);
  } else {
    initSectionReveals();
  }
})();

// Partner cards reveal animation
(function() {
  if (typeof IntersectionObserver === 'undefined') {
    return;
  }

  const partnerCards = document.querySelectorAll('.partner-card');
  
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry, index) {
      if (entry.isIntersecting) {
        setTimeout(function() {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }, index * 100);
      }
    });
  }, observerOptions);

  function initPartnerReveals() {
    partnerCards.forEach(function(card) {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(card);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPartnerReveals);
  } else {
    initPartnerReveals();
  }
})();

// Enhanced button hover micro-interactions
(function() {
  const buttons = document.querySelectorAll('.btn-primary, button[type="submit"]');
  
  buttons.forEach(function(button) {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
    
    button.addEventListener('mousedown', function() {
      this.style.transform = 'translateY(0)';
    });
    
    button.addEventListener('mouseup', function() {
      this.style.transform = 'translateY(-2px)';
    });
  });
})();
