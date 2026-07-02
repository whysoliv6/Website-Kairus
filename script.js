// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
navToggle?.addEventListener('click', () => {
  mainNav.classList.toggle('open');
});
mainNav?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mainNav.classList.remove('open'));
});

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  q.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    item.classList.toggle('open', !isOpen);
    q.querySelector('span').textContent = !isOpen ? '−' : '+';
  });
});

// Services tabs
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.tab-panel');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.querySelector(`.tab-panel[data-panel="${tab.dataset.tab}"]`).classList.add('active');
  });
});

// Testimonial slider
const slides = document.querySelectorAll('.testi-slide');
let testiIndex = 0;
function showSlide(i){
  slides.forEach(s => s.classList.remove('active'));
  testiIndex = (i + slides.length) % slides.length;
  slides[testiIndex].classList.add('active');
}
document.getElementById('testiPrev')?.addEventListener('click', () => showSlide(testiIndex - 1));
document.getElementById('testiNext')?.addEventListener('click', () => showSlide(testiIndex + 1));
setInterval(() => showSlide(testiIndex + 1), 6000);

// Contact form (no backend — demo confirmation only)
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  formNote.textContent = "Thanks! We'll get back to you within 1-2 business days.";
  contactForm.reset();
});
