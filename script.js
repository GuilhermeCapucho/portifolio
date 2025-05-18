const navLinks = document.querySelectorAll('nav a');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('header nav');

//----------Menu(Mobile)----------//
menuToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
  menuToggle.classList.toggle('open');
});

//----------Navegação----------//
function navigateTo(id) {
  document.querySelectorAll('main section')
    .forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  navLinks.forEach(a => a.classList.remove('active'));
  document.querySelector(`nav a[onclick*="${id}"]`)
    .classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  nav.classList.remove('open');
  menuToggle.classList.remove('open');
}

//----------TypeWriter----------//
const typewriterPhrases = ["Desenvolvedor Backend","Entusiasta de APIs RESTful"];

let twIndex = 0;
let twChar = 0;
let isTyping = true;
const typeTarget = document.querySelector('.typewriter-target');

function typeWriterLoop() {
  const current = typewriterPhrases[twIndex];

  if (isTyping) {
    if (twChar <= current.length) {
      typeTarget.textContent = current.slice(0, twChar);
      twChar++;
      setTimeout(typeWriterLoop, 100);
    } else {
      isTyping = false;
      setTimeout(typeWriterLoop, 1000);
    }
  } else {
    if (twChar > 0) {
      twChar--;
      typeTarget.textContent = current.slice(0, twChar);
      setTimeout(typeWriterLoop, 100);
    } else {
      typeTarget.textContent = '';
      isTyping = true;
      twIndex = (twIndex + 1) % typewriterPhrases.length;
      setTimeout(typeWriterLoop, 500);
    }
  }
}

window.addEventListener('load', () => {
  typeWriterLoop();
});


//----------Botão-de-trocas-de-tema----------//
const themeToggle = document.getElementById('theme-toggle');
const themeIcon   = document.getElementById('theme-icon');
const root        = document.documentElement;
const saved = localStorage.getItem('theme');

if (saved === 'light') {
  root.removeAttribute('data-theme');
  themeIcon.src = 'assets/icons/moon-icon.png';
} else {
  root.setAttribute('data-theme', 'dark');
  themeIcon.src = 'assets/icons/sun-icon.png';
  localStorage.setItem('theme', 'dark');
}

themeToggle.addEventListener('click', () => {
  const isDark = root.getAttribute('data-theme') === 'dark';
  if (isDark) {
    root.removeAttribute('data-theme');
    themeIcon.src = 'assets/icons/moon-icon.png';
    localStorage.setItem('theme', 'light');
  } else {
    root.setAttribute('data-theme', 'dark');
    themeIcon.src = 'assets/icons/sun-icon.png';
    localStorage.setItem('theme', 'dark');
  }
  initParticles(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
});

//----------Envio-de-emails-página-contato----------//
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(event) {
  event.preventDefault();

  emailjs.sendForm('service_guicap', 'template_l4j0i0c', this)
    .then(() => {
      alert('Mensagem enviada com sucesso!');
      contactForm.reset();
    }, (err) => {
      console.error('Erro ao enviar:', err);
      alert('Ocorreu um erro ao enviar, tente novamente.');
    });
});
