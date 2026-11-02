/**
 * Material 3 Expressive (m3.material.io) — Interactive Script
 * proshivka.github.io — Ivan Xiaomi
 */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Dark / Light Mode Toggle
    // ----------------------------------------------------
    const root = document.documentElement;
    const modeBtn = document.getElementById('modeBtn');
    const toast = document.getElementById('m3Toast');

    const savedMode = localStorage.getItem('m3_mode') || 'dark';
    setMode(savedMode);

    if (modeBtn) {
        modeBtn.addEventListener('click', () => {
            const currentMode = root.getAttribute('data-mode') || 'dark';
            const nextMode = currentMode === 'dark' ? 'light' : 'dark';
            setMode(nextMode);
            showToast(`Режим: ${nextMode === 'dark' ? 'Тёмный 🌙' : 'Светлый ☀️'}`);
        });
    }

    function setMode(mode) {
        root.setAttribute('data-mode', mode);
        localStorage.setItem('m3_mode', mode);
        if (modeBtn) {
            modeBtn.innerHTML = mode === 'dark' 
                ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>'
                : '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1z"/></svg>';
        }
    }

    // ----------------------------------------------------
    // 2. Material 3 Ripple Effect
    // ----------------------------------------------------
    document.querySelectorAll('.m3_btn_primary, .m3_btn_tonal, .bento_card, .skill_column_card, .project_card, .step_card').forEach(el => {
        el.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-wave');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 550);
        });
    });

    // ----------------------------------------------------
    // 3. Android 16 Bottom Sheet (Contact Dialog)
    // ----------------------------------------------------
    const sheetBackdrop = document.getElementById('sheetBackdrop');
    const openSheetBtns = document.querySelectorAll('.open-sheet-btn');
    const closeSheetBtn = document.getElementById('closeSheetBtn');
    const copyTgBtn = document.getElementById('copyTgBtn');

    openSheetBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openBottomSheet();
        });
    });

    if (closeSheetBtn) {
        closeSheetBtn.addEventListener('click', closeBottomSheet);
    }

    if (sheetBackdrop) {
        sheetBackdrop.addEventListener('click', (e) => {
            if (e.target === sheetBackdrop) {
                closeBottomSheet();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeBottomSheet();
            closeLightbox();
        }
    });

    function openBottomSheet() {
        if (sheetBackdrop) {
            sheetBackdrop.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeBottomSheet() {
        if (sheetBackdrop) {
            sheetBackdrop.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (copyTgBtn) {
        copyTgBtn.addEventListener('click', () => {
            navigator.clipboard.writeText('@prosh1vka').then(() => {
                showToast('Ник @prosh1vka скопирован! 📋');
            }).catch(() => {
                showToast('Telegram: @prosh1vka');
            });
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('formName')?.value || 'Гость';
            const message = document.getElementById('formMessage')?.value || '';
            const tgUrl = `https://t.me/prosh1vka?text=${encodeURIComponent(`Привет, я ${name}! ${message}`)}`;
            window.open(tgUrl, '_blank');
            closeBottomSheet();
            showToast('Переходим в Telegram...');
        });
    }

    // ----------------------------------------------------
    // 4. M3 Expressive Lightbox for Gallery
    // ----------------------------------------------------
    const galleryItems = document.querySelectorAll('.gallery_item');
    const lightbox = document.getElementById('m3Lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img && lightbox && lightboxImg) {
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // ----------------------------------------------------
    // 5. Toast Notification System
    // ----------------------------------------------------
    let toastTimeout;
    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // ----------------------------------------------------
    // 6. Mobile Menu Navigation
    // ----------------------------------------------------
    const menuToggleBtn = document.getElementById('menuToggleBtn');
    const navLinks = document.getElementById('navLinks');

    if (menuToggleBtn && navLinks) {
        menuToggleBtn.addEventListener('click', () => {
            navLinks.classList.toggle('mobile_open');
        });

        navLinks.querySelectorAll('.nav_item').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('mobile_open');
            });
        });
    }

    // ----------------------------------------------------
    // 7. ScrollSpy Active Link Tracking
    // ----------------------------------------------------
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav_item');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPos = window.pageYOffset + 140;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // ----------------------------------------------------
    // 8. Android 16 Easter Egg Counter
    // ----------------------------------------------------
    const easterEggBtn = document.getElementById('easterEggBtn');
    let tapCount = 0;
    if (easterEggBtn) {
        easterEggBtn.addEventListener('click', () => {
            tapCount++;
            if (tapCount === 1) {
                showToast('Material 3 Expressive 💜');
            } else if (tapCount === 3) {
                showToast('Snapdragon 865 & Tensor G1 Flow 🚀');
            } else if (tapCount === 7) {
                showToast('⚡ 100% Vibe Coding Mode Unlocked! 💻');
                tapCount = 0;
            }
        });
    }
});
