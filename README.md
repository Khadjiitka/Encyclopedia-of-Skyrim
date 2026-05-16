# Encyclopedia-of-Skyrim
This repository contains my personal educational project — an interactive web encyclopedia inspired by The Elder Scrolls V: Skyrim.<br>
The project is developed as part of my Web Design course in University, where I study modern approaches to UI/UX, layout structuring, responsive design, and visual styling. <br>

The main goal of this project is to create a visually rich, atmospheric website dedicated to the world of Skyrim, including its guilds, magic, races, factions, creatures, weapons, and history. <br>

---

## ✨ Key Features

###  Interactive Skyrim Encyclopedia

The website is designed as a large multi-page encyclopedia containing structured information about the Skyrim universe, including:

- History & Lore
- Interactive World Map
- Races & Abilities
- Skills & Perks
- Guilds & Factions
- Bestiary
- Character Creation System

Every section was carefully styled to recreate the atmosphere of the original game through dark fantasy visuals, cinematic transitions, and immersive typography.


###  Atmospheric UI/UX Design

The visual identity of the project was heavily inspired by medieval fantasy aesthetics and the original Skyrim interface.

Design features include:

- dark textured backgrounds
- fog overlays and cinematic shadows
- custom fantasy typography
- hover animations and transitions
- animated navigation system
- responsive card layouts
- parallax scrolling sections
- interactive modal windows

Below are some previews of the planned redesigns.
These Figma screens demonstrate the structure, future improvements, and general visual direction of the project

![image](https://github.com/Khadjiitka/Encyclopedia-of-Skyrim/blob/fd8374f95155d47f300287239a69ccaca52467e6/figmaPages.png)

---

#  Website Structure

##  Main Page

The landing page acts as the visual entry point into the project.  
It introduces users to the atmosphere of the Skyrim universe through animated elements, interactive navigation, and ambient visual effects.

### Features:
- animated burger menu
- background effects
- smooth page transitions
- ambient music integration
- custom snow particle cursor effect

## 📜 History of Skyrim

A lore-focused section dedicated to the history of the game world.

This page includes:
- dynamically loaded historical content
- parallax scrolling effects
- layered backgrounds
- smooth animated transitions between sections

Historical data is loaded dynamically from external JSON files using JavaScript `fetch()` requests, allowing content to remain separated from the HTML structure.


## 🗺️ Interactive Map

The project includes a stylized interactive map of Skyrim that allows users to explore important locations from the game world.

### Features:
- animated hover states
- responsive layout
- visual navigation system


## 🧝 Races, Skills & Guilds

The encyclopedia contains detailed information about:
- playable races
- character skills
- perk systems
- guilds and factions

The layout uses modern card-based UI structures combined with hover animations and modal pop-up windows for detailed information display.

## 👾 Bestiary System

The Bestiary section allows users to browse creatures and enemies from the Skyrim universe.

### Implemented functionality:
- real-time search filtering
- dynamic rendering
- interactive pop-up windows
- category-based organization

JavaScript listens to user input events and instantly filters cards without page reloads, creating a smooth user experience.
Users can:
- register/login
- choose race and faction
- select origin and standing stones
- write custom biographies
- save characters to the cloud
- manage created profiles

---

#  Firebase Integration

The project uses **Google Firebase** as a serverless backend solution.

### Implemented Firebase services:
- Firebase Authentication
- Cloud Firestore Database

## Authentication
Users can securely create accounts and log into the system using email/password authentication.

## Real-Time Database
Character data is stored inside Firestore collections and synchronized in real time.

Security Rules were configured to ensure that users can only modify their own characters while still being able to view public information about other heroes.

---


# 🎵  Audio System

The website includes an integrated background music player featuring atmospheric Skyrim music.

The audio system was designed so music continues playing while navigating between pages, creating a seamless immersive experience.

---

# ❄️ Dynamic Snow Cursor Effect

One of the decorative interactive elements is a custom cursor snow-trail effect.

Using JavaScript and dynamically generated DOM elements, snow particles follow the user's mouse movement in real time, creating a magical winter atmosphere inspired by Skyrim landscapes.

```javascript
document.addEventListener('mousemove', function(e) {
    const snowContainer = document.getElementById('snow-trail');
    const particle = document.createElement('span');

    particle.style.left = e.pageX + 'px';
    particle.style.top = e.pageY + 'px';

    const size = Math.random() * 5 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';

    snowContainer.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 1000);
});
```

---

# 📱 Responsive Design

The entire project was designed with adaptive layouts and responsive principles in mind.

---

This project became much more than a simple university assignment.  
It allowed me to combine my passion for fantasy worlds, visual design, and web development into a single interactive experience inspired by one of the most iconic RPG universes ever created.

The Elder Scroll Explorer represents both a technical and creative exploration of how modern web technologies can transform static information into immersive digital storytelling.
