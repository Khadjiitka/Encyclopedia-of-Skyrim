//  отключение уже выбранных гильдий в других селектах
        document.querySelectorAll(".guild-select").forEach(select => {
            select.addEventListener("change", updateGuildOptions);
        });

        function updateGuildOptions() {

            const selects = document.querySelectorAll(".guild-select");
            let selectedValues = [];

            // собираем выбранные значения
            selects.forEach(sel => {
                if (sel.value !== "") {
                    selectedValues.push(sel.value);
                }
            });

            // обновляем каждый select
            selects.forEach(sel => {
                let currentValue = sel.value;

                Array.from(sel.options).forEach(option => {

                    if (option.value === "") return;

                    if (selectedValues.includes(option.value) && option.value !== currentValue) {
                        option.disabled = true;
                    } else {
                        option.disabled = false;
                    }

                });

            });

        }
    let isLogin = false;

        function toggleForms() {
            const reg = document.getElementById("registerForm");
            const log = document.getElementById("loginForm");
            const btn = document.getElementById("toggleBtn");
            const title = document.getElementById("mainTitle");

            if (!isLogin) {
                reg.classList.add("hidden-form");
                log.classList.remove("hidden-form");
                btn.textContent = "Create Character";
                title.textContent = "Enter Skyrim";
                isLogin = true;
            } else {
                log.classList.add("hidden-form");
                reg.classList.remove("hidden-form");
                btn.textContent = "Login";
                title.textContent = "Create Your Character";
                isLogin = false;
            }
        }

        function showWeaponOptions() {
            let value = document.getElementById("weaponClass").value;

            document.querySelectorAll(".sub-options").forEach(el => {
                el.classList.remove("visible");
                el.classList.add("hidden");
            });

            if (value === "one") {
                document.getElementById("oneOptions").classList.add("visible");
            }
            if (value === "two") {
                document.getElementById("twoOptions").classList.add("visible");
            }
            if (value === "archery") {
                document.getElementById("archeryOptions").classList.add("visible");
            }
            if (value === "magic") {
                document.getElementById("magicOptions").classList.add("visible");
            }
}
        const stoneDescriptions = {
            "The Apprentice Stone": "+100% Magicka regeneration, but grants 100% Weakness to Magic. High risk, high reward for casters.",
            "The Atronach Stone": "Grants +50 Magicka and 50% Spell Absorption, but slows Magicka regeneration by 50%.",
            "The Lady Stone": "Regenerate both Health and Stamina 25% faster.",
            "The Lord Stone": "Provides +50 Armor Rating and 25% Magic Resistance. Excellent for defensive builds.",
            "The Lover Stone": "All skills increase 15% faster.",
            "The Mage Stone": "Magic skills increase 20% faster.",
            "The Ritual Stone": "Allows you to reanimate all nearby corpses to fight for you once per day.",
            "The Serpent Stone": "Ranged attack that paralyzes a target for 5 seconds and deals 25 poison damage once per day.",
            "The Steed Stone": "Increases Carry Weight by 100 and makes equipped armor weightless with no movement penalty.",
            "The Shadow Stone": "Grants Invisibility for 60 seconds once per day.",
            "The Thief Stone": "Stealth skills increase 20% faster.",
            "The Tower Stone": "Automatically unlocks any Expert level lock (or lower) once per day.",
            "The Warrior Stone": "Combat skills increase 20% faster."
        };

        const stoneSelect = document.querySelector('select[name="standing_stone"]');
        const descriptionDisplay = document.getElementById('stone-description');

        stoneSelect.addEventListener('change', function () {
            const selectedStone = this.value;
            descriptionDisplay.textContent = stoneDescriptions[selectedStone] || "Choose a standing stone to see its effect...";
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