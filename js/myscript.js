// Простой скрипт для открытия/закрытия модалки и отправки сообщений

// Находим элементы на странице
const modal = document.getElementById('contactModal');
const openBtn1 = document.getElementById('openModalBtn');
const openBtn2 = document.getElementById('heroContactBtn');
const closeBtn = document.getElementById('closeModalBtn');
const copyBtn = document.getElementById('copyBtn');
const form = document.getElementById('simpleForm');

// Функция открытия модального окна
function openModal() {
    modal.style.display = 'flex';
}

// Функция закрытия модального окна
function closeModal() {
    modal.style.display = 'none';
}

// Нажатия на кнопки "Написать"
if (openBtn1) openBtn1.onclick = openModal;
if (openBtn2) openBtn2.onclick = openModal;

// Нажатие на крестик
if (closeBtn) closeBtn.onclick = closeModal;

// Закрытие при клике мимо окна
window.onclick = function(event) {
    if (event.target === modal) {
        closeModal();
    }
};

// Кнопка копирования ника Телеграм
if (copyBtn) {
    copyBtn.onclick = function() {
        navigator.clipboard.writeText('@prosh1vka');
        copyBtn.innerText = 'Скопировано!';
        setTimeout(() => {
            copyBtn.innerText = 'Скопировать';
        }, 2000);
    };
}

// Обработка отправки формы
if (form) {
    form.onsubmit = function(event) {
        event.preventDefault();
        const name = document.getElementById('userName').value;
        const msg = document.getElementById('userMsg').value;
        const tgLink = 'https://t.me/prosh1vka?text=' + encodeURIComponent('Привет, я ' + name + '! ' + msg);
        window.open(tgLink, '_blank');
        closeModal();
    };
}
