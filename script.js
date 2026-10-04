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

// ===== Project Detail Modal =====
// Fill in / edit these freely — each key matches a data-project="..." on a
// card in sections/projects.html. "features" and "stack" are optional:
// leave an array/object empty and that section just won't render.
const projectDetails = {
  attendly: {
    title: "Attendly",
    tagline: "Full-Stack · WIP",
    image: "pics/projects/attendly.png",
    description: "A volunteer/event management platform built to solve a problem I've actually run into — as someone who's helped organize events for Codeyssey and the DLSU-D Robotics Workshop, manual RSVP tracking (usually a spreadsheet, a lot of guesswork on the day) never gave organizers real visibility into who would actually show up. Attendly closes that gap: organizers post events, attendees RSVP, and the platform tracks real attendance, not just intent, giving organizers no-show rates and attendance analytics they can't get from a plain sign-up form.",
    features: [
      "Organizer dashboard for creating and managing events",
      "Public event browsing and RSVP flow for attendees",
      "Role-based access (organizer vs. attendee)",
      "Attendance tracking to measure real turnout vs. RSVPs",
      "(in progress) QR code check-in for automatic attendance logging"
    ],
    stack: {
      "Backend": "Laravel, PHP",
      "Admin panel": "Filament",
      "Database": "SQLite (development)",
      "Authentication": "Laravel Breeze",
      "Frontend": "Blade, Tailwind CSS",
      "Version control": "Git, GitHub",
      "Local environment": "Laragon"
    },
    links: [
      { label: "View Code", url: "https://github.com/mckllvg/attendly" }
    ]
  },
  "contract-checker": {
    title: "Contract Clause Checker",
    tagline: "AI Automation",
    image: "pics/projects/contract-checker.png",
    description: "An application to automatically check contract clauses for compliance and potential issues.",
    features: [],
    stack: {
      "Workflow engine": "n8n",
      "Data format": "JSON"
    },
    links: [
      { label: "View Code", url: "https://github.com/mckllvg/Contact_Clause_Checker" }
    ]
  },
  sap: {
    title: "SAP Management System",
    tagline: "Full Stack",
    image: "pics/projects/sap.png",
    description: "Replaced fragmented workflows with a centralized Laravel platform to automate and streamline multi-department approval lifecycles.",
    features: [],
    stack: {
      "Backend": "Laravel, PHP"
    },
    links: [
      { label: "View Code", url: "https://github.com/mckllvg/miescor-project" }
    ]
  },
  "beyond-genre": {
    title: "Beyond Genre",
    tagline: "Data Analysis · ML",
    image: "pics/projects/spotify-analysis.png",
    description: "Leverages K-Means clustering to map 114k+ tracks into mood quadrants and analyze how audio features dictate popularity.",
    features: [],
    stack: {
      "Language": "Python",
      "Database": "PostgreSQL"
    },
    links: [
      { label: "View Code", url: "https://github.com/mckllvg/SpotifyTrack" }
    ]
  },
  "wake-up-call": {
    title: "Wake Up Call",
    tagline: "ML · Mobile App",
    image: "pics/projects/wuc.png",
    description: "Predicts sleep apnea risk with 98% accuracy utilizing a LightGBM model and clinical questionnaires.",
    features: [],
    stack: {
      "Language": "Python",
      "Model": "LightGBM"
    },
    links: [
      { label: "View Code", url: "https://github.com/mckllvg" }
    ]
  },
  dlsud: {
    title: "DLSU-D Website",
    tagline: "UI/UX",
    image: "pics/projects/dlsud.png",
    description: "Showcasing the colleges of DLSU-D through a structured and navigable site design.",
    features: [],
    stack: {
      "Design tool": "Figma"
    },
    links: [
      { label: "View Design", url: "https://www.figma.com/proto/5TczZDnT5sT8NJLIXLnCms?node-id=0-1&t=dnhqtlDsPYg0yOMm-6" }
    ]
  },
  stellair: {
    title: "Stellair",
    tagline: "UI/UX",
    image: "pics/projects/stellair.png",
    description: "Airline reservation system prototype designed for seamless end-to-end booking flows in Figma.",
    features: [],
    stack: {
      "Design tool": "Figma"
    },
    links: [
      { label: "View Design", url: "https://www.figma.com/proto/aN6KmsufokK6nXSyyjHuli?node-id=0-1&t=dnhqtlDsPYg0yOMm-6" }
    ]
  },
  messenger: {
    title: "Messenger Revamp",
    tagline: "UI/UX",
    image: "pics/projects/messenger.png",
    description: "Messenger redesigned for senior citizens with accessibility and ease of use at its core.",
    features: [],
    stack: {
      "Design tool": "Figma"
    },
    links: [
      { label: "View Design", url: "https://www.figma.com/proto/xyg89RgrTOoWqYg7bnhOMX?node-id=0-1&t=dnhqtlDsPYg0yOMm-6" }
    ]
  }
};

