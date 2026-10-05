/**
 * ÄRMEL - INTERACTIVE APPLICATION CONTROLLER
 * Ultra-Responsive Navigation, Modal System & Lead Pipeline Simulator
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initSideNavigator();
  initUnitModal();
  initMarcaModal();
  initFranchiseForm();
  initJourneySteppers();
  initAdminPanel();
});

/* ==========================================================================
   NAVIGATION & HEADER
   ========================================================================== */
function initNavigation() {
  const topNav = document.getElementById('topNav');
  const mobileToggle = document.getElementById('mobileToggle');

  // Handle header background on scroll
  const handleScroll = () => {
    if (window.scrollY > 40) {
      topNav.classList.add('scrolled');
    } else {
      topNav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Smooth scroll for all internal links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Explore button scroll
  const btnExplore = document.getElementById('btnExplore');
  if (btnExplore) {
    btnExplore.addEventListener('click', (e) => {
      e.preventDefault();
      const visaoSec = document.getElementById('visao');
      if (visaoSec) {
        visaoSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}

/* ==========================================================================
   RIGHT FLOATING STEP NAVIGATOR & SCROLL SPY
   ========================================================================== */
function initSideNavigator() {
  const sideNavItems = document.querySelectorAll('.side-nav-item');
  const navProgressBar = document.getElementById('navProgressBar');
  if (!sideNavItems.length) return;

  const sections = [
    { id: 'hero', navTarget: 'hero' },
    { id: 'visao', navTarget: 'hero' }, // Visao is represented as 01 VISÃO
    { id: 'experiencia', navTarget: 'experiencia' },
    { id: 'rede', navTarget: 'rede' },
    { id: 'franquia', navTarget: 'franquia' },
    { id: 'gestao', navTarget: 'gestao' },
    { id: 'evolucao', navTarget: 'evolucao' },
    { id: 'investimento', navTarget: 'investimento' }
  ];

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -50% 0px',
    threshold: 0
  };

  let activeSectionIndex = 0;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        const matchingSec = sections.find(s => s.id === sectionId);
        if (matchingSec) {
          setActiveNavItem(matchingSec.navTarget);
        }
      }
    });
  }, observerOptions);

  sections.forEach(s => {
    const el = document.getElementById(s.id);
    if (el) observer.observe(el);
  });

  function setActiveNavItem(targetId) {
    let currentIdx = 0;
    sideNavItems.forEach((item, idx) => {
      const isMatch = item.getAttribute('data-target') === targetId;
      item.classList.toggle('active', isMatch);
      if (isMatch) currentIdx = idx;
    });

    if (navProgressBar) {
      const percentage = (currentIdx / (sideNavItems.length - 1)) * 100;
      navProgressBar.style.height = `${percentage}%`;
    }
  }

  // Click handling on side items
  sideNavItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = item.getAttribute('data-target');
      const targetEl = document.getElementById(targetId) || (targetId === 'hero' ? document.getElementById('hero') : null);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ==========================================================================
   UNITS DATA & MODAL SYSTEM
   ========================================================================== */
const UNITS_DATA = {
  curitiba: {
    code: '01',
    name: 'CURITIBA',
    state: 'PR',
    image: 'assets/images/unit_curitiba.jpg',
    address: 'Av. Endereço, 0000 - Bairro, Cidade - UF',
    hours: 'Seg a Sex: 0XhXX às XXh00 | Sáb: XXh00 às XXh00',
    amenities: [
      'Official HYROX Training Center',
      'Pista de Corrida Indoor',
      'Espaço Cryo & Recovery',
      'Vestiários com Ducha Aquecida',
      'Estacionamento Exclusivo'
    ],
    whatsapp: 'https://wa.me/5541999999999?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20um%20treino%20na%20unidade%20Curitiba%20%C3%84rmel.'
  },
  moema: {
    code: '02',
    name: 'MOEMA',
    state: 'SP',
    image: 'assets/images/unit_moema.jpg',
    address: 'Av. Endereço, 0000 - Bairro, Cidade - UF',
    hours: 'Seg a Sex: 0XhXX às XXh00 | Sáb: XXh00 às XXh00',
    amenities: [
      'Official HYROX Hub Moema',
      'Estações Olímpicas Eleiko',
      'Recovery Lounge & Sauna Seca',
      'Nutrition Bar Integrado',
      'Valet Service'
    ],
    whatsapp: 'https://wa.me/5511999999999?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20um%20treino%20na%20unidade%20Moema%20%C3%84rmel.'
  },
  madalena: {
    code: '03',
    name: 'MADALENA',
    state: 'SP',
    image: 'assets/images/unit_madalena.jpg',
    address: 'Av. Endereço, 0000 - Bairro, Cidade - UF',
    hours: 'Seg a Sex: 0XhXX às XXh00 | Sáb: XXh00 às XXh00',
    amenities: [
      'Boutique Athletic Studio',
      'Turmas Reduzidas de HYROX',
      'Área Externa para Conditioning',
      'Armários Inteligentes',
      'Cafeteria Especializada'
    ],
    whatsapp: 'https://wa.me/5511988888888?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20um%20treino%20na%20unidade%20Madalena%20%C3%84rmel.'
  },
  piracicaba: {
    code: '04',
    name: 'PIRACICABA',
    state: 'SP',
    image: 'assets/images/unit_piracicaba.jpg',
    address: 'Av. Endereço, 0000 - Bairro, Cidade - UF',
    hours: 'Seg a Sex: 0XhXX às XXh00 | Sáb: XXh00 às XXh00',
    amenities: [
      'Complexo de Treinamento 1.200m²',
      'Pista Oficial de Sled Prowler',
      'Rigs Customizados de Cross-Training',
      'Avaliação Física com InBody 770',
      'Área Kids Supervisionada'
    ],
    whatsapp: 'https://wa.me/5519999999999?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20um%20treino%20na%20unidade%20Piracicaba%20%C3%84rmel.'
  }
};

function initUnitModal() {
  const modal = document.getElementById('unitModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const modalUnitImg = document.getElementById('modalUnitImg');
  const modalUnitCode = document.getElementById('modalUnitCode');
  const modalUnitTitle = document.getElementById('modalUnitTitle');
  const modalUnitState = document.getElementById('modalUnitState');
  const modalUnitAddress = document.getElementById('modalUnitAddress');
  const modalUnitHours = document.getElementById('modalUnitHours');
  const modalAmenities = document.getElementById('modalAmenities');
  const modalWhatsappBtn = document.getElementById('modalWhatsappBtn');
  const modalFranchiseBtn = document.getElementById('modalFranchiseBtn');

  if (!modal) return;

  // Open modal on unit card click
  document.querySelectorAll('.unit-card').forEach(card => {
    card.addEventListener('click', () => {
      const unitKey = card.getAttribute('data-unit');
      const data = UNITS_DATA[unitKey];
      if (!data) return;

      modalUnitImg.src = data.image;
      modalUnitImg.alt = `Unidade Ärmel ${data.name}`;
      modalUnitCode.textContent = data.code;
      modalUnitTitle.textContent = data.name;
      modalUnitState.textContent = data.state;
      modalUnitAddress.textContent = data.address;
      modalUnitHours.textContent = data.hours;
      modalWhatsappBtn.href = data.whatsapp;

      modalAmenities.innerHTML = '';
      data.amenities.forEach(am => {
        const tag = document.createElement('span');
        tag.className = 'amenity-tag';
        tag.textContent = am;
        modalAmenities.appendChild(tag);
      });

      openModal(modal);
    });
  });

  closeBtn.addEventListener('click', () => closeModal(modal));
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal(modal);
  });

  if (modalFranchiseBtn) {
    modalFranchiseBtn.addEventListener('click', () => {
      closeModal(modal);
    });
  }

  // ESC key listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(modal);
      const marcaModal = document.getElementById('marcaModal');
      if (marcaModal) closeModal(marcaModal);
    }
  });
}

