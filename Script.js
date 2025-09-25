document.addEventListener('DOMContentLoaded', () => {
  // ============================
  // Animaciones de aparición
  // ============================
  const targets = document.querySelectorAll(
    '.B_inicio .DLGP, .B_inicio .DContexto, .B_sobre_mi .Dsobremi, ' +
    '.B_sobre_mi .Ipython, .B_sobre_mi .Ihtml, .B_sobre_mi .Icss, ' +
    '.B_sobre_mi .Ijs, .B_sobre_mi .Icsharp, .B_sobre_mi .Isqls, ' +
    '.B_sobre_mi .Imysql, .B_proyectos .Pro1, .B_proyectos .Pro2, ' +
    '.B_proyectos .Pro3, .B_contacto .Rsociales, .B_contacto .form_conctacto'
  );

  if (targets.length) {
    if (window.innerWidth > 720) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        });
      }, { threshold: 0.2 });
      targets.forEach(t => io.observe(t));
    } else {
      // Para móviles/tablet, mostrar todo sin animación
      targets.forEach(t => t.classList.add('visible'));
    }
  }

  // ============================
  // Scroll suave botones
  // ============================
  const scrollButtons = [
    { btnId: 'Bmi', sectionId: 'Sobremi' },
    { btnId: 'Binicio', sectionId: 'Inicio' },
    { btnId: 'Bproyectos', sectionId: 'Proyectos' },
    { btnId: 'Bcontacto', sectionId: 'Contacto' },
  ];

  scrollButtons.forEach(({ btnId, sectionId }) => {
    const boton = document.getElementById(btnId);
    const seccion = document.getElementById(sectionId);
    if (boton && seccion) {
      boton.addEventListener('click', () => {
        seccion.scrollIntoView({ behavior: 'smooth' });
      });
    }
  });

  // ============================
  // Parallax (solo desktop >720px)
  // ============================
  if (window.innerWidth > 720) {
    const parallaxSections = [
      { selector: '.B_inicio', bgSelector: '.parallax-bg' },
      { selector: '.B_sobre_mi', bgSelector: '.parallax-bg1' },
      { selector: '.B_contacto', bgSelector: '.parallax-bg2' }
    ];

    parallaxSections.forEach(({ selector, bgSelector }) => {
      const section = document.querySelector(selector);
      const bg = section?.querySelector(bgSelector);
      if (!section || !bg) return;

      const bgScale = 1.02;
      let ticking = false;

      function updateParallax() {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
        const clamped = Math.max(0, Math.min(1, progress));
        const maxShift = (bgScale - 1) * rect.height;
        const translateY = -maxShift / 2 + clamped * maxShift;
        bg.style.transform = `translateY(${translateY}px) scale(${bgScale})`;
      }

      function onScroll() {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            updateParallax();
            ticking = false;
          });
          ticking = true;
        }
      }

      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', updateParallax);
      updateParallax();
    });
  }
});
