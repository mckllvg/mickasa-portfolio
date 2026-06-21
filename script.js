const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["mi casa.", "mickasa."];
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 500);
  }
}

async function loadSectionFragments() {
  const includeElements = document.querySelectorAll('[data-include]');
  for (const element of includeElements) {
    const src = element.getAttribute('data-include');
    if (!src) continue;

    try {
      const response = await fetch(src);
      if (!response.ok) {
        console.error(`Failed to load section: ${src} (${response.status})`);
        continue;
      }
      element.innerHTML = await response.text();
    } catch (error) {
      console.error(`Error loading section ${src}:`, error);
    }
  }
}

function toggleMoreProjects() {
  const extraCards = document.querySelectorAll('.extra-proj');
  const toggleBtn = document.getElementById('proj-toggle-btn');
  if (!extraCards.length || !toggleBtn) return;

  const isHidden = extraCards[0].classList.contains('hidden');
  extraCards.forEach(card => card.classList.toggle('hidden'));

  if (isHidden) {
    toggleBtn.innerHTML = 'See Less ↑';
  } else {
    toggleBtn.innerHTML = 'See More ↓';
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  }
}

function initAOS() {
  if (window.AOS) {
    AOS.init({ once: true, duration: 600, offset: 60 });
  }
}

function closeMobileNav() {
  const mobileNavToggleBtn = document.getElementById('mobile-nav-toggle');
  const mobileNavMenu = document.getElementById('mobile-nav-menu');
  if (!mobileNavMenu || !mobileNavToggleBtn) return;

  if (!mobileNavMenu.classList.contains('hidden')) {
    mobileNavMenu.classList.add('hidden');
    mobileNavToggleBtn.setAttribute('aria-expanded', 'false');
    mobileNavToggleBtn.innerHTML = '<i class="fa-solid fa-bars text-xl"></i>';
  }
}

function toggleMobileNav() {
  const mobileNavToggleBtn = document.getElementById('mobile-nav-toggle');
  const mobileNavMenu = document.getElementById('mobile-nav-menu');
  if (!mobileNavMenu || !mobileNavToggleBtn) return;

  const isHidden = mobileNavMenu.classList.toggle('hidden');
  const isOpen = !isHidden;
  mobileNavToggleBtn.setAttribute('aria-expanded', String(isOpen));
  mobileNavToggleBtn.innerHTML = isOpen ? '<i class="fa-solid fa-xmark text-xl"></i>' : '<i class="fa-solid fa-bars text-xl"></i>';
}

async function init() {
  await loadSectionFragments();

  const projectToggle = document.getElementById('proj-toggle-btn');
  if (projectToggle) {
    projectToggle.addEventListener('click', toggleMoreProjects);
  }

  const mobileNavToggleBtn = document.getElementById('mobile-nav-toggle');
  const mobileNavMenu = document.getElementById('mobile-nav-menu');
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', toggleMobileNav);
  }
  if (mobileNavMenu) {
    mobileNavMenu.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        closeMobileNav();
      }
    });
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      closeMobileNav();
    }
  });

  initAOS();

  if (textArray.length) {
    setTimeout(type, newTextDelay + 250);
  }
}

document.addEventListener('DOMContentLoaded', init);

