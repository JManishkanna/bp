const movies = [
    {
        id: 1,
        title: "Dune: Part Two",
        genre: "Sci-Fi",
        price: 350,
        rating: 4.8,
        duration: "2h 46m",
        director: "Denis Villeneuve",
        cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"],
        description: "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.",
        image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1470&auto=format&fit=crop",
        hero: true
    },
    {
        id: 2,
        title: "Interstellar",
        genre: "Sci-Fi",
        price: 250,
        rating: 4.9,
        duration: "2h 49m",
        director: "Christopher Nolan",
        cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival as Earth faces a global famine.",
        image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1472&auto=format&fit=crop",
        hero: true
    },
    {
        id: 3,
        title: "Oppenheimer",
        genre: "Drama",
        price: 300,
        rating: 4.7,
        duration: "3h 00m",
        director: "Christopher Nolan",
        cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon"],
        description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.",
        image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1470&auto=format&fit=crop",
        hero: true
    },
    {
        id: 4,
        title: "The Dark Knight",
        genre: "Action",
        price: 200,
        rating: 4.9,
        duration: "2h 32m",
        director: "Christopher Nolan",
        cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
        description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability.",
        image: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=1470&auto=format&fit=crop",
        hero: false
    },
    {
        id: 5,
        title: "Inception",
        genre: "Sci-Fi",
        price: 250,
        rating: 4.8,
        duration: "2h 28m",
        director: "Christopher Nolan",
        cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
        description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        image: "https://images.unsplash.com/photo-1542204112-4043f6511099?q=80&w=1470&auto=format&fit=crop",
        hero: false
    },
    {
        id: 6,
        title: "John Wick",
        genre: "Action",
        price: 180,
        rating: 4.6,
        duration: "1h 41m",
        director: "Chad Stahelski",
        cast: ["Keanu Reeves", "Michael Nyqvist", "Alfie Allen"],
        description: "An ex-hit-man comes out of retirement to track down the gangsters that took everything from him, including his chance at a fresh start.",
        image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1470&auto=format&fit=crop",
        hero: false
    }
];

const theaters = [
    {
        id: 1,
        name: "PVR: Citi Mall, Andheri (W)",
        location: "Mumbai",
        features: ["4K Dolby Atmos", "Recliners"],
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1517604401871-10c929021bd0?q=80&w=1470&auto=format&fit=crop",
        showtimes: ["08:30 AM", "11:40 AM", "03:10 PM", "08:05 PM"]
    },
    {
        id: 2,
        name: "PVR: Market City, Kurla",
        location: "Mumbai",
        features: ["IMAX Laser", "Dolby Atmos"],
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1470&auto=format&fit=crop",
        showtimes: ["11:30 AM", "05:10 PM", "09:45 PM"]
    },
    {
        id: 3,
        name: "Movietime: The Hub, Goregaon",
        location: "Mumbai",
        features: ["Standard 2K", "Cafeteria"],
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?q=80&w=1632&auto=format&fit=crop",
        showtimes: ["01:00 PM", "07:00 PM"]
    }
];

const ottPacks = [
    {
        id: 1,
        name: "Basic Stream",
        price: 199,
        featured: false,
        features: ["720p Resolution", "1 Screen", "Standard Audio", "No Ad-free"]
    },
    {
        id: 2,
        name: "Premium Cine",
        price: 499,
        featured: true,
        features: ["4K HDR Quality", "4 Screens", "Dolby Atmos", "Ad-free Experience"]
    },
    {
        id: 3,
        name: "Ultimate OTT",
        price: 999,
        featured: false,
        features: ["UHD+ Vision", "Unlimited Screens", "Spatial Audio", "Early Access"]
    }
];

// Configuration
let currentSlide = 0;
let selectedSeats = [];
let addonTotal = 0;
let selectedAddons = [];
let currentMovie = null;
let currentBookingInfo = { theater: '', time: '' };
let selectedParking = null;

// DOM Elements
const slider = document.getElementById('main-slider');
const movieGrid = document.getElementById('movie-grid');
const theaterGrid = document.getElementById('theater-grid');
const ottContainer = document.getElementById('ott-container');
const cursor = document.querySelector('.cursor-follower');

function getEl(id) { return document.getElementById(id); }

function closeModal(modalId) {
    const m = getEl(modalId);
    if (m) m.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initCommon();

    // Page-specific initializers
    if (slider) initSlider();
    if (movieGrid) renderMovies();
    if (theaterGrid) renderTheaters();
    if (ottContainer) renderOttPacks();

    // QR Code Generation for Bookings Page
    if (document.querySelector('.qr-container')) {
        generateTicketQRs();
    }

    initScrollReveal();
    if (seatGrid) initSeatMap();
    initFilters();
});