let lastModalTrigger = null;

function openProjectModal(id) {
  const data = projectDetails[id];
  const modal = document.getElementById('project-modal');
  if (!data || !modal) return;

  document.getElementById('project-modal-img').src = data.image || '';
  document.getElementById('project-modal-img').alt = data.title || '';
  document.getElementById('project-modal-tagline').textContent = data.tagline || '';
  document.getElementById('project-modal-title').textContent = data.title || '';
  document.getElementById('project-modal-description').textContent = data.description || '';

  const featuresWrap = document.getElementById('project-modal-features-wrap');
  const featuresList = document.getElementById('project-modal-features');
  featuresList.innerHTML = '';
  if (data.features && data.features.length) {
    data.features.forEach(f => {
      const li = document.createElement('li');
      li.className = 'flex items-start gap-2 text-sm text-textMuted leading-relaxed';
      li.innerHTML = `<i class="fa-solid fa-circle-check text-primary text-xs mt-1 flex-shrink-0"></i><span>${f}</span>`;
      featuresList.appendChild(li);
    });
    featuresWrap.classList.remove('hidden');
  } else {
    featuresWrap.classList.add('hidden');
  }

  const stackWrap = document.getElementById('project-modal-stack-wrap');
  const stackList = document.getElementById('project-modal-stack');
  stackList.innerHTML = '';
  const stackEntries = data.stack ? Object.entries(data.stack) : [];
  if (stackEntries.length) {
    stackEntries.forEach(([key, value]) => {
      const dt = document.createElement('dt');
      dt.className = 'text-[10px] font-bold uppercase tracking-wider text-textHint';
      dt.textContent = key;
      const dd = document.createElement('dd');
      dd.className = 'text-sm text-textMain font-medium mb-2';
      dd.textContent = value;
      stackList.appendChild(dt);
      stackList.appendChild(dd);
    });
    stackWrap.classList.remove('hidden');
  } else {
    stackWrap.classList.add('hidden');
  }

  const linksWrap = document.getElementById('project-modal-links');
  linksWrap.innerHTML = '';
  (data.links || []).forEach(link => {
    const a = document.createElement('a');
    a.href = link.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.className = 'inline-flex items-center gap-1.5 bg-primary text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-primaryDark transition-all';
    a.innerHTML = `${link.label} <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>`;
    linksWrap.appendChild(a);
  });

  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  document.getElementById('project-modal-close')?.focus();
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  if (lastModalTrigger) {
    lastModalTrigger.focus();
    lastModalTrigger = null;
  }
}

function initProjectModal() {
  const cards = document.querySelectorAll('.proj-card[data-project]');
  cards.forEach(card => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.addEventListener('click', () => {
      lastModalTrigger = card;
      openProjectModal(card.dataset.project);
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        lastModalTrigger = card;
        openProjectModal(card.dataset.project);
      }
    });
  });

  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('project-modal-close');
  if (closeBtn) closeBtn.addEventListener('click', closeProjectModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeProjectModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
      closeProjectModal();
    }
  });
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

  initProjectModal();
}

document.addEventListener('DOMContentLoaded', init);