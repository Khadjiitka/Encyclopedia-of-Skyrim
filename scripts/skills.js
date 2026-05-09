document.addEventListener("DOMContentLoaded", () => {
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
            }
        });
    }, observerOptions);

    document.querySelectorAll('.guild-item').forEach(item => {
        guildObserver.observe(item);
    });

    const overlay = document.querySelector('.page-transition-overlay');
    if (overlay) {
        setTimeout(() => overlay.classList.add('fade-out'), 100);
    }

    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#') && !link.target && !href.includes('javascript:')) {
                e.preventDefault();
                if (overlay) {
                    overlay.classList.remove('fade-out');
                    overlay.classList.add('fade-in');
                }
                setTimeout(() => { window.location.href = href; }, 600);
            }
        });
    });

    const audio = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-toggle');

    if (audio && musicBtn) {
        const syncMusic = () => {
            const isPlaying = localStorage.getItem('musicPlaying') === 'true';
            const savedTime = localStorage.getItem('musicTime');

            if (savedTime) audio.currentTime = parseFloat(savedTime);

            if (isPlaying) {
                audio.play().then(() => {
                    musicBtn.classList.add('playing');
                }).catch(() => {
                    const unlock = () => {
                        if (localStorage.getItem('musicPlaying') === 'true' && audio.paused) {
                            audio.play();
                            musicBtn.classList.add('playing');
                        }
                        document.removeEventListener('touchstart', unlock);
                    };
                    document.addEventListener('touchstart', unlock);
                });
            }
        };

        musicBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
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

        const saveProgress = () => localStorage.setItem('musicTime', audio.currentTime);
        window.addEventListener('beforeunload', saveProgress);
        window.addEventListener('pagehide', saveProgress);
        audio.addEventListener('pause', saveProgress);

        syncMusic();
    }
});