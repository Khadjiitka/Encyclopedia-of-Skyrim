    // ---  ЖИВОЙ ПОИСК ---
    const searchInput = document.getElementById('monsterSearch');
    const monsterss = document.querySelectorAll('.category-item');

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        monsterss.forEach(monster => {
            const name = monster.querySelector('.category-info').innerText.toLowerCase();
            
            if (name.includes(term)) {
                monster.style.display = "block";
            } else {
                monster.style.display = "none";
            }
        });

        document.querySelectorAll('.category-section').forEach(section => {
            const hasVisible = Array.from(section.querySelectorAll('.category-item'))
                .some(m => m.style.display !== "none");
            section.style.display = hasVisible ? "flex" : "none";
        });
    });

    // ---  МОДАЛЬНЫЕ ОКНА ---
        const modal = document.getElementById('monsterModal');
        const closeModal = document.querySelector('.close-modal');
        const monsters = document.querySelectorAll('.category-item');

        const monsterStats = {
            "Ancient Dragon": {
                hp: "3071", weak: "Dragonrend", loot: "Dragon Scales, Bone",
                desc: "Ancient masters of the sky. Their scales are as hard as daedric steel, and their Shout can shatter mountains."
            },
            "Elder Dragon": {
                hp: "2255", weak: "Dragonrend", loot: "Dragon Scales, Bone",
                desc: "Bronze-skinned tyrants who have survived since the Merethic Era. They command the elements with terrifying ease."
            },
            "Blood Dragon": {
                hp: "1421", weak: "Dragonrend", loot: "Dragon Scales, Bone",
                desc: "Recognized by their finned crowns and tails, these aggressive hunters track their prey across the tundra."
            },
            "Fire Dragon": {
                hp: "905", weak: "Frost", loot: "Dragon Scales, Bone",
                desc: "Common but deadly, these Dovah embody the fury of Akatosh's fire. They are weak against the bite of frost."
            },
            "Ice Dragon": {
                hp: "1055", weak: "Fire", loot: "Dragon Scales, Bone",
                desc: "Wreathed in the eternal cold of the Throat of the World. Their breath freezes the very blood in your veins."
            },
            "Legendary Dragon": {
                hp: "4163", weak: "Dragonrend", loot: "Dragon Scales, Bone",
                desc: "The most powerful of their kind. Only a true Dragonborn can hope to survive a confrontation with these purple-scaled myths."
            },
            "Troll": {
                hp: "280", weak: "Fire", loot: "Troll Fat",
                desc: "Fearsome predators with three eyes. Their wounds heal almost instantly unless cauterized with flame."
            },
            "Bear": {
                hp: "200", weak: "None", loot: "Bear Pelt, Raw Meat",
                desc: "The masters of the forests. A single swipe from an angry Cave Bear can end an adventurer's journey."
            },
            "Sabre Cat": {
                hp: "150", weak: "None", loot: "Sabre Cat Tooth",
                desc: "Fast, silent, and lethal. They strike from the shadows before you even hear the rustle of the grass."
            },
            "Wolf": {
                hp: "20", weak: "None", loot: "Wolf Pelt",
                desc: "They hunt in packs. One wolf is a nuisance; a pack is a death sentence for the unprepared traveler."
            },
            "Spider": {
                hp: "150", weak: "Fire", loot: "Frostbite Venom",
                desc: "Frostbite Spiders haunt the dark corners of Skyrim, weaving webs to trap the unwary."
            },
            "Crab": {
                hp: "35", weak: "None", loot: "Mudcrab Chitin",
                desc: "Disguised as ordinary rocks, these armored scavengers are found near almost every body of water."
            },
            "Mammoth": {
                hp: "931", weak: "None", loot: "Mammoth Tusk",
                desc: "Gently giants of the plains, protected by the Giants. To kill one is to invite the wrath of their herders."
            },
            "Death Hound": {
                hp: "121", weak: "Fire", loot: "Death Bell",
                desc: "Vampiric beasts with skin as cold as the grave. They serve their masters in the dark halls of Castle Volkihar."
            },
            "Ice Wraith": {
                hp: "193", weak: "Fire", loot: "Ice Wraith Teeth",
                desc: "Living shards of ice found in the highest peaks. They are nearly invisible against the snow."
            },
            "Falmer": {
                hp: "180", weak: "None", loot: "Falmer Ear",
                desc: "The degenerate remains of the Snow Elves. Blind and bitter, they dwell in the deep places of the world."
            },
            "Dwarven Sphere": {
                hp: "200", weak: "Shock", loot: "Dwarven Oil",
                desc: "Ancient clockwork guardians that unfold from a simple ball into a deadly, blade-wielding warrior."
            },
            "Dwarven Spider": {
                hp: "100", weak: "Shock", loot: "Dwarven Oil",
                desc: "Scuttling automatons that maintain the ruins. They strike with electrical shocks to defend their territory."
            },
            "Dwarven Centurion": {
                hp: "1000", weak: "Shock", loot: "Dynamo Core",
                desc: "The pinnacle of Dwemer engineering. These massive brass giants crush intruders and blast them with boiling steam."
            },
            "Chaurus": {
                hp: "253", weak: "None", loot: "Chaurus Eggs",
                desc: "Large, venomous insects bred by the Falmer. Their chitin is thick, and their spit is pure acid."
            },
            "Chaurus Hunter": {
                hp: "345", weak: "None", loot: "Hunter Antennae",
                desc: "The final, winged stage of a Chaurus's life. They are faster, smarter, and far more dangerous."
            },
            "Spriggan": {
                hp: "240", weak: "Fire", loot: "Taproot",
                desc: "Nature's guardians. They can command the animals of the forest and heal themselves by drawing power from the earth."
            },
            "Hagraven": {
                hp: "471", weak: "None", loot: "Hagraven Claw",
                desc: "Witches who traded their humanity for dark power. Half-woman, half-bird, and entirely consumed by malice."
            },
            "Werewolf": {
                hp: "250", weak: "Silver", loot: "Wolf Pelt",
                desc: "Cursed with lycanthropy, these beasts possess inhuman strength and speed. Beware the full moon."
            },
            "Vampire Lord": {
                hp: "800", weak: "Fire, Sun", loot: "Vampire Dust",
                desc: "The purest form of the vampire curse. They command the night and can drain the life from a man in seconds."
            },
            "Giant": {
                hp: "591", weak: "None", loot: "Giant's Toe",
                desc: "Nomadic herders of the plains. They are peaceful unless provoked, but one club swing can send you to the stars."
            },
            "Fire Atronach": {
                hp: "163", weak: "Frost", loot: "Fire Salt",
                desc: "A daedra from the planes of Oblivion. They hover above the ground, wreathed in perpetual flame."
            },
            "Frost Atronach": {
                hp: "326", weak: "Fire", loot: "Frost Salt",
                desc: "Massive golems of living ice. Their presence slows their enemies, and their blows are like falling glaciers."
            },
            "Storm Atronach": {
                hp: "412", weak: "None", loot: "Void Salt",
                desc: "A chaotic swirl of rocks and lightning. They are the most powerful of the elemental atronachs."
            },
            "Lurker": {
                hp: "963", weak: "None", loot: "Lurker Skin",
                desc: "Monstrous servants of Hermaeus Mora. They emerge from the black waters of Apocrypha to crush the Prince's enemies."
            },
            "Seeker": {
                hp: "300", weak: "Shock", loot: "Book, Ink",
                desc: "Eerie, multi-limbed guardians of forbidden knowledge. They can split themselves into shadows to confuse their prey."
            },
            "Wispmother": {
                hp: "750", weak: "Fire", loot: "Wisp Wrappings",
                desc: "Mysterious spirits of the cold. Some say they are ancient liches, others say they are a manifestation of the frost itself."
            }
        };

        monsters.forEach(monster => {
            monster.onclick = function () {
                const name = this.querySelector('.category-info').innerText;
                const imgPath = this.querySelector('img').src;

                const stats = monsterStats[name] || {
                    hp: "???",
                    weak: "Unknown",
                    loot: "Random",
                    desc: "Information about this creature is lost in the scrolls of time."
                };

                document.getElementById('modalName').innerText = name;
                document.getElementById('modalImg').src = imgPath;
                document.getElementById('modalHP').innerText = stats.hp;
                document.getElementById('modalWeak').innerText = stats.weak;
                document.getElementById('modalLoot').innerText = stats.loot;

                const descElement = document.querySelector('.modal-desc');
                if (descElement) {
                    descElement.innerText = stats.desc;
                }

                modal.style.display = "flex";
            }
        });

        closeModal.onclick = () => { modal.style.display = "none"; };

        window.onclick = (e) => {
            if (e.target == modal) {
                modal.style.display = "none";
            }
        };
        const observerOptions = {
            threshold: 0.1, 
            rootMargin: "0px 0px -50px 0px" 
        };

        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                } else {
                    entry.target.style.opacity = "0";
                    entry.target.style.transform = "translateY(50px)";
                }
            });
        }, observerOptions);

        const elementsToAnimate = document.querySelectorAll('.category-item, .category-title, h1');

        elementsToAnimate.forEach(el => {
            el.style.opacity = "0";
            el.style.transform = "translateY(50px)";
            el.style.transition = "all 0.7s cubic-bezier(0.2, 0.8, 0.2, 1)"; 

            scrollObserver.observe(el);
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