function initMarcaModal() {
  const marcaCard = document.querySelector('[data-modal="modal-marca"]');
  const marcaModal = document.getElementById('marcaModal');
  const marcaCloseBtn = document.getElementById('marcaModalCloseBtn');

  if (marcaCard && marcaModal) {
    marcaCard.addEventListener('click', () => {
      openModal(marcaModal);
    });

    if (marcaCloseBtn) {
      marcaCloseBtn.addEventListener('click', () => closeModal(marcaModal));
    }

    marcaModal.addEventListener('click', (e) => {
      if (e.target === marcaModal) closeModal(marcaModal);
    });
  }
}

function openModal(modalElement) {
  modalElement.classList.add('is-open');
  modalElement.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal(modalElement) {
  modalElement.classList.remove('is-open');
  modalElement.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

/* ==========================================================================
   JOURNEY STEPPERS INTERACTIVITY
   ========================================================================== */
function initJourneySteppers() {
  const journeyCards = document.querySelectorAll('.journey-card');

  journeyCards.forEach(card => {
    const steps = card.querySelectorAll('.timeline-step');
    steps.forEach((step, index) => {
      step.addEventListener('click', () => {
        steps.forEach(s => s.classList.remove('is-active'));
        step.classList.add('is-active');

        // Provide quick feedback
        const stepName = step.querySelector('.step-label').textContent;
        showToast(`Etapa selecionada: ${stepName}`);
      });
    });
  });
}

/* ==========================================================================
   FRANCHISE FORM & LIVE PIPELINE SIMULATION
   ========================================================================== */
function initFranchiseForm() {
  const form = document.getElementById('franchiseForm');
  const feedback = document.getElementById('formFeedback');
  const submitBtn = document.getElementById('btnSubmitFranchise');

  const pipe1 = document.getElementById('pipeStep1');
  const pipe2 = document.getElementById('pipeStep2');
  const pipe3 = document.getElementById('pipeStep3');

  if (!form) return;

  // Phone mask formatting
  const phoneInput = document.getElementById('leadPhone');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '');
      if (v.length > 11) v = v.substring(0, 11);
      if (v.length > 10) {
        v = v.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      } else if (v.length > 6) {
        v = v.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
      } else if (v.length > 2) {
        v = v.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
      }
      e.target.value = v;
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('leadName').value.trim();
    const email = document.getElementById('leadEmail').value.trim();
    const phone = document.getElementById('leadPhone').value.trim();
    const city = document.getElementById('leadCity').value;

    if (!name || !email || !phone || !city) {
      showToast('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Disable button during submission
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>PROCESSANDO...</span>';

    setTimeout(() => {
      form.style.display = 'none';
      feedback.style.display = 'block';
      showToast(`Obrigado, ${name.split(' ')[0]}! Lead cadastrado com sucesso.`);
    }, 900);
  });
}

/* ==========================================================================
   SECTION 05 | ADMIN DASHBOARD PANEL INTERACTIVITY
   ========================================================================== */
function initAdminPanel() {
  const adminNavItems = document.querySelectorAll('.admin-nav-item');
  const btnAdd = document.getElementById('btnAdminAddUnit');
  const editButtons = document.querySelectorAll('.btn-row-edit');

  // Tab switching
  adminNavItems.forEach(item => {
    item.addEventListener('click', () => {
      adminNavItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      const tabName = item.querySelector('span').textContent;
      showToast(`Aba ativa no painel: ${tabName}`);
    });
  });

  // Add unit action
  if (btnAdd) {
    btnAdd.addEventListener('click', () => {
      showToast('Painel Ärmel: Adicione novas unidades facilmente sem precisar de código!');
    });
  }

  // Row edit action
  editButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const row = e.target.closest('tr');
      const unitName = row ? row.querySelector('.col-name strong').textContent : 'Unidade';
      showToast(`Editando ${unitName}: fotos, horários e endereço atualizáveis instantaneamente.`);
    });
  });
}

/* ==========================================================================
   TOAST NOTIFICATION
   ========================================================================== */
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  const toastMsg = document.getElementById('toastMessage');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

