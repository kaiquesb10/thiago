// Animação de digitação
document.addEventListener("DOMContentLoaded", () => {
    const typingElement = document.getElementById("typing-effect");
    const words = ["Kung Fu", "TAF", "Musculação", "Powerlifting"];
    let wordIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < words[wordIndex].length) {
            typingElement.textContent += words[wordIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 150);
        } else {
            setTimeout(erase, 1000);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typingElement.textContent = words[wordIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 100);
        } else {
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, 500);
        }
    }

    type();
});

// Menu mobile
function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('active');
}

// Carrossel
let currentIndex = 0;
const totalCards = document.querySelectorAll('.modalidade-card').length;

function moveCarrossel(direction) {
    currentIndex = (currentIndex + direction + totalCards) % totalCards;
    const offset = -currentIndex * 100;
    document.querySelector('.carrossel-container').style.transform = `translateX(${offset}%)`;
}

// Animação suave ao scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animação de entrada dos cards
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.method-card, .modalidade-card').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Modal aprimorado
function openModal(modalId) {
    const modal = document.getElementById(`${modalId}-modal`);
    modal.style.display = "flex";
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

function closeModal(modalId) {
    const modal = document.getElementById(`${modalId}-modal`);
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = "none";
    }, 300);
}

// Funções para o formulário de anamnese
function openAnamnese(event) {
    event.preventDefault();
    const modal = document.getElementById('anamnese-modal');
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    return false;
}

function closeAnamnese() {
    const modal = document.getElementById('anamnese-modal');
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

let currentPage = 1;
const totalPages = 4;

function updateProgress() {
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        if (index + 1 <= currentPage) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });

    const prevBtn = document.querySelector('.btn-prev');
    const nextBtn = document.querySelector('.btn-next');
    const submitBtn = document.querySelector('.anamnese-form .btn-submit');

    prevBtn.style.display = currentPage === 1 ? 'none' : 'block';
    nextBtn.style.display = currentPage === totalPages ? 'none' : 'block';
    submitBtn.style.display = currentPage === totalPages ? 'block' : 'none';
}

function showPage(pageNum) {
    const pages = document.querySelectorAll('.anamnese-page');
    pages.forEach(page => {
        page.classList.remove('active');
        if (parseInt(page.dataset.page) === pageNum) {
            page.classList.add('active');
        }
    });
}

function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
        updateProgress();
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
        updateProgress();
    }
}

// Adicionar validação do formulário
document.getElementById('anamnese-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Adicione aqui a lógica para enviar os dados do formulário
    alert('Formulário enviado com sucesso!');
    closeAnamnese();
});

// Inicializar o progresso
document.addEventListener('DOMContentLoaded', updateProgress);