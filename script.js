document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu ---
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const closeMenu = document.getElementById('closeMenu');
    const navItems = document.querySelectorAll('.nav-link');

    const toggleMenu = () => navLinks.classList.toggle('active');

    if (menuToggle) menuToggle.addEventListener('click', toggleMenu);
    if (closeMenu) closeMenu.addEventListener('click', toggleMenu);

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // --- Navbar Scroll ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.05)";
            navbar.style.background = "rgba(255, 255, 255, 0.98)";
        } else {
            navbar.style.boxShadow = "none";
            navbar.style.background = "rgba(249, 248, 246, 0.95)";
        }
    });

    // --- Order Button Logic ---
    const orderBtns = document.querySelectorAll('.order-btn');
    const teaSelect = document.getElementById('teaType');
    const orderSection = document.getElementById('order');

    orderBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tea = btn.getAttribute('data-tea');
            if (teaSelect) teaSelect.value = tea;

            const offset = 100;
            const elementPosition = orderSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        });
    });

    // --- WhatsApp Form Submission (Pixel-Accurate Sync) ---
    const form = document.getElementById('orderForm');
    const popup = document.getElementById('successPopup');

    if (form) {
        const fields = form.querySelectorAll('.pixel-field');

        // 1. Precise Error Clearing
        fields.forEach(field => {
            field.addEventListener('input', () => {
                const errorSpan = document.getElementById(`${field.id}Error`);
                if (errorSpan) {
                    errorSpan.textContent = '';
                    errorSpan.classList.remove('visible');
                }
                field.closest('.input-with-icon').style.borderBottomColor = '';
            });
        });

        const showPixelError = (id, msg) => {
            const errorSpan = document.getElementById(`${id}Error`);
            const field = document.getElementById(id);
            if (errorSpan) {
                errorSpan.textContent = msg;
                errorSpan.classList.add('visible');
            }
            if (field) {
                field.closest('.input-with-icon').style.borderBottomColor = '#feb2b2';
            }
        };

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // 2. Validation Logic (Strict)
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const tea = document.getElementById('teaType').value;
            const qty = document.getElementById('quantity').value;
            const msg = document.getElementById('message').value.trim();

            if (!name) {
                showPixelError('name', 'Please enter your full name');
                isValid = false;
            }

            if (!phone) {
                showPixelError('phone', 'Phone number is required');
                isValid = false;
            } else if (!/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
                showPixelError('phone', 'Please enter a valid 10-digit number');
                isValid = false;
            }

            if (!tea) {
                showPixelError('teaType', 'Please select a tea variety');
                isValid = false;
            }

            if (!qty || qty <= 0) {
                showPixelError('quantity', 'Enter a valid quantity');
                isValid = false;
            }

            if (!isValid) return;

            // 3. WhatsApp Message Formatting
            const whatsappMsg = `*New Inquiry from Website* %0a%0a` +
                `*Name:* ${name} %0a` +
                `*Phone:* ${phone} %0a` +
                `*Product:* ${tea} %0a` +
                `*Quantity:* ${qty} KG %0a` +
                `*Message:* ${msg || 'No specific requirements'}`;

            const myPhoneNumber = "919725575378";
            const whatsappUrl = `https://wa.me/${myPhoneNumber}?text=${whatsappMsg}`;

            // 4. Success UX
            if (popup) {
                popup.classList.add('show');
                const pTitle = popup.querySelector('h3');
                const pText = popup.querySelector('p');
                if (pTitle) pTitle.textContent = "Redirecting to WhatsApp...";
                if (pText) pText.textContent = "Preparing your inquiry details.";
            }

            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
                form.reset();
                if (popup) popup.classList.remove('show');
            }, 1800);
        });
    }

    // --- DATA OBJECTS (Dynamic Content) ---
    const products = [
        {
            id: 1,
            name: "Gold Tea",
            badge: "Premium",
            price: "₹850",
            desc: "Best gold tea — premium golden-tipped Assam tea leaf with exceptional aroma.",
            image: "images/three-key-tea-pack.png"
        },
        {
            id: 2,
            name: "Mamri Tea",
            badge: "Strong",
            price: "₹650",
            desc: "Best mamri tea — robust granular Assam tea for a strong morning cup.",
            image: "images/three-key-tea-pack.png"
        },
        {
            id: 3,
            name: "Mix Tea",
            badge: "Balanced",
            price: "₹550",
            desc: "Premium tea blend — the perfect balance of best Assam tea strength and flavor.",
            image: "images/three-key-tea-pack.png"
        },
        {
            id: 4,
            name: "Small Grains",
            badge: "Value",
            price: "₹450",
            desc: "Best tea for quick brewing — fine Assam tea grains for instant refreshment.",
            image: "images/three-key-tea-pack.png"
        }
    ];

    const renderProducts = () => {
        const productGrid = document.querySelector('.product-grid');
        if (!productGrid) return;

        productGrid.innerHTML = products.map(product => `
            <div class="tea-card">
                <div class="card-image-wrapper">
                    <span class="badge">${product.badge}</span>
                    <img src="${product.image}" alt="${product.name} - Three Key Tea, Best Tea in India" class="tea-img" loading="lazy">
                </div>
                <div class="card-content">
                    <div class="card-top">
                        <h3>${product.name}</h3>
                        <span class="price">${product.price}</span>
                    </div>
                    <p class="desc">${product.desc}</p>
                    <button class="add-btn order-btn" data-tea="${product.name}">Select Tea</button>
                </div>
            </div>
        `).join('');

        // Re-attach event listeners for the new buttons
        document.querySelectorAll('.order-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const teaName = e.target.getAttribute('data-tea');
                const selectElement = document.getElementById('teaType');
                const orderSection = document.getElementById('order');

                if (selectElement) {
                    selectElement.value = teaName;
                }

                if (orderSection) {
                    orderSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    };

    // Call render functions
    renderProducts();

    const reviews = [
        {
            id: 1,
            text: "I was a coffee drinker but Three Key Tea changed everything. The Gold Tea has such a rich aroma and authentic taste. Now I start every morning with a cup. Highly recommend!",
            author: "Anas Kadival",
            role: "Tea Enthusiast",
            avatar: "AK",
            rating: 5,
            date: "10th Feb, 2023",
            productId: 1
        },
        {
            id: 2,
            text: "As a café owner, quality matters. Three Key Tea's wholesale rates are competitive and the tea quality is consistently excellent. My customers love it!",
            author: "Adil Patel",
            role: "Café Owner",
            avatar: "AP",
            rating: 5,
            date: "8th Feb, 2023",
            productId: 5
        },
        {
            id: 3,
            text: "The Mamri Tea is incredibly strong and flavorful. Perfect for my morning chai. The vacuum packaging keeps it fresh. Best tea I've had from Assam!",
            author: "Ramesh Kumar",
            role: "Home Chef",
            avatar: "RK",
            rating: 5,
            date: "5th Feb, 2023",
            productId: 2
        },
        {
            id: 4,
            text: "Three Key Tea helped me offer premium tea services to my clients. I learned about authentic Indian tea and business has been growing steadily!",
            author: "Vinayy Patel",
            role: "Retail Partner",
            avatar: "VP",
            rating: 5,
            date: "3rd Feb, 2023",
            productId: 1
        },
        {
            id: 5,
            text: "I work full-time and needed something authentic. Three Key Tea's delivery was perfect. The real-world freshness made everything feel premium.",
            author: "Michael Roberts",
            role: "Software Engineer",
            avatar: "MR",
            rating: 5,
            date: "1st Feb, 2023",
            productId: 4
        },
        {
            id: 6,
            text: "Compared to other brands, Three Key Tea offers incredible value. The Mix Tea bundle is my daily go-to. The freshness guarantee is a game-changer!",
            author: "Chris Brown",
            role: "Tea Connoisseur",
            avatar: "CB",
            rating: 5,
            date: "28th Jan, 2023",
            productId: 4
        }
    ];

    // --- TESTIMONIALS CAROUSEL RENDERING & LOGIC ---
    const carouselTrack = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');

    const renderTestimonials = () => {
        if (!carouselTrack) return;

        carouselTrack.innerHTML = ''; // Clear existing
        const slides = [];
        const reviewsPerSlide = window.innerWidth < 768 ? 1 : 2; // 1 per slide on mobile, 2 on desktop

        for (let i = 0; i < reviews.length; i += reviewsPerSlide) {
            const slideReviews = reviews.slice(i, i + reviewsPerSlide);
            const slideDiv = document.createElement('div');
            slideDiv.className = 'testimonial-carousel-slide';

            // Adjust grid columns based on items per slide
            slideDiv.style.gridTemplateColumns = reviewsPerSlide === 1 ? '1fr' : 'repeat(2, 1fr)';

            slideReviews.forEach(review => {
                const card = document.createElement('div');
                card.className = 'testimonial-carousel-card';
                card.innerHTML = `
                    <div class="testimonial-carousel-header">
                        <div class="testimonial-carousel-stars">
                            <span>${'★'.repeat(review.rating)}</span>
                        </div>
                        <span class="testimonial-carousel-date">${review.date}</span>
                    </div>
                    <p class="testimonial-carousel-text">"${review.text}"</p>
                    <div class="testimonial-carousel-author">
                        <div class="testimonial-carousel-avatar">
                            <span>${review.avatar}</span>
                        </div>
                        <div class="testimonial-carousel-info">
                            <h4>${review.author}</h4>
                            <span>${review.role}</span>
                        </div>
                    </div>
                `;
                slideDiv.appendChild(card);
            });
            carouselTrack.appendChild(slideDiv);
            slides.push(slideDiv);
        }
        return slides;
    };


    if (carouselTrack && prevBtn && nextBtn) {
        // Initial Render
        renderTestimonials();

        // Re-render on resize to adjust items per slide if needed
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                renderTestimonials();
                updateCarousel(); // Reset position
            }, 250);
        });

        let slides = Array.from(carouselTrack.children); // Get initially rendered slides
        let currentIndex = 0;
        let autoPlayInterval;

        const updateCarousel = () => {
            // Refresh slides list in case of re-render
            slides = Array.from(carouselTrack.children);
            if (slides.length === 0) return;

            const slideWidth = slides[0].getBoundingClientRect().width;
            carouselTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        };

        const goToNextSlide = () => {
            slides = Array.from(carouselTrack.children); // Ensure fresh list
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
        };

        const goToPrevSlide = () => {
            slides = Array.from(carouselTrack.children); // Ensure fresh list
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateCarousel();
        };

        const startAutoPlay = () => {
            stopAutoPlay(); // Clear any existing
            autoPlayInterval = setInterval(goToNextSlide, 3000);
        };

        const stopAutoPlay = () => {
            clearInterval(autoPlayInterval);
        };

        // Event listeners
        nextBtn.addEventListener('click', () => {
            stopAutoPlay();
            goToNextSlide();
            startAutoPlay();
        });

        prevBtn.addEventListener('click', () => {
            stopAutoPlay();
            goToPrevSlide();
            startAutoPlay();
        });

        // Start auto-play
        startAutoPlay();

        // Pause on hover
        carouselTrack.addEventListener('mouseenter', stopAutoPlay);
        carouselTrack.addEventListener('mouseleave', startAutoPlay);
    }

    // --- CONTENT PROTECTION ---
    // 1. Disable Right Click
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });

    // 2. Disable Image Dragging
    document.addEventListener('dragstart', (e) => {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
            return false;
        }
    });

    // 3. Disable Keyboard Shortcuts (Copy, Save, Inspect)
    document.addEventListener('keydown', (e) => {
        // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
        if (
            e.key === 'F12' ||
            (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
            (e.ctrlKey && e.key === 'u') ||
            (e.ctrlKey && e.key === 's') ||
            (e.ctrlKey && e.key === 'p')
        ) {
            e.preventDefault();
            return false;
        }

        // Disable Copy/Cut/Paste
        if (e.ctrlKey && (e.key === 'c' || e.key === 'x' || e.key === 'v')) {
            e.preventDefault();
            return false;
        }
    });
});