function initCommon() {
    // Navbar scroll effect
    window.onscroll = () => {
        const nav = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(10, 10, 11, 0.95)';
        } else {
            nav.style.background = 'rgba(10, 10, 11, 0.3)';
        }
    };

    // Lucide icons
    if (window.lucide) {
        lucide.createIcons();
    }
}

// ── Genre chips: auto-generated from movie data ───────────────────────────
let activeGenreFilter = null;   // null = All
let activeSearchQuery = '';     // current search string

function initFilters() {
    const filterContainer = document.getElementById('genre-filters');
    if (!filterContainer) return;

    // Gather unique genres and count per genre
    const genreMap = {};
    movies.forEach(m => {
        genreMap[m.genre] = (genreMap[m.genre] || 0) + 1;
    });

    // Build chips: All first, then each genre
    const allChip = buildChip('All', movies.length, true);
    filterContainer.appendChild(allChip);

    Object.entries(genreMap).sort().forEach(([genre, count]) => {
        filterContainer.appendChild(buildChip(genre, count, false));
    });
}

function buildChip(label, count, isActive) {
    const chip = document.createElement('span');
    chip.className = `filter-chip${isActive ? ' active' : ''}`;
    chip.dataset.genre = label;
    chip.innerHTML = `${label} <span class="chip-count">${count}</span>`;
    chip.onclick = () => {
        document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        activeGenreFilter = label === 'All' ? null : label;
        applyMovieFilters();
    };
    return chip;
}

function handleMovieSearch(val) {
    activeSearchQuery = val.trim().toLowerCase();
    const clearBtn = document.getElementById('search-clear');
    if (clearBtn) clearBtn.style.display = activeSearchQuery ? 'flex' : 'none';
    applyMovieFilters();
}

function clearSearch() {
    const input = document.getElementById('movie-search');
    if (input) input.value = '';
    const clearBtn = document.getElementById('search-clear');
    if (clearBtn) clearBtn.style.display = 'none';
    activeSearchQuery = '';
    applyMovieFilters();
}

function applyMovieFilters() {
    let filtered = movies;

    // Genre filter
    if (activeGenreFilter) {
        filtered = filtered.filter(m => m.genre === activeGenreFilter);
    }

    // Search filter
    if (activeSearchQuery) {
        filtered = filtered.filter(m =>
            m.title.toLowerCase().includes(activeSearchQuery) ||
            m.genre.toLowerCase().includes(activeSearchQuery)
        );
    }

    // Update heading
    const heading = document.getElementById('movies-heading');
    if (heading) heading.textContent = activeGenreFilter ? `${activeGenreFilter} Movies` : 'All Movies';

    renderMovies(filtered);
}

// Cursor Follower
function initCursor() {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, button, .movie-card, .seat').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('expand'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('expand'));
    });
}

