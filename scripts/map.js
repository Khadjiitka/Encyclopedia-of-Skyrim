        /* DATA */
        const maps = {
            skyrim: {
                img: "../pic/SkyrimMap.webp",
                text: `
        <h2>Skyrim</h2>

        <p>
        Skyrim is the northernmost province of Tamriel — a land of ice, war, and ancient power.
        </p>

        <h3>Major Cities</h3>

        <p><b>Whiterun</b> — central trade city.</p>
        <p><b>Solitude</b> — imperial capital.</p>
        <p><b>Windhelm</b> — ancient Nordic city.</p>
        <p><b>Riften</b> — city of thieves.</p>
        <p><b>Markarth</b> — Dwemer stone city.</p>
        `
            },

            tamriel: {
                img: "../pic/Tamriel.jpg",
                text: `
        <h2>Tamriel</h2>
        <p>
            Tamriel is the vast continent that serves as the heart of Nirn. It is divided into nine distinct provinces, 
            each home to unique races, cultures, and ancient traditions. From the frozen peaks of the north to the 
            lush jungles of the south, Tamriel is a land of constant struggle and divine mystery.
        </p>

        <h3>Core Provinces</h3>
        <p><b>Cyrodiil</b> — The Imperial heartland, featuring the majestic White-Gold Tower and a temperate climate.</p>
        <p><b>Morrowind</b> — Home of the Dunmer, a strange land of ash, giant mushrooms, and the Red Mountain.</p>
        <p><b>High Rock</b> — Land of the Bretons, filled with many warring kingdoms and feudal lordships.</p>
        <p><b>Hammerfell</b> — The rugged desert home of the Redguards, masters of the curved sword.</p>
        <p><b>Summerset Isles</b> — The ancestral home of the Altmer, a realm of high magic and crystalline architecture.</p>
        <p><b>Valenwood</b> — An endless sea of green, home to the Bosmer and their migrating tree-cities.</p>
        <p><b>Elsweyr</b> — Terraced canyons and warm sands, where the Khajiit follow the moon's phases.</p>
        <p><b>Black Marsh</b> — The impenetrable swamps of the Argonians, a place where few outsiders survive.</p>
    `
            }
        
        };

        /* SWITCH */
        function switchMap(type) {
            const img = document.getElementById("mapImage");
            const text = document.getElementById("infoText");

            img.style.opacity = 0;
            text.classList.remove("show");

            setTimeout(() => {
                img.src = maps[type].img;
                text.innerHTML = maps[type].text;

                img.style.opacity = 1;

                setTimeout(() => {
                    text.classList.add("show");
                }, 100);

            }, 300);
        }

        /* CURSOR PARALLAX */
        const map = document.getElementById("mapImage");

        document.querySelector(".map-container").addEventListener("mousemove", (e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            map.style.transform = `
        scale(1.2)
        translate(${(x - 0.5) * 40}px, ${(y - 0.5) * 40}px)
    `;
        });

        document.querySelector(".map-container").addEventListener("mouseleave", () => {
            map.style.transform = ` scale(1.25) translate(${(x - 0.5) * 60}px, ${(y - 0.5) * 60}px)
`;
        });

        /* SCROLL ANIMATION */
        function handleScroll() {
            document.querySelectorAll('.scroll-animate').forEach(el => {
                const rect = el.getBoundingClientRect();

                if (rect.top < window.innerHeight - 100) {
                    el.classList.add('show');
                }
            });
        }

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('load', handleScroll);

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