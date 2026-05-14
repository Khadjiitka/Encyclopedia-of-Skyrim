

        // Логика интерфейса
        document.addEventListener("DOMContentLoaded", () => {
            const overlay = document.querySelector('.page-transition-overlay');
            const toggleBtn = document.querySelector('.mobile-menu-toggle');
            const sideMenu = document.querySelector('.side-menu');

            if (overlay) {
                setTimeout(() => {
                    overlay.classList.add('fade-out');
                }, 100);
            }

            if (toggleBtn && sideMenu) {
                toggleBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    sideMenu.classList.toggle('active');
                });

                const menuLinks = document.querySelectorAll('.side-menu a');
                menuLinks.forEach(link => {
                    link.addEventListener('click', () => {
                        sideMenu.classList.remove('active');
                    });
                });

                document.addEventListener('click', (e) => {
                    if (!sideMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
                        sideMenu.classList.remove('active');
                    }
                });
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
                        console.log("Autoplay is disabled. Please click to play.");
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