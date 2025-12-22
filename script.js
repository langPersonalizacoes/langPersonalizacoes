// ============================================
// AGUARDA O CARREGAMENTO COMPLETO DA PÁGINA
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  // ============================================
  // MENU MOBILE - TOGGLE E FUNCIONALIDADE
  // ============================================

  // Seleciona elementos do menu mobile
  const mobileMenuToggle = document.getElementById("mobileMenuToggle")
  const navLinks = document.querySelector(".nav-links")
  const dropdown = document.querySelector(".dropdown")
  const dropdownToggle = document.querySelector(".dropdown-toggle")
  const dropdownMenu = document.querySelector(".dropdown-menu")

  // Configura o menu mobile se os elementos existirem
  if (mobileMenuToggle && navLinks) {
    // Abre/fecha o menu ao clicar no botão hamburguer
    mobileMenuToggle.addEventListener("click", (event) => {
      event.stopPropagation()
      navLinks.classList.toggle("active")
    })

    // Fecha o menu ao clicar fora dele
    document.addEventListener("click", (event) => {
      if (!navLinks.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
        navLinks.classList.remove("active")
      }
    })

    // Fecha o menu ao clicar em um link (exceto dropdown)
    navLinks.querySelectorAll("a:not(.dropdown-toggle)").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active")
      })
    })
  }

  // ============================================
  // DROPDOWN MENU - PRODUTOS
  // ============================================

  // Configura o dropdown se os elementos existirem
  if (dropdown && dropdownToggle && dropdownMenu) {
    // Abre/fecha o dropdown no mobile ao clicar
    dropdownToggle.addEventListener("click", (event) => {
      event.preventDefault()
      event.stopPropagation()

      // Só funciona no mobile (480px ou menos)
      if (window.innerWidth <= 480) {
        dropdownMenu.classList.toggle("active")
      }
    })

    // Fecha o dropdown ao clicar fora dele
    document.addEventListener("click", (event) => {
      if (window.innerWidth <= 480 && !dropdown.contains(event.target)) {
        dropdownMenu.classList.remove("active")
      }
    })

    // Fecha o menu ao clicar em um item do dropdown
    dropdownMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        dropdownMenu.classList.remove("active")
        if (navLinks) {
          navLinks.classList.remove("active")
        }
      })
    })
  }

  // ============================================
  // SCROLL SUAVE - LINKS ÂNCORA
  // ============================================

  // Adiciona scroll suave para todos os links que começam com #
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault()

      // Encontra o elemento alvo e rola até ele
      const targetElement = document.querySelector(this.getAttribute("href"))
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // ============================================
  // ANIMAÇÃO DE ENTRADA - INTERSECTION OBSERVER
  // ============================================

  // Cria observador para animar elementos quando aparecem na tela
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Quando o elemento entra na viewport, anima ele
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    },
    {
      threshold: 0.1, // Ativa quando 10% do elemento está visível
      rootMargin: "0px 0px -50px 0px", // Ativa um pouco antes do elemento aparecer
    },
  )

  // Aplica animação de entrada em cards de produtos e depoimentos
  document.querySelectorAll(".product-card, .testimonial-card").forEach((card) => {
    // Define estado inicial (invisível e deslocado para baixo)
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease"

    // Observa o elemento para animá-lo quando aparecer
    observer.observe(card)
  })

  // ============================================
  // HEADER - SOMBRA AO ROLAR
  // ============================================

  // Adiciona sombra ao header quando a página é rolada
  const header = document.querySelector(".header")

  window.addEventListener("scroll", () => {
    // Se rolou mais de 100px, adiciona sombra
    if (window.scrollY > 100) {
      header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.3)"
    } else {
      header.style.boxShadow = "none"
    }
  })
})