// 3D Slider Logic
function initSlider() {
    const heroMovies = movies.filter(m => m.hero);
    heroMovies.forEach((movie, index) => {
        const slide = document.createElement('div');
        slide.className = `slide ${index === 0 ? 'active' : ''}`;
        slide.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}" class="slide-image">
            <div class="slide-content">
                <h2>${movie.title}</h2>
                <button class="btn-primary" onclick="openBooking(${movie.id})">Book Now</button>
            </div>
        `;
        slider.appendChild(slide);
    });

    document.getElementById('next-btn').addEventListener('click', () => changeSlide(1));
    document.getElementById('prev-btn').addEventListener('click', () => changeSlide(-1));
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    slides[currentSlide].classList.remove('active');

    currentSlide = (currentSlide + direction + slides.length) % slides.length;

    slides[currentSlide].classList.add('active');
}

// ── Render Movie Grid ────────────────────────────────────────────────────────
function renderMovies(filteredMovies = movies) {
    if (!movieGrid) return;

    // Update result count label
    const countEl = document.getElementById('movie-result-count');
    if (countEl) {
        countEl.textContent = filteredMovies.length === movies.length
            ? ''
            : `${filteredMovies.length} result${filteredMovies.length !== 1 ? 's' : ''} found`;
    }

    // Fade out existing cards
    movieGrid.style.opacity = '0';
    movieGrid.style.transform = 'translateY(10px)';
    movieGrid.style.transition = 'opacity 0.2s ease, transform 0.2s ease';

    setTimeout(() => {
        movieGrid.innerHTML = '';

        if (filteredMovies.length === 0) {
            movieGrid.innerHTML = `
                <div style="grid-column:1/-1;text-align:center;padding:4rem 2rem;color:var(--text-dim)">
                    <div style="font-size:3rem;margin-bottom:1rem">🎬</div>
                    <h3 style="color:var(--text-main);margin-bottom:0.5rem">No movies found</h3>
                    <p>Try a different genre or search term.</p>
                </div>`;
        } else {
            filteredMovies.forEach(movie => {
                const card = document.createElement('div');
                card.className = 'movie-card reveal';
                card.innerHTML = `
                    <div class="card-img-container">
                        <img src="${movie.image}" alt="${movie.title}" loading="lazy">
                        <div class="card-overlay">
                            <div class="card-info">
                                <div class="card-genre-badge">${movie.genre}</div>
                                <h3>${movie.title}</h3>
                                <p>⭐ ${movie.rating} &nbsp;•&nbsp; ${movie.duration} &nbsp;•&nbsp; ₹${movie.price}</p>
                                <button class="btn-book-card">Book Now</button>
                            </div>
                        </div>
                    </div>
                `;
                card.onclick = () => openBooking(movie.id);
                movieGrid.appendChild(card);
                if (typeof observer !== 'undefined') observer.observe(card);
            });
        }

        // Fade in
        movieGrid.style.opacity = '1';
        movieGrid.style.transform = 'translateY(0)';
        if (window.lucide) lucide.createIcons();
    }, 200);
}

// Render Theaters
function renderTheaters() {
    if (!theaterGrid) return;
    theaterGrid.innerHTML = '';
    theaters.forEach(theater => {
        const card = document.createElement('div');
        card.className = 'theater-card reveal';
        card.innerHTML = `
            <div class="theater-img-wrap">
                <img src="${theater.image}" alt="${theater.name}" class="theater-img" loading="lazy">
                <div class="theater-img-overlay"></div>
                <div class="theater-rating-badge">
                    <i data-lucide="star"></i> ${theater.rating}
                </div>
            </div>
            <div class="theater-info">
                <h3>${theater.name}</h3>
                <p class="theater-location"><i data-lucide="map-pin"></i> ${theater.location}</p>
                <div class="theater-tags">
                    ${theater.features.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="theater-showtimes-preview">
                    <i data-lucide="clock"></i>
                    <span>${theater.showtimes.slice(0, 3).join(' · ')}${theater.showtimes.length > 3 ? ' …' : ''}</span>
                </div>
                <button class="btn-primary theater-book-btn" onclick="event.stopPropagation(); openTheaterBooking(${theater.id})">
                    <i data-lucide="ticket"></i> Book Tickets
                </button>
            </div>
        `;
        theaterGrid.appendChild(card);
        if (typeof observer !== 'undefined') observer.observe(card);
    });
    if (window.lucide) lucide.createIcons();
}

// Open theater-first booking: pick movie → then showtime → then seats
function openTheaterBooking(theaterId) {
    const theater = theaters.find(t => t.id === theaterId);
    if (!theater) return;

    // Populate the theater picker modal
    const modal = document.getElementById('theater-picker-modal');
    const titleEl = document.getElementById('tpicker-theater-name');
    const moviesEl = document.getElementById('tpicker-movies');
    const timesEl = document.getElementById('tpicker-times');
    const confirmBtn = document.getElementById('tpicker-confirm');

    if (!modal) return;

    if (titleEl) titleEl.textContent = theater.name;

    // Step A: pick a movie
    let pickedMovieId = null;
    let pickedTime = null;

    if (moviesEl) {
        moviesEl.innerHTML = movies.map(m => `
            <div class="tpicker-movie-item" data-id="${m.id}" onclick="tpickerSelectMovie(${m.id}, ${theaterId})">
                <img src="${m.image}" alt="${m.title}">
                <div class="tpicker-movie-info">
                    <span class="tpicker-genre">${m.genre}</span>
                    <strong>${m.title}</strong>
                    <span class="tpicker-price">₹${m.price} / seat</span>
                </div>
                <div class="tpicker-check"><i data-lucide="check-circle-2"></i></div>
            </div>
        `).join('');
    }

    // Step B: showtimes for this theater
    if (timesEl) {
        timesEl.innerHTML = theater.showtimes.map(t => `
            <div class="tpicker-time-slot" data-time="${t}" onclick="tpickerSelectTime('${t}')">
                ${t}
            </div>
        `).join('');
    }

    if (window.lucide) lucide.createIcons();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Called when user picks a movie inside the theater picker
function tpickerSelectMovie(movieId, theaterId) {
    document.querySelectorAll('.tpicker-movie-item').forEach(el => el.classList.remove('selected'));
    const el = document.querySelector(`.tpicker-movie-item[data-id="${movieId}"]`);
    if (el) el.classList.add('selected');
    window._tpickerMovieId = movieId;
    checkTpickerReady(theaterId);
}

function tpickerSelectTime(time) {
    document.querySelectorAll('.tpicker-time-slot').forEach(el => el.classList.remove('selected'));
    const el = document.querySelector(`.tpicker-time-slot[data-time="${time}"]`);
    if (el) el.classList.add('selected');
    window._tpickerTime = time;
    const theaterId = window._tpickerTheaterId;
    checkTpickerReady(theaterId);
}

function checkTpickerReady(theaterId) {
    window._tpickerTheaterId = theaterId;
    const confirmBtn = document.getElementById('tpicker-confirm');
    if (confirmBtn) {
        confirmBtn.disabled = !(window._tpickerMovieId && window._tpickerTime);
    }
}

function confirmTheaterBooking() {
    const theaterId = window._tpickerTheaterId;
    const movieId = window._tpickerMovieId;
    const time = window._tpickerTime;

    if (!theaterId || !movieId || !time) {
        alert('Please select a movie and a showtime.');
        return;
    }

    const theater = theaters.find(t => t.id === theaterId);
    // Close picker, open main booking modal
    document.getElementById('theater-picker-modal')?.classList.remove('active');

    // Pre-fill booking info with theater + time
    currentBookingInfo.theater = theater.name;
    currentBookingInfo.time = time;

    // Open booking and jump straight to seat selection
    openBooking(movieId);
    // Skip details & showtime steps — jump to select showtime then seats
    setTimeout(() => {
        selectShowtime(theater.name, time);
    }, 100);

    // Cleanup
    window._tpickerMovieId = null;
    window._tpickerTime = null;
    window._tpickerTheaterId = null;
}

// Render OTT Packs
function renderOttPacks() {
    ottPacks.forEach(pack => {
        const card = document.createElement('div');
        card.className = `ott-card ${pack.featured ? 'featured' : ''}`;
        card.innerHTML = `
            <h3>${pack.name}</h3>
            <div class="ott-price">₹${pack.price}<span>/mo</span></div>
            <ul class="ott-features">
                ${pack.features.map(f => `<li><i data-lucide="check-circle"></i> ${f}</li>`).join('')}
            </ul>
            <button class="btn-primary full-width" onclick="subscribe('${pack.name}')">Subscribe Now</button>
        `;
        ottContainer.appendChild(card);
    });
    if (window.lucide) lucide.createIcons();
}

function subscribe(name) {
    alert(`Subscribed to ${name}! Enjoy your premium content.`);
}

function selectPayment(element) {
    document.querySelectorAll('.payment-option').forEach(opt => opt.classList.remove('active'));
    element.classList.add('active');

    // Switch forms
    const method = element.querySelector('span').innerText.toLowerCase();
    document.querySelectorAll('.payment-form').forEach(form => form.classList.remove('active'));

    if (method.includes('upi')) document.getElementById('upi-form').classList.add('active');
    else if (method.includes('card')) document.getElementById('card-form').classList.add('active');
    else if (method.includes('banking')) document.getElementById('banking-form').classList.add('active');
}

// Scroll Reveal Effect
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                // For other pages, we can use a simpler class
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.movie-card, .theater-card, .ott-card, .section-header, .page-header').forEach(el => {
        // Initial state for non-home pages
        if (!el.classList.contains('movie-card')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'var(--transition)';
        }
        observer.observe(el);
    });
}

// Booking Logic
function openBooking(movieId) {
    currentMovie = movies.find(m => m.id === movieId);
    if (!currentMovie) return;

    // Populate Details Preview
    const pTitle = getEl('preview-movie-title');
    const pRating = getEl('preview-movie-rating');
    const pGenre = getEl('preview-movie-genre');
    const pDuration = getEl('preview-movie-duration');
    const pDesc = getEl('preview-movie-desc');
    const pDirector = getEl('preview-movie-director');
    const pCast = getEl('preview-movie-cast');
    const pBg = getEl('preview-movie-bg');

    if (pBg) {
        pBg.crossOrigin = "anonymous";
        pBg.src = currentMovie.image;
    }
    if (pTitle) pTitle.innerText = currentMovie.title;
    if (pRating) pRating.innerHTML = `<i data-lucide="star"></i> ${currentMovie.rating}`;
    if (pGenre) pGenre.innerText = currentMovie.genre;
    if (pDuration) pDuration.innerHTML = `<i data-lucide="clock"></i> ${currentMovie.duration}`;
    if (pDesc) pDesc.innerText = currentMovie.description;
    if (pDirector) pDirector.innerText = currentMovie.director;

    if (pCast) {
        pCast.innerHTML = '';
        currentMovie.cast.forEach(member => {
            const item = document.createElement('div');
            item.className = 'cast-item';
            item.innerHTML = `<span>${member}</span>`;
            pCast.appendChild(item);
        });
    }

    // Modal Header Info (Sidebar)
    const mTitle = getEl('modal-movie-title');
    const mDesc = getEl('modal-movie-desc');
    if (mTitle) mTitle.innerText = currentMovie.title;
    if (mDesc) mDesc.innerText = currentMovie.genre + ' • ' + currentMovie.duration;

    // Reset Booking state
    selectedSeats = [];
    addonTotal = 0;
    selectedAddons = [];
    selectedParking = null;
    document.querySelectorAll('.addon-card, .parking-card').forEach(card => card.classList.remove('active'));

    updateSummary();
    switchStep('step-details');
    renderDateSelector();
    renderTheaterSlots();

    // Reset payment modal UI and width in case of previous booking
    const pm = getEl('payment-modal');
    if (pm) {
        const modalContent = pm.querySelector('.modal-content');
        if (modalContent) modalContent.style.maxWidth = '500px';

        pm.querySelectorAll('.checkout-header, .payment-details-container, .checkout-footer, .close-modal').forEach(el => {
            el.style.display = '';
        });
        const successView = getEl('payment-success');
        if (successView) successView.classList.remove('active');
    }

    const m = getEl('booking-modal');
    if (m) {
        m.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        console.error('Booking modal not found!');
    }
}

function switchStep(stepId) {
    document.querySelectorAll('.booking-view').forEach(view => {
        view.classList.remove('active');
    });
    const nextView = getEl(stepId);
    if (nextView) nextView.classList.add('active');

    if (window.lucide) lucide.createIcons();
}

function renderDateSelector() {
    const datePicker = document.getElementById('date-picker');
    if (!datePicker) return;

    datePicker.innerHTML = '';
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

    const today = new Date();
    for (let i = 0; i < 7; i++) {
        const d = new Date();
        d.setDate(today.getDate() + i);

        const dateItem = document.createElement('div');
        dateItem.className = `date-item ${i === 0 ? 'active' : ''}`;
        dateItem.innerHTML = `
            <span class="day">${days[d.getDay()]}</span>
            <span class="date">${d.getDate()}</span>
            <span class="day">${months[d.getMonth()]}</span>
        `;
        dateItem.onclick = () => {
            document.querySelectorAll('.date-item').forEach(item => item.classList.remove('active'));
            dateItem.classList.add('active');
            currentBookingInfo.date = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
        };
        if (i === 0) currentBookingInfo.date = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
        datePicker.appendChild(dateItem);
    }
}

function renderTheaterSlots() {
    const list = document.getElementById('theater-list');
    if (!list) return;

    list.innerHTML = '';
    theaters.forEach(theater => {
        const row = document.createElement('div');
        row.className = 'theater-row';
        row.innerHTML = `
            <div class="theater-header-small">
                <div class="theater-name-small">
                    <i data-lucide="heart"></i>
                    ${theater.name}
                </div>
                <div style="font-size: 0.8rem; color: var(--text-dim); cursor: pointer;">
                    <i data-lucide="info" style="width: 14px;"></i> INFO
                </div>
            </div>
            <p class="cancellation-tag">Cancellation Available</p>
            <div class="showtimes-grid">
                ${theater.showtimes.map((time, idx) => `
                    <div class="time-slot ${idx % 2 === 0 ? '' : 'orange'}" onclick="selectShowtime('${theater.name}', '${time}')">
                        ${time}
                        <span>ENG</span>
                    </div>
                `).join('')}
            </div>
        `;
        list.appendChild(row);
    });
    if (window.lucide) lucide.createIcons();
}

function selectShowtime(theaterName, time) {
    currentBookingInfo.theater = theaterName;
    currentBookingInfo.time = time;
    document.getElementById('selected-theater-time').innerText = `${theaterName} • ${time}`;

    switchStep('step-seats');
    updateSummary();
    initSeatMap();
}

function initSeatMap() {
    const container = document.getElementById('seat-sections-container');
    if (!container) return;
    container.innerHTML = '';
    selectedSeats = []; // Reset selected seats when map is re-initialized

    // Helper: make a row div with two equal halves
    function makeRow(leftEl, rightEl) {
        const row = document.createElement('div');
        row.className = 'seat-row-block';
        row.appendChild(leftEl);
        row.appendChild(rightEl);
        return row;
    }

    // Helper: make a seat-grid-sub with N cols
    function makeGrid(cols = 8) {
        const g = document.createElement('div');
        g.className = 'seat-grid-sub';
        g.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        return g;
    }

    // ── Standard rows A–J (4 rows × 2 halves each, 8 seats per half) ──────────
    const standardRows = [
        ['A', 'B'],
        ['C', 'D'],
        ['E', 'F'],
        ['G', 'H'],
        ['I', 'J']
    ];

    standardRows.forEach(([leftRow, rightRow]) => {
        const section = document.createElement('div');
        section.className = 'seat-sections-block';

        const leftBlock = document.createElement('div');
        leftBlock.style.cssText = 'display:flex;flex-direction:column;gap:10px';
        const leftGrid = makeGrid(8);
        for (let i = 1; i <= 8; i++) createSeat(leftGrid, leftRow, i);
        leftBlock.appendChild(leftGrid);

        const rightBlock = document.createElement('div');
        rightBlock.style.cssText = 'display:flex;flex-direction:column;gap:10px';
        const rightGrid = makeGrid(8);
        for (let i = 1; i <= 8; i++) createSeat(rightGrid, rightRow, i);
        rightBlock.appendChild(rightGrid);

        section.appendChild(makeRow(leftBlock, rightBlock));
        container.appendChild(section);
    });

    // ── Premium row P – 8 seats left (P1-P8) + 8 seats right (P9-P16) ─────────
    const premiumSection = document.createElement('div');
    premiumSection.className = 'seat-sections-block premium-section';

    const pLeftGrid = makeGrid(8);
    for (let i = 1; i <= 8; i++) createSeat(pLeftGrid, 'P', i, 'premium');

    const pRightGrid = makeGrid(8);
    for (let i = 9; i <= 16; i++) createSeat(pRightGrid, 'P', i, 'premium');

    premiumSection.appendChild(makeRow(pLeftGrid, pRightGrid));
    container.appendChild(premiumSection);

    // ── Couple row K – 4 wide seats left (K1-K4) + 4 wide seats right (K5-K8) ─
    const coupleSection = document.createElement('div');
    coupleSection.className = 'seat-sections-block couple-section';

    const kLeftGrid = makeGrid(4);
    for (let i = 1; i <= 4; i++) createSeat(kLeftGrid, 'K', i, 'couple');

    const kRightGrid = makeGrid(4);
    for (let i = 5; i <= 8; i++) createSeat(kRightGrid, 'K', i, 'couple');

    coupleSection.appendChild(makeRow(kLeftGrid, kRightGrid));
    container.appendChild(coupleSection);
}

function triggerSmartSelect() {
    const input = document.getElementById('smart-seat-count');
    const count = parseInt(input.value);
    if (isNaN(count) || count <= 0) {
        alert("Please enter a valid number of seats.");
        return;
    }
    if (count > 9) {
        alert("Maximum 9 seats allowed for smart selection.");
        input.value = 9;
        return;
    }

    // Reset current selection
    selectedSeats = [];
    document.querySelectorAll('.seat.selected').forEach(s => {
        s.classList.remove('selected');
        s.classList.add('available');
    });

    const allAvailable = Array.from(document.querySelectorAll('.seat.available'));
    if (allAvailable.length < count) {
        alert(`Sorry, only ${allAvailable.length} seats are available.`);
        return;
    }

    // Row definitions for scoring
    const rowWeights = {
        'P': 1, 'A': 2, 'B': 2, 'C': 1, 'D': 1, 'E': 0, 'F': 0, 'G': 1, 'H': 1, 'I': 2, 'J': 2, 'K': 3
    };
    const rows = ['P', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
    let bestSelection = null;

    // Phase 1: Try to find a contiguous block in a row
    for (const rowLabel of rows) {
        const rowSeats = allAvailable.filter(s => s.innerText.startsWith(rowLabel))
            .sort((a, b) => {
                const nA = parseInt(a.innerText.slice(1));
                const nB = parseInt(b.innerText.slice(1));
                return nA - nB;
            });

        if (rowSeats.length < count) continue;

        for (let i = 0; i <= rowSeats.length - count; i++) {
            const block = rowSeats.slice(i, i + count);

            // Check if contiguous (e.g., E3, E4, E5)
            let isContiguous = true;
            for (let j = 0; j < block.length - 1; j++) {
                const curr = parseInt(block[j].innerText.slice(1));
                const next = parseInt(block[j + 1].innerText.slice(1));
                if (next !== curr + 1) {
                    isContiguous = false;
                    break;
                }
            }

            if (isContiguous) {
                // Score based on how center it is (Avg column vs center column 5)
                const avgCol = block.reduce((sum, s) => sum + parseInt(s.innerText.slice(1)), 0) / count;
                const colScore = Math.abs(avgCol - 5);
                const score = rowWeights[rowLabel] * 10 + colScore;

                if (!bestSelection || score < bestSelection.score) {
                    bestSelection = { seats: block, score: score };
                }
            }
        }
    }

    // Phase 2: Selection
    const seatsToSelect = bestSelection ? bestSelection.seats :
        // Fallback: Pick separate best individual seats
        allAvailable.sort((a, b) => {
            const rA = a.innerText.charAt(0);
            const rB = b.innerText.charAt(0);
            const nA = parseInt(a.innerText.slice(1));
            const nB = parseInt(b.innerText.slice(1));
            const sA = rowWeights[rA] * 10 + Math.abs(nA - 5);
            const sB = rowWeights[rB] * 10 + Math.abs(nB - 5);
            return sA - sB;
        }).slice(0, count);

    seatsToSelect.forEach(s => {
        s.classList.add('selected');
        s.classList.remove('available');
        selectedSeats.push(s.innerText);
    });

    updateSummary();
    if (window.lucide) lucide.createIcons();
}

function createSeat(parent, row, num, type = 'standard') {
    const seatId = `${row}${num}`;
    const seat = document.createElement('div');
    seat.className = `seat available ${type}`;
    seat.innerText = seatId;
    seat.dataset.seatId = seatId;
    seat.dataset.type = type;

    // Mock Occupied
    if (Math.random() < 0.15) seat.className = `seat occupied ${type}`;

    seat.onclick = () => {
        if (!seat.classList.contains('occupied')) {
            seat.classList.toggle('selected');
            if (seat.classList.contains('selected')) {
                selectedSeats.push(seatId);
            } else {
                selectedSeats = selectedSeats.filter(s => s !== seatId);
            }
            updateSummary();
        }
    };
    parent.appendChild(seat);
}


function toggleAddon(element, price) {
    const name = element.querySelector('h5').innerText;
    element.classList.toggle('active');

    if (element.classList.contains('active')) {
        addonTotal += price;
        selectedAddons.push(name);
    } else {
        addonTotal -= price;
        selectedAddons = selectedAddons.filter(a => a !== name);
    }
    updateSummary();
}

function toggleParking(element, type, price) {
    const cards = document.querySelectorAll('.parking-card');
    const isActive = element.classList.contains('active');

    cards.forEach(c => c.classList.remove('active'));

    if (isActive) {
        selectedParking = null;
    } else {
        element.classList.add('active');
        selectedParking = { type, price };
    }
    updateSummary();
}

function updateSummary() {
    const count = selectedSeats.length;
    let seatTotal = 0;
    const basePrice = currentMovie ? currentMovie.price : 0;

    selectedSeats.forEach(seatId => {
        const seatEl = document.querySelector(`.seat[data-seat-id="${seatId}"]`);
        const type = seatEl?.dataset.type || 'standard';
        if (type === 'premium') seatTotal += (basePrice + 50);
        else if (type === 'couple') seatTotal += (basePrice * 2);
        else seatTotal += basePrice;
    });

    let total = seatTotal + addonTotal;
    const parkingPrice = selectedParking ? selectedParking.price : 0;
    total += parkingPrice;

    const countEl = getEl('selected-seats-count');
    const addonPriceEl = getEl('summary-addons-price');
    const parkingPriceEl = getEl('summary-parking-price');
    const totalEl = getEl('total-price');

    if (countEl) countEl.innerText = count;
    if (addonPriceEl) addonPriceEl.innerText = `₹${addonTotal}`;
    if (parkingPriceEl) parkingPriceEl.innerText = `₹${parkingPrice}`;
    if (totalEl) totalEl.innerText = `₹${total}`;
}

// Close Modal
document.querySelector('.close-modal').onclick = () => {
    closeModal('booking-modal');
};

// Confirm Booking
document.getElementById('confirm-booking').onclick = () => {
    if (selectedSeats.length === 0) {
        alert("Please select at least one seat.");
        return;
    }

    const btn = document.getElementById('confirm-booking');
    btn.innerText = "Redirecting to Payment...";
    btn.disabled = true;

    setTimeout(() => {
        btn.innerText = "Confirm Booking";
        btn.disabled = false;

        // Hide selection modal, show payment modal
        closeModal('booking-modal');
        // Update payment modal summary
        const seatCount = selectedSeats.length;
        const moviePrice = currentMovie ? currentMovie.price : 0;
        let total = (seatCount * moviePrice) + addonTotal;
        if (selectedParking) total += selectedParking.price;

        const summaryText = getEl('checkout-summary-text');
        const finalAmount = getEl('final-payable-amount');
        if (summaryText) summaryText.innerText = `${currentMovie.title} • ${seatCount} Seats`;
        if (finalAmount) finalAmount.innerText = `₹${total}`;

        const pm = getEl('payment-modal');
        if (pm) {
            const modalContent = pm.querySelector('.modal-content');
            if (modalContent) modalContent.style.maxWidth = '900px';
            pm.classList.add('active');
        }
    }, 800);
};

function processFinalPayment() {
    const btn = document.getElementById('final-pay-btn');
    btn.innerText = "Securing Transaction...";
    btn.disabled = true;

    setTimeout(() => {
        // Hide checkout elements specifically within implementation
        const pm = getEl('payment-modal');
        if (pm) {
            pm.querySelectorAll('.checkout-header, .payment-details-container, .checkout-footer, .close-modal').forEach(el => {
                el.style.display = 'none';
            });
        }

        // Show success view
        const successView = getEl('payment-success');
        if (successView) successView.classList.add('active');

        // Populate print ticket data
        const title = currentMovie.title || 'Movie';
        const movieCode = title.split(' ').filter(w => w.length > 0).map(w => w[0]).join('').toUpperCase().substring(0, 3);
        const bookingId = `CF-${movieCode}-${Math.floor(1000 + Math.random() * 9000)}`;

        const bannerImg = document.getElementById('print-banner-img');
        if (bannerImg) {
            bannerImg.crossOrigin = "anonymous";
            bannerImg.src = currentMovie.image;
        }

        document.getElementById('print-ticket-id').innerText = bookingId;
        document.getElementById('print-movie-title').innerText = title;
        document.getElementById('print-seats').innerText = selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Not Selected';
        document.getElementById('print-date').innerText = currentBookingInfo.date || 'TBD';
        document.getElementById('print-time').innerText = currentBookingInfo.time || 'TBD';
        document.getElementById('print-theater').innerText = currentBookingInfo.theater || 'TBD';

        // Populate Addons list on ticket
        const snacksList = selectedAddons;

        const addonsList = getEl('print-addons-list');
        if (addonsList) {
            let addonsHtml = '';
            if (snacksList.length > 0) {
                addonsHtml += `
                    <div class="addon-print-tag">
                        <i data-lucide="utensils" style="width:16px;"></i> 
                        <span><b>REFRESHMENTS:</b> ${snacksList.join(', ')}</span>
                    </div>`;
            }
            if (selectedParking) {
                addonsHtml += `
                    <div class="addon-print-tag">
                        <i data-lucide="${selectedParking.type === 'Car' ? 'car' : 'bike'}" style="width:16px;"></i> 
                        <span><b>PARKING PASS:</b> ${selectedParking.type} Slot Allocated</span>
                    </div>`;
            }
            addonsList.innerHTML = addonsHtml;
        }

        // Generate Print QR
        const qrContainer = getEl('print-qr');
        if (qrContainer && typeof QRCode !== 'undefined') {
            qrContainer.innerHTML = '';
            new QRCode(qrContainer, {
                text: `VALID-TICKET-${bookingId}`,
                width: 90,
                height: 90,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
        }

        if (window.lucide) lucide.createIcons();

        // ── Save booking to localStorage ──────────────────────────────────────
        const seatCount = selectedSeats.length;
        const moviePrice = currentMovie ? currentMovie.price : 0;
        let totalPaid = 0;
        (selectedSeats || []).forEach(seatId => {
            const seatEl = document.querySelector(`.seat[data-seat-id="${seatId}"]`);
            const type = seatEl?.dataset.type || 'standard';
            if (type === 'premium') totalPaid += (moviePrice + 50);
            else if (type === 'couple') totalPaid += (moviePrice * 2);
            else totalPaid += moviePrice;
        });
        totalPaid += addonTotal + (selectedParking ? selectedParking.price : 0);

        const bookingRecord = {
            id: document.getElementById('print-ticket-id')?.innerText || bookingId,
            title: currentMovie?.title || 'Movie',
            genre: currentMovie?.genre || '',
            image: currentMovie?.image || '',
            seats: [...(selectedSeats || [])],
            date: currentBookingInfo?.date || 'TBD',
            time: currentBookingInfo?.time || 'TBD',
            theater: currentBookingInfo?.theater || 'TBD',
            total: totalPaid,
            addons: [...selectedAddons],
            parking: selectedParking ? selectedParking.type : null,
            bookedOn: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
        };

        const existing = JSON.parse(localStorage.getItem('cineflow_bookings') || '[]');
        existing.unshift(bookingRecord);
        localStorage.setItem('cineflow_bookings', JSON.stringify(existing));
        // ─────────────────────────────────────────────────────────────────────

        btn.innerText = "Pay Now";
        btn.disabled = false;
        selectedSeats = [];
    }, 2000);
}

async function saveTicket() {
    const ticket = document.getElementById('ticket-to-print');
    const btn = document.querySelector('button[onclick="saveTicket()"]');
    btn.innerText = "Exporting Ticket...";

    try {
        const canvas = await html2canvas(ticket, {
            useCORS: true,
            backgroundColor: '#0a0a0b',
            scale: 2 // High quality
        });

        const link = document.createElement('a');
        link.download = `CineFlow-Ticket-${document.getElementById('print-ticket-id').innerText}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    } catch (e) {
        console.error("Save failed", e);
        alert("Failed to save ticket image.");
    } finally {
        btn.innerHTML = '<i data-lucide="download"></i> Save Ticket';
        if (window.lucide) lucide.createIcons();
    }
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}

function generateTicketQRs() {
    document.querySelectorAll('.qr-container').forEach(container => {
        const id = container.getAttribute('data-id');
        new QRCode(container, {
            text: `TICKET-ID: ${id}`,
            width: 80,
            height: 80,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    });
}

// Navbar Background on Scroll
// Functionality moved to initCommon

// ─── Mobile Navigation ────────────────────────────────────────────────────────
function toggleMobileNav() {
    const nav = document.getElementById('nav-links');
    const ham = document.getElementById('hamburger');
    if (!nav || !ham) return;
    nav.classList.toggle('open');
    ham.classList.toggle('open');
    // Prevent body scroll when menu is open
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
}

// Close mobile nav when a link is tapped
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('#nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            const nav = document.getElementById('nav-links');
            const ham = document.getElementById('hamburger');
            if (nav) nav.classList.remove('open');
            if (ham) ham.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
});
