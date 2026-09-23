let typedTextSpan;
let cursorSpan;

const textArray = ["mi casa.", "mickasa."];
const typingDelay = 150;
const erasingDelay = 100;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function type() {
  if (!typedTextSpan || !cursorSpan) return;
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
  if (!typedTextSpan || !cursorSpan) return;
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
      if (response.ok) {
        element.innerHTML = await response.text();
      } else {
        console.error(`Failed to load section ${src}: HTTP ${response.status}`);
      }
    } catch (error) {
      // This will fire if the page is opened directly via file:// instead of
      // through a local server (fetch of local files is blocked by CORS).
      console.error(`Error loading section ${src}. Are you serving this over http(s):// and not file://?`, error);
    }
  }
}

// Fix: previously this toggled the menu but never updated aria-expanded,
// so screen readers always reported the menu as closed.
function toggleMobileNav() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const mobileNavMenu = document.getElementById('mobile-nav-menu');
  if (!mobileNavMenu || !toggleBtn) return;
  mobileNavMenu.classList.toggle('hidden');
  const isOpen = !mobileNavMenu.classList.contains('hidden');
  toggleBtn.setAttribute('aria-expanded', String(isOpen));
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
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
  }
}

async function init() {
  await loadSectionFragments();

  if (window.AOS) {
    AOS.init({
      once: true,
      duration: prefersReducedMotion ? 0 : 600,
      offset: 50,
      disable: prefersReducedMotion
    });
  }

  typedTextSpan = document.querySelector(".typed-text");
  cursorSpan = document.querySelector(".cursor");
  if (typedTextSpan && cursorSpan && textArray.length) {
    if (prefersReducedMotion) {
      // Skip the typing animation entirely; just show the final text.
      typedTextSpan.textContent = textArray[textArray.length - 1];
    } else {
      setTimeout(type, 1000);
    }
  }

  const mobileNavToggleBtn = document.getElementById('mobile-nav-toggle');
  const mobileNavMenu = document.getElementById('mobile-nav-menu');
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', toggleMobileNav);
  }
  if (mobileNavMenu) {
    mobileNavMenu.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        mobileNavMenu.classList.add('hidden');
        mobileNavToggleBtn?.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const projectToggle = document.getElementById('proj-toggle-btn');
  if (projectToggle) {
    projectToggle.addEventListener('click', toggleMoreProjects);
  }
}

document.addEventListener('DOMContentLoaded', init);