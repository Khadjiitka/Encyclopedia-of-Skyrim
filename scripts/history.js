                /* TITLE ANIMATION */
        window.addEventListener("load", () => {
            document.getElementById("title").classList.add("show");
        });

                /* LOAD JSON */
        fetch("../history_of_tamriel.json")
                .then(res => res.json())
                .then(data => {
                    const container = document.getElementById("story");

                    data.eras.forEach(era => {
                        const eraTitle = document.createElement("h1");
                        eraTitle.textContent = era.name;
                        container.appendChild(eraTitle);

                        era.sections.forEach(section => {
                            const h2 = document.createElement("h2");
                            h2.textContent = section.title;
                            h2.classList.add("reveal");

                            const p = document.createElement("p");
                            p.textContent = section.content; 
                            p.classList.add("reveal");

                            container.appendChild(h2);
                            container.appendChild(p);

                            observer.observe(h2);
                            observer.observe(p);
                        });
                    });
                })
                .catch(err => console.error("Ошибка загрузки:", err));

        /* PARALLAX */
        window.addEventListener("scroll", () => {

            let scrollY = window.scrollY;

            document.querySelectorAll(".layer").forEach(layer => {

                let speed = layer.dataset.speed;
                layer.style.transform = `translateY(${scrollY * speed}px)`;

            });

        });

        /* REVEAL SCROLL */
       const observerOptions = {
    threshold: 0.15,       // Элемент считается видимым, когда 15% его площади в кадре
    rootMargin: "0px 0px -10% 0px" // Небольшой отступ снизу, чтобы элементы не всплывали слишком рано
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        } else {
            entry.target.classList.remove("active");
        }
    });
}, observerOptions);

const revealElements = document.querySelectorAll('.reveal'); 

revealElements.forEach(el => {
    observer.observe(el);
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
            const playPromise = audio.play();

            if (playPromise !== undefined) {
                playPromise.then(() => {
                    musicBtn.classList.add('playing');
                }).catch(() => {
                    console.log("Автоплей заблокирован. Ждем клика.");
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

    setInterval(() => {
        if (!audio.paused) {
            localStorage.setItem('musicTime', audio.currentTime);
        }
    }, 1000);

    // Логика кнопки
    musicBtn.addEventListener('click', (e) => {
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

    window.addEventListener('load', syncMusic);

    window.addEventListener('beforeunload', () => {
        localStorage.setItem('musicTime', audio.currentTime);
    });