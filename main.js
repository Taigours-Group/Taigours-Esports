document.addEventListener('DOMContentLoaded', () => {
  fetch('./json files/esports.json')
    .then(response => response.json())
    .then(data => {
      renderTournaments(data.tournaments);
      renderLeaderboards(data.leaderboard);
      setupTournamentTabs(data.tournaments);
      setupLeaderboardTabs(data.leaderboard);
    })
    .catch(err => console.error('Failed to load data:', err));
});

function renderTournaments(tournaments, selectedGame = 'ludo') {
  const container = document.getElementById('tournaments-container');
  if (!container) return;
  container.innerHTML = '';

  if (!tournaments[selectedGame]) return;
  tournaments[selectedGame].forEach((tournament, index) => {
    const card = createTournamentCard(tournament, index);
    container.appendChild(card);
  });
}

function setupTournamentTabs(tournaments) {
  const buttons = document.querySelectorAll('.tournament-tabs .tab-btn');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const selectedGame = button.dataset.tab;
      renderTournaments(tournaments, selectedGame);
    });
  });
}

function createTournamentCard(tournament, index) {
  const card = document.createElement('div');
  card.className = 'tournament-card';
  card.setAttribute('data-aos', 'fade-up');
  card.setAttribute('data-aos-delay', 100 + index * 100);

  card.innerHTML = `
    <div class="card-header">
      <img src="${tournament.image}" alt="${tournament.title}">
      <span class="game-tag ${tournament.type}">${tournament.game}</span>
    </div>
    <div class="card-content">
      <h3>${tournament.title}</h3>
      <div class="tournament-details">
        <p><i class="fas fa-map-marker-alt"></i> ${tournament.location}</p>
        <p><i class="fas fa-calendar"></i> ${tournament.date}</p>
        <p><i class="fas fa-clock"></i> ${tournament.time}</p>
        <p><i class="fas fa-coins"></i> Entry: ${tournament.entryFee} | Prize: ${tournament.prize}</p>
      </div>
      <div class="card-buttons">
        <button class="participate-btn" onclick="document.location.href='${tournament.registrationId}'">Participate</button>
        <button class="watch-btn" onclick="openStreamModal('${tournament.streamId}')">Watch Live</button>
      </div>
    </div>
  `;

  return card;
}

function renderLeaderboards(leaderboards, selectedGame = 'freefire') {
  const games = Object.keys(leaderboards);
  games.forEach(game => {
    const container = document.getElementById(`${game}-lb`);
    if (!container) return;

    if (game === selectedGame) {
      container.classList.add('active');
      container.style.display = 'block';
    } else {
      container.classList.remove('active');
      container.style.display = 'none';
    }

    if (game !== selectedGame) return;

    const table = document.createElement('table');
    table.innerHTML = `
      <thead>
        <tr>
          <th>Rank</th>
          <th>Team</th>
          <th><i class="fas fa-skull"></i> Kills</th>
          <th><i class="fas fa-trophy"></i> Wins</th>
          <th><i class="fas fa-star"></i> Points</th>
        </tr>
      </thead>
      <tbody>
        ${leaderboards[game].map((team, i) => `
          <tr class="rank-${i + 1}">
            <td><span class="rank-badge ${i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : ''}">${i + 1}</span></td>
            <td>
              <div class="player-info">
                <div class="player-avatar">
                  <img src="${team.avatar || 'https://via.placeholder.com/32'}" alt="${team.teamName}">
                </div>
                <span>${team.teamName}</span>
              </div>
            </td>
            <td>${team.kills}</td>
            <td>${team.wins}</td>
            <td>${team.points}</td>
          </tr>`).join('')}
      </tbody>
    `;

    container.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.className = 'leaderboard-table';
    wrapper.setAttribute('data-aos', 'fade-up');
    wrapper.setAttribute('data-aos-delay', '300');
    wrapper.appendChild(table);
    container.appendChild(wrapper);
  });
}

function setupLeaderboardTabs(leaderboards) {
  const buttons = document.querySelectorAll('.leaderboard-tabs .tab-btn');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const selectedGame = button.dataset.tab.replace('-lb', '');
      renderLeaderboards(leaderboards, selectedGame);
    });
  });
}


// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));


// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'tranparent';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'tranparent';
        navbar.style.boxShadow = 'none';
    }
});



// Tournament/Leaderboard Tabs Functionality
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
 
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            const parentSection = button.closest('section');
            
            // Remove active class from all tabs in the same section
            parentSection.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            parentSection.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            button.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Initialize tabs when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeTabs);


// Glitch effect for hero title
function addGlitchEffect() {
    const glitchElement = document.querySelector('.glitch');
    if (!glitchElement) return;

    setInterval(() => {
        glitchElement.style.textShadow = `
            ${Math.random() * 4 - 2}px ${Math.random() * 4 - 2}px 0 #00d4ff,
            ${Math.random() * 4 - 2}px ${Math.random() * 4 - 2}px 0 #ff0080,
            0 0 30px rgba(0, 212, 255, 0.8),
            0 0 50px rgba(255, 0, 128, 0.5)
        `;
        
        setTimeout(() => {
            glitchElement.style.textShadow = '0 0 30px rgba(0, 212, 255, 0.8)';
        }, 100);
    }, 3000);
}

// Initialize glitch effect
addGlitchEffect();

// Tournament card hover effects
document.querySelectorAll('.tournament-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.02)';
        card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 212, 255, 0.4), 0 0 50px rgba(255, 0, 128, 0.3)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = 'none';
    });
});

// Leaderboard row hover effects
document.querySelectorAll('.leaderboard-table tr').forEach(row => {
    row.addEventListener('mouseenter', () => {
        row.style.background = 'rgba(0, 212, 255, 0.15)';
        row.style.transform = 'translateX(8px)';
        row.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.4)';
    });
    
    row.addEventListener('mouseleave', () => {
        row.style.background = 'transparent';
        row.style.transform = 'translateX(0)';
    });
});


// Chat functionality
const chatInput = document.querySelector('.chat-input input');
const chatMessages = document.querySelector('.chat-messages');

if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && chatInput.value.trim()) {
            addChatMessage('You', chatInput.value.trim());
            chatInput.value = '';
        }
    });
}

