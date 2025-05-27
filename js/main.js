/* js/main.js */
document.addEventListener("DOMContentLoaded", () => {
  /*=============== SHOW MENU ===============*/
  const navMenu = document.getElementById("nav-menu"),
    navToggle = document.getElementById("nav-toggle"),
    navClose = document.getElementById("nav-close");

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.add("show-menu");
    });
  }
  if (navClose) {
    navClose.addEventListener("click", () => {
      navMenu.classList.remove("show-menu");
    });
  }

  /*=============== REMOVE MENU MOBILE WHEN CLICKING A LINK ===============*/
  const navLinks = document.querySelectorAll(".nav__link");
  function linkAction() {
    const navMenu = document.getElementById("nav-menu");
    navMenu.classList.remove("show-menu");
  }
  navLinks.forEach((n) => n.addEventListener("click", linkAction));

  /*=============== CHANGE BACKGROUND HEADER ON SCROLL ===============*/
  const header = document.getElementById("header");
  function scrollHeader() {
    if (window.scrollY >= 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
  window.addEventListener("scroll", scrollHeader);

  /*=============== ACTIVE LINK ON SCROLL ===============*/
  const sections = document.querySelectorAll("section[id]");
  function scrollActive() {
    const scrollY = window.pageYOffset;
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 58;
      const sectionId = current.getAttribute("id");
      const currentLink = document.querySelector(
        ".nav__menu a[href*=" + sectionId + "]"
      );

      if (currentLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          currentLink.classList.add("active-link");
        } else {
          currentLink.classList.remove("active-link");
        }
      }
    });
  }
  window.addEventListener("scroll", scrollActive);

  /*=============== SCROLL REVEAL ANIMATION ===============*/
  if (typeof ScrollReveal !== "undefined") {
    const sr = ScrollReveal({
      origin: "top",
      distance: "60px",
      duration: 2000,
      delay: 200, // Reduzido delay global inicial
      // reset: true // Descomente para animações repetirem
    });

    sr.reveal(`.hero__title`, { origin: "left", delay: 300 });
    sr.reveal(`.hero__description, .hero__typewriter-target`, {
      origin: "left",
      delay: 400,
    });
    sr.reveal(`.hero__container .button`, { origin: "left", delay: 500 });
    sr.reveal(`.hero__social-proof`, { origin: "bottom", delay: 600 });
    sr.reveal(`.hero__img`, {
      origin: "right",
      delay: 400,
      distance: "80px",
      opacity: 0,
      scale: 0.9,
      beforeReveal: (el) => {
        el.style.opacity = 1;
        el.style.transform = "scale(1)";
      },
    }); // Ajuste para animação CSS

    sr.reveal(`.about__image-container`, {
      origin: "left",
      distance: "80px",
      delay: 200,
    });
    sr.reveal(`.about__content .section__subtitle`, { delay: 300 });
    sr.reveal(`.about__content .section__title`, { delay: 400 });
    sr.reveal(`.about__content .about__description`, {
      delay: 500,
      interval: 100,
    });
    sr.reveal(`.about__list li`, {
      delay: 600,
      interval: 150,
      origin: "bottom",
    });
    sr.reveal(`.about__content .button`, { delay: 700, origin: "bottom" });

    sr.reveal(`.services .section__subtitle`, { delay: 100 });
    sr.reveal(`.services .section__title`, { delay: 200 });
    sr.reveal(`.service__card`, {
      interval: 150,
      origin: "bottom",
      distance: "40px",
      delay: 300,
    });

    sr.reveal(`.contact__content .section__subtitle`, {
      origin: "left",
      delay: 100,
    });
    sr.reveal(`.contact__content .section__title`, {
      origin: "left",
      delay: 200,
    });
    sr.reveal(`.contact__content .contact__description`, {
      origin: "left",
      delay: 300,
    });
    sr.reveal(`.contact__info-item`, {
      origin: "left",
      interval: 100,
      delay: 400,
    });
    sr.reveal(`.contact__form .contact__form-group`, {
      origin: "right",
      interval: 100,
      delay: 300,
    });
    sr.reveal(`.contact__form .button`, { origin: "bottom", delay: 600 });
  } else {
    console.warn("ScrollReveal library not found.");
  }

  /*=============== UPDATE FOOTER YEAR ===============*/
  const currentYearSpan = document.getElementById("currentYear");
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  /*=============== DARK MODE TOGGLE ===============*/
  const themeButton = document.getElementById("theme-button");
  const darkTheme = "dark-theme";
  const iconTheme = "fas fa-sun"; // Ou o ícone que você usar para o sol

  // Previously selected topic (if user selected)
  const selectedTheme = localStorage.getItem("selected-theme");
  const selectedIcon = localStorage.getItem("selected-icon");

  // We obtain the current theme that the interface has by validating the dark-theme class
  const getCurrentTheme = () =>
    document.body.classList.contains(darkTheme) ? "dark" : "light";
  const getCurrentIcon = () =>
    themeButton.classList.contains(iconTheme) ? "fas fa-moon" : "fas fa-sun"; // Ajuste para seus ícones

  if (selectedTheme) {
    document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
      darkTheme
    );
    if (themeButton)
      themeButton.classList[selectedIcon === "fas fa-moon" ? "add" : "remove"](
        iconTheme
      );
  }

  if (themeButton) {
    themeButton.addEventListener("click", () => {
      document.body.classList.toggle(darkTheme);
      themeButton.classList.toggle(iconTheme);
      localStorage.setItem("selected-theme", getCurrentTheme());
      localStorage.setItem("selected-icon", getCurrentIcon());
    });
  }

  /*=============== TYPEWRITER EFFECT ===============*/
  const typewriterTarget = document.querySelector(".hero__typewriter-target");
  if (typewriterTarget) {
    const phrases = JSON.parse(
      typewriterTarget.dataset.phrases ||
        '["Estratégias Personalizadas", "Resultados Comprovados", "Defesa dos Seus Direitos"]'
    );
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const delayBetweenPhrases = 1500;

    function type() {
      const currentPhrase = phrases[phraseIndex];
      if (isDeleting) {
        typewriterTarget.textContent = currentPhrase.substring(
          0,
          charIndex - 1
        );
        charIndex--;
      } else {
        typewriterTarget.textContent = currentPhrase.substring(
          0,
          charIndex + 1
        );
        charIndex++;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        setTimeout(() => (isDeleting = true), delayBetweenPhrases);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }

      const speed = isDeleting ? deleteSpeed : typeSpeed;
      setTimeout(type, speed);
    }
    // Iniciar apenas se a seção hero estiver visível (para não começar a digitar fora da tela)
    const heroSection = document.getElementById("home");
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(type, 500); // Pequeno delay para iniciar após a página carregar um pouco
          observer.disconnect(); // Digitar apenas uma vez ao entrar na view
        }
      },
      { threshold: 0.1 }
    ); // Iniciar quando 10% da seção estiver visível

    if (heroSection) {
      observer.observe(heroSection);
    }
  }

  /*=============== LAZY LOADING IMAGES ===============*/
  const lazyImages = document.querySelectorAll("img[data-src]");
  const lazyImageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute("data-src"); // Remove para não observar novamente
          // Opcional: adicionar uma classe para transição de fade-in
          img.classList.add("loaded");
          observer.unobserve(img);
        }
      });
    },
    { rootMargin: "0px 0px 100px 0px" }
  ); // Carrega 100px antes de entrar na viewport

  lazyImages.forEach((img) => lazyImageObserver.observe(img));

  /*=============== CLIENT-SIDE FORM VALIDATION & SUBMISSION FEEDBACK ===============*/
  const contactForm = document.querySelector(".contact__form");
  if (contactForm) {
    contactForm.setAttribute("novalidate", true); // Desabilita validação padrão do browser para usar a nossa

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      let isValid = true;
      const formElements = this.elements;
      const submitButton = this.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;

      // Limpar erros anteriores
      this.querySelectorAll(".form-error-message").forEach((el) => el.remove());
      this.querySelectorAll(".input-error").forEach((el) =>
        el.classList.remove("input-error")
      );

      // Validação
      const nameField = formElements.name;
      if (nameField.value.trim().length < 3) {
        isValid = false;
        showError(nameField, "Nome deve ter pelo menos 3 caracteres.");
      }

      const emailField = formElements.email;
      if (!isValidEmail(emailField.value.trim())) {
        isValid = false;
        showError(emailField, "Por favor, insira um email válido.");
      }

      const messageField = formElements.message;
      if (messageField.value.trim().length < 10) {
        isValid = false;
        showError(messageField, "Mensagem deve ter pelo menos 10 caracteres.");
      }

      const privacyCheckbox = formElements.privacy;
      if (!privacyCheckbox.checked) {
        isValid = false;
        showError(
          privacyCheckbox,
          "Você deve aceitar a política de privacidade.",
          true
        );
      }

      if (isValid) {
        submitButton.disabled = true;
        submitButton.innerHTML =
          '<i class="fas fa-spinner fa-spin"></i> Enviando...'; // Feedback visual

        // Simulação de envio (substituir por chamada AJAX real)
        setTimeout(() => {
          // Simulação de sucesso
          this.reset(); // Limpa o formulário
          submitButton.disabled = false;
          submitButton.textContent = originalButtonText;
          showGlobalMessage(
            "Mensagem enviada com sucesso! Entraremos em contato em breve.",
            "success",
            this
          );

          // Simulação de erro
          /*
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                    showGlobalMessage('Erro ao enviar mensagem. Tente novamente mais tarde.', 'error', this);
                    */
        }, 2000);
      } else {
        // Foco no primeiro campo com erro
        const firstErrorField = this.querySelector(".input-error");
        if (firstErrorField) firstErrorField.focus();
      }
    });

    function showError(field, message, isCheckbox = false) {
      field.classList.add("input-error");
      const error = document.createElement("span");
      error.className = "form-error-message";
      error.textContent = message;
      if (isCheckbox) {
        field.parentNode.parentNode.appendChild(error); // Para o checkbox que está dentro de um label
      } else {
        field.parentNode.appendChild(error);
      }
    }

    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    function showGlobalMessage(message, type = "success", formElement) {
      let messageContainer = formElement.querySelector(".global-form-message");
      if (!messageContainer) {
        messageContainer = document.createElement("div");
        messageContainer.className = "global-form-message";
        // Inserir antes do primeiro form-group ou do botão de submit
        const firstFormGroup = formElement.querySelector(
          ".contact__form-group"
        );
        if (firstFormGroup) {
          formElement.insertBefore(messageContainer, firstFormGroup);
        } else {
          formElement.appendChild(messageContainer); // Fallback
        }
      }
      messageContainer.textContent = message;
      messageContainer.className = `global-form-message message--${type}`; // success ou error
      // Remover mensagem após alguns segundos
      setTimeout(() => {
        if (messageContainer) messageContainer.remove();
      }, 5000);
    }
  }

  /*=============== SCROLL TO TOP BUTTON ===============*/
  const scrollToTopButton = document.getElementById("scroll-to-top");
  if (scrollToTopButton) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        // Mostrar botão após rolar 300px
        scrollToTopButton.classList.add("show-scroll");
      } else {
        scrollToTopButton.classList.remove("show-scroll");
      }
    });

    scrollToTopButton.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}); // Fim do DOMContentLoaded
