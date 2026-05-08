    window.addEventListener("DOMContentLoaded", () => {
        const content = document.querySelector('.content');
        if (content) content.classList.add('visible');

        const observerOptions = {
            threshold: 0.1, 
            rootMargin: "0px 0px -50px 0px"
        };

        const guildObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                } else {
                    entry.target.classList.remove('show');
                }
            });
        }, observerOptions);

        const items = document.querySelectorAll('.guild-item');

        items.forEach((item) => {
            item.style.transition = "all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)";

            guildObserver.observe(item);
        });
    });

    document.addEventListener("DOMContentLoaded", () => {
        const overlay = document.querySelector('.page-transition-overlay');

        if (overlay) {
            setTimeout(() => {
                overlay.classList.add('fade-out');
            }, 100);
        }
        const links = document.querySelectorAll('a');

        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && !href.startsWith('#') && !link.target && href !== 'javascript:void(0);') {
                    e.preventDefault(); 

                    overlay.classList.remove('fade-out');
                    overlay.classList.add('fade-in');
                    setTimeout(() => {
                        window.location.href = href;
                    }, 600);
                }
            });
        });
    });

    const audio = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-toggle');

    const syncMusic = () => {
        const isPlaying = localStorage.getItem('musicPlaying') === 'true';
        const savedTime = localStorage.getItem('musicTime');

        if (savedTime) {
            audio.currentTime = parseFloat(savedTime);
        }

        if (isPlaying) {
            // Пытаемся включить
            const playPromise = audio.play();

            if (playPromise !== undefined) {
                playPromise.then(() => {
                    musicBtn.classList.add('playing');
                }).catch(() => {
                    console.log("Автоплей заблокирован. Ждем клика.");
                    // Если заблокировано, включаем при первом клике по документу
                    document.addEventListener('click', () => {
                        if (localStorage.getItem('musicPlaying') === 'true' && audio.paused) {
                            audio.play();
                            musicBtn.classList.add('playing');
                        }
                    }, { once: true });
                });
            }
        }
    };

    // Сохраняем прогресс
    setInterval(() => {
        if (!audio.paused) {
            localStorage.setItem('musicTime', audio.currentTime);
        }
    }, 1000);

    // Логика кнопки
    musicBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Чтобы не срабатывал listener на document
        if (audio.paused) {
            audio.play();
            musicBtn.classList.add('playing');
            localStorage.setItem('musicPlaying', 'true');
        } else {
            audio.pause();
            musicBtn.classList.remove('playing');
            localStorage.setItem('musicPlaying', 'false');
        }
    });

    window.addEventListener('load', syncMusic);

    window.addEventListener('beforeunload', () => {
        localStorage.setItem('musicTime', audio.currentTime);
    });