function addChatMessage(username, message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'chat-message';
    messageElement.innerHTML = `
        <span class="username">${username}:</span>
        <span>${message}</span>
    `;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Simulate live chat activity
setInterval(() => {
    const messages = [
        { user: 'ShadowStrike', msg: 'Insane clutch! 😱' },
        { user: 'PixelPhantom', msg: 'That snipe tho 👀' },
        { user: 'LagHunter', msg: 'Ping’s killing me 😤' },
        { user: 'BlazeRider', msg: 'Nice team synergy 🔥' },
        { user: 'NoScopeKing', msg: 'One shot one kill 😎' },
        { user: 'GhostByte', msg: 'Stream’s smooth today!' },
        { user: 'TacticalTurtle', msg: 'Anyone else see that glitch?' },
        { user: 'HyperNova', msg: 'Bro’s cracked 🔥' },
        { user: 'EZWin420', msg: 'We eating tonight 🍗' },
        { user: 'NightCrawler', msg: 'Next match when?' },
        { user: 'RocketSpam', msg: 'Spam rockets FTW 💣' },
        { user: 'MetaMage', msg: 'Love the strat this round' },
        { user: 'SneakyFox', msg: 'Behind you!!!' },
        { user: 'IronFang', msg: 'Who needs heals?' },
        { user: 'QuickReload', msg: 'Reload faster bro 💀' },
        { user: 'ClutchGod', msg: 'That was all skill 💯' },
        { user: 'NanoWolf', msg: 'Let’s run it back!' },
        { user: 'BoomHeadshot', msg: 'HEADSHOT 💥' },
        { user: 'StealthZero', msg: 'Silent but deadly 😏' },
        { user: 'DigiKnight', msg: 'Great comms, team!' },
        { user: 'RageQuitter', msg: 'I’m DONE 😡' },
        { user: 'AimTrainer', msg: 'My aim’s finally decent 😂' },
        { user: 'BattleBot99', msg: 'Deploy the turret!' },
        { user: 'FragQueen', msg: 'Grenade out! 🧨' },
        { user: 'KillSwitch', msg: 'We dominating 🔥🔥' },
        { user: 'TTV_NoobHunter', msg: 'Follow my Twitch 💜' },
        { user: 'FPSFreak', msg: 'Frames hitting 240+ 😍' },
        { user: 'Z3r0Chill', msg: 'Sweaty lobby today fr' },
        { user: 'CrashDummy', msg: 'Oops wrong button 😅' },
        { user: 'DropZone', msg: 'Land hot or no balls' },
        { user: 'SilentStorm', msg: 'I flanked all 3 😤' },
        { user: 'ToxicTeammate', msg: 'Git gud lol 💀' },
        { user: 'VortexWitch', msg: 'Portal plays OP' },
        { user: 'LootLord', msg: 'All purple gear 🔮' },
        { user: 'BotSlayer', msg: 'Was that a real player?' },
        { user: 'SweatBandit', msg: 'I don’t miss 🧢' },
        { user: 'GrieferX', msg: 'Teamkill incoming 😈' },
        { user: 'ClapTrap42', msg: 'Lemme emote on him 💃' },
        { user: 'GGManiac', msg: 'Always GG 💯' },
        { user: 'UltraPing', msg: '120ms and still winning' },
        { user: 'SnipeSZN', msg: 'Scoped in 😤' },
        { user: 'SpeedRunner', msg: 'WR pace?? 🏃‍♂️💨' },
        { user: 'MapHacker', msg: 'I KNOW the spawns' },
        { user: 'TryHardTim', msg: 'Full sweat mode 🥵' },
        { user: 'AFKWizard', msg: 'Sorry was AFK 😬' },
        { user: 'EliteWaffle', msg: 'Waffle power!!! 🧇' },
        { user: 'BunnyHopz', msg: 'I’m just vibin 🐰' },
        { user: 'ReloadRaptor', msg: 'Empty mag, again?!' },
        { user: 'PewPewXD', msg: 'pew pew pew 😂' },
        { user: 'EchoSniper', msg: 'Sounded like stairs 👂' },
        { user: 'ManaDrain', msg: 'Out of mana 😭' },
        { user: 'ComboKing', msg: 'That was a 5-hit combo!' },
        { user: 'TrashTalker', msg: 'EZ claps kid 😎' },
        { user: 'LagSwitch', msg: 'I swear that was lag!' },
        { user: 'SoloCarry', msg: 'Y’all heavy 😅' },
        { user: 'RogueAgent', msg: 'Going stealth 🕶️' },
        { user: 'HeadshotHero', msg: 'Headshot after headshot! 💥' },
        { user: 'PixelWarrior', msg: 'Epic comeback 💪' },
        { user: 'ChronicCamper', msg: 'Camping spot secured 🔒' },
        { user: 'QuickScopeMaster', msg: 'Quickscope accuracy at 100%' },
        { user: 'LagLord', msg: 'Lag is real right now 😩' },
        { user: 'TrickshotKing', msg: 'Did I just hit that?! 👀' },
        { user: 'SniperQueen', msg: 'Watch this no-scope 👑' },
        { user: 'RushAndWin', msg: 'All in, let’s rush them!' },
        { user: 'StealthyPanda', msg: 'Silent but deadly 🐼' },
        { user: 'ViralGamer', msg: 'Twitch clip coming soon 🔥' },
        { user: 'BoostedBeast', msg: 'Boost me, bro! 🚀' },
        { user: 'JetPackJack', msg: 'Jetpack landing incoming 💨' },
        { user: 'CamoReaper', msg: 'Camo’s OP, I swear 😈' },
        { user: 'HoloGamer', msg: 'Holo sight OP 👓' },
        { user: 'TacticalShark', msg: 'Strategy over raw power 🦈' },
        { user: 'HyperBerserker', msg: 'Rage mode activated! 😤' },
        { user: 'BlueFlare', msg: 'It’s a blue flare game today 🔵' },
        { user: 'MVPinTheHouse', msg: 'MVP right here 👑' },
        { user: 'IronKnight', msg: 'That armor saved me 🔩' },
        { user: 'RewindRacer', msg: 'Time to rewind this match ⏪' },
        { user: 'MetaMaster', msg: 'The meta’s broken rn 💀' },
        { user: 'CheeseSniper', msg: 'The cheese strat is real 🧀' },
        { user: 'SpeedyGonzalez', msg: 'No one’s catching me! 🏃‍♂️💨' },
        { user: 'BombPlaya', msg: 'Planting the bomb 💣' },
        { user: 'BlazeBrawler', msg: 'Let’s fight in the flames 🔥' },
        { user: 'LagFree', msg: 'No lag, full power! 💪' },
        { user: 'CampKing', msg: 'Camp your way to victory 👑' },
        { user: 'FastBuilds', msg: 'Building faster than you can shoot 🏗️' },
        { user: 'PixelJunkie', msg: 'Those pixels are on point! 🖥️' },
        { user: 'ToxicWolf', msg: 'Fighting fire with fire 🔥🐺' },
        { user: 'CommanderAce', msg: 'Ace the match, always 💥' },
        { user: 'RocketRage', msg: 'Lock on, launch rockets! 🚀' },
        { user: 'OutlawGamer', msg: 'I’m the outlaw in this game 🔫' },
        { user: 'MeleeManiac', msg: 'Melee for the win! 🗡️' },
        { user: 'MadMadman', msg: 'Madness is the way 😜' },
        { user: 'DoubleHeadshot', msg: 'Double kill, baby! 💣' },
        { user: 'ChillVibes', msg: 'Chill vibes and good plays ✌️' },
        { user: 'JukerKing', msg: 'Can’t catch me! 💃' },
        { user: 'OneShotWonder', msg: 'I only need one shot 🔫' },
        { user: 'FullAutoBeast', msg: 'Spray and pray, baby! 🎯' },
        { user: 'OverdriveKing', msg: 'Max power, max kills 💥' },
        { user: 'SkullCrusher', msg: 'Crushing skulls one hit at a time 💀' },
        { user: 'SilentStriker', msg: 'Strike fast, strike silent ⚡' },
        { user: 'QuickDrawMcGraw', msg: 'Quick draw win every time! 🔫' },
        { user: 'FuryTornado', msg: 'Feel the fury of the storm 🌪️' },
        { user: 'ShotgunHero', msg: 'Boom, headshot with a shotgun 💥' },
        { user: 'WraithLord', msg: 'Out of sight, out of mind 👻' },
        { user: 'GameChanger', msg: 'I just changed the game 👑' },
        { user: 'HeadshotMachine', msg: 'Headshot after headshot! 🔥' },
        { user: 'TeamMVP', msg: 'Couldn’t do it without you all 🙌' },
        { user: 'VictoryCrown', msg: 'I’ll take that victory crown 👑' },
        { user: 'RisingPhoenix', msg: 'Rising from the ashes 🔥' },
        { user: 'DeathDealer', msg: 'Ready to deal some death 💀' },
        { user: 'GameOverGrinder', msg: 'Game over, grind harder 🔥' },
        { user: 'SkillzPayBills', msg: 'My skills are paying the bills 🤑' },
        { user: 'FlawlessVictory', msg: 'Flawless victory on this one! 😤' },
        { user: 'SneakAttackPro', msg: 'You didn’t see that coming 🤫' }
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    addChatMessage(randomMessage.user, randomMessage.msg);
}, 1000);

// Scroll reveal animations
function revealOnScroll() {
    const reveals = document.querySelectorAll('[data-aos]');
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('fade-in-up');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Preloader
function showPreloader() {
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
        <div class="preload-container">
                <img src="images/tiger-logo.png">
                <h3>Taigour's E-Sports</h3>
                <div class="loading-bar">
                    <div class="loading-progress"></div>
                </div>
        </div>
    </div>
    `;
    
    // Remove preloader after page load
    document.body.appendChild(preloader);
    
    // Remove preloader after page load
    window.addEventListener('load', () => {
    setTimeout(() => {
        preloader.style.opacity = '0'; // Smooth fade
        setTimeout(() => {
            preloader.remove(); // Remove after fade
        }, 4000); // Match this with the CSS transition duration
    },100); // Optional delay before fading out
});
}

// Initialize preloader
showPreloader();

// Performance optimization - Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();

// Console welcome message
console.log(`
🎮 Welcome to Taigour's E-Sports!
🔥 Forge Your Legacy, Rule the Game
💻 Built with passion for gaming
`);


// Tab System for Tournaments and Leaderboards
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const target = button.dataset.tab;
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const targetContent = document.getElementById(target);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Initialize tabs
initializeTabs();

