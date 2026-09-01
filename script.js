const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

menuToggle?.addEventListener("click", () => {
  const open = mobileMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});

document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Active desktop navigation based on the section currently on screen.
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".desktop-nav a");

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove("active"));
      const active = document.querySelector(`.desktop-nav a[href="#${entry.target.id}"]`);
      active?.classList.add("active");
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach(section => sectionObserver.observe(section));

// Scroll reveal animation.
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// Small cursor glow on desktop.
const glow = document.querySelector(".cursor-glow");
window.addEventListener("pointermove", e => {
  if (window.innerWidth > 900) {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  }
});

// Certificate modal.
const modal = document.getElementById("certificateModal");
const modalTitle = document.getElementById("modalTitle");
const modalContent = document.getElementById("modalContent");

document.querySelectorAll(".certificate-image").forEach(card => {
  card.addEventListener("click", () => {
    const type = card.dataset.type;
    const src = card.dataset.src;
    const title = card.dataset.title;

    modalTitle.textContent = title;
    modalContent.innerHTML = "";

    if (type === "image") {
      const img = document.createElement("img");
      img.src = src;
      img.alt = title;
      modalContent.appendChild(img);
    } else {
      const iframe = document.createElement("iframe");
      iframe.src = src;
      iframe.title = title;
      modalContent.appendChild(iframe);
    }

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  });
});

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  modalContent.innerHTML = "";
  document.body.classList.remove("modal-open");
}

document.querySelectorAll("[data-close-modal]").forEach(el => {
  el.addEventListener("click", closeModal);
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
});

// Contact form: opens the user's email client.
document.getElementById("contactForm")?.addEventListener("submit", e => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const subject = encodeURIComponent(`Portfolio contact from ${name}`);
  const body = encodeURIComponent(
    `Hi Saurav,\n\n${message}\n\nName: ${name}\nEmail: ${email}`
  );

  window.location.href =
    `mailto:sauravkumar042207@gmail.com?subject=${subject}&body=${body}`;
});
