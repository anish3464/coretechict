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
    threshold: 0.05,
    rootMargin: '0px 0px -60px 0px'
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

// Partners Infinite Carousel
(function() {
  const carousel = document.querySelector('.partners-carousel');
  const track = document.querySelector('.partners-track');

  if (!carousel || !track) return;

  const logos = track.querySelectorAll('.partner-logo');
  const totalLogos = logos.length / 2; // Original logos count (duplicated)
  let currentPosition = 0;
  let animationFrameId = null;
  const speed = 0.5; // Pixels per frame

  function animate() {
    currentPosition -= speed;

    // Reset position when reaching the duplicated section
    const logoWidth = logos[0].offsetWidth;
    const gap = parseInt(getComputedStyle(track).gap) || 48;
    const resetPoint = -(totalLogos * (logoWidth + gap));

    if (currentPosition <= resetPoint) {
      currentPosition = 0;
    }

    track.style.transform = `translateX(${currentPosition}px)`;
    animationFrameId = requestAnimationFrame(animate);
  }

  function startAnimation() {
    if (!animationFrameId) {
      animate();
    }
  }

  function stopAnimation() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  }

  // Pause on hover
  if (carousel) {
    carousel.addEventListener('mouseenter', stopAnimation);
    carousel.addEventListener('mouseleave', startAnimation);
  }

  // Initialize
  function initCarousel() {
    startAnimation();

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function() {
        // Reset position on resize to prevent misalignment
        currentPosition = 0;
        track.style.transform = `translateX(${currentPosition}px)`;
      }, 250);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarousel);
  } else {
    initCarousel();
  }

  // Cleanup on page unload
  window.addEventListener('beforeunload', function() {
    stopAnimation();
  });
})();

// Matrix Effect
(function() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  
  const container = canvas.closest('.partners-carousel-container');
  if (!container) return;
  
  const ctx = canvas.getContext('2d');
  let animationFrameId = null;
  let mouseX = 0;
  let mouseY = 0;
  
  // Matrix characters (tech-related)
  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
  const charArray = chars.split('');
  
  // Settings
  const fontSize = 14;
  const columns = [];
  let columnCount = 0;
  
  function resizeCanvas() {
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    columnCount = Math.floor(canvas.width / fontSize);
    
    // Initialize columns
    columns.length = 0;
    for (let i = 0; i < columnCount; i++) {
      columns[i] = {
        y: Math.random() * -canvas.height,
        speed: 0.5 + Math.random() * 0.5,
        char: charArray[Math.floor(Math.random() * charArray.length)]
      };
    }
  }
  
  function drawMatrix() {
    // Fade effect
    ctx.fillStyle = 'rgba(11, 11, 11, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Calculate mouse influence
    const mouseInfluence = {
      x: mouseX / canvas.width,
      y: mouseY / canvas.height
    };
    
    // Draw columns
    ctx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < columnCount; i++) {
      const column = columns[i];
      const x = i * fontSize;
      
      // Mouse influence on speed
      const distanceFromMouse = Math.abs((x / canvas.width) - mouseInfluence.x);
      const speedMultiplier = 1 + (1 - distanceFromMouse) * 0.5;
      
      // Draw character
      const charIndex = Math.floor(Math.random() * charArray.length);
      const char = charArray[charIndex];
      
      // Opacity based on position and mouse proximity
      const opacity = Math.min(1, 0.3 + (1 - distanceFromMouse) * 0.7);
      ctx.fillStyle = `rgba(57, 178, 127, ${opacity})`;
      
      ctx.fillText(char, x, column.y);
      
      // Update position
      column.y += column.speed * speedMultiplier;
      
      // Reset if off screen
      if (column.y > canvas.height) {
        column.y = Math.random() * -200;
        column.char = charArray[Math.floor(Math.random() * charArray.length)];
      }
    }
    
    animationFrameId = requestAnimationFrame(drawMatrix);
  }
  
  function handleMouseMove(e) {
    const rect = container.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  }
  
  function initMatrix() {
    resizeCanvas();
    drawMatrix();
    
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', function() {
      mouseX = canvas.width / 2;
      mouseY = canvas.height / 2;
    });
    
    window.addEventListener('resize', function() {
      resizeCanvas();
    });
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMatrix);
  } else {
    initMatrix();
  }
  
  // Cleanup on page unload
  window.addEventListener('beforeunload', function() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  });
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
