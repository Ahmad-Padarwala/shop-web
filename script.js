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

    // --- WhatsApp Form Submission ---
    const form = document.getElementById('orderForm');
    const popup = document.getElementById('successPopup');
    const popupClose = document.getElementById('popupClose');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // 1. Get Values
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const tea = document.getElementById('teaType').value;
            const qty = document.getElementById('quantity').value;
            const msg = document.getElementById('message').value;

            // 2. Format WhatsApp Message
            // %0a is a line break
            const whatsappMsg = `*New Inquiry from Website* %0a%0a` +
                `*Name:* ${name} %0a` +
                `*Phone:* ${phone} %0a` +
                `*Product:* ${tea} %0a` +
                `*Quantity:* ${qty} KG %0a` +
                `*Message:* ${msg}`;

            // 3. Your WhatsApp Number (Format: CountryCode + Number)
            const myPhoneNumber = "919725575378";

            // 4. Create Link
            const whatsappUrl = `https://wa.me/${myPhoneNumber}?text=${whatsappMsg}`;

            // 5. Show Popup & Redirect
            if (popup) popup.classList.add('show');

            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
                form.reset();
                if (popup) popup.classList.remove('show');
            }, 1500);
        });
    }

    if (popupClose) {
        popupClose.addEventListener('click', () => {
            popup.classList.remove('show');
        });
    }
});