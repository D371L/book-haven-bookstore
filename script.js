document.addEventListener('DOMContentLoaded', function () {
    // === Burger menu functionality ===
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (burgerMenu && navLinks) {
        burgerMenu.addEventListener('click', function () {
            burgerMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        document.addEventListener('click', function (event) {
            if (!burgerMenu.contains(event.target) && !navLinks.contains(event.target)) {
                burgerMenu.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }

    // === Smooth scrolling ===
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // === Scroll animations ===
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const animatedElements = document.querySelectorAll(
        '.gallery-item-container, .about-photo, .event-item, .hero-section .image-box, .hero-section .text-box, .about-text, .events-wrapper'
    );

    const images = document.querySelectorAll('img');
    let loadedImages = 0;

    const initializeAnimations = () => {
        animatedElements.forEach(el => observer.observe(el));
    };

    const checkImagesLoaded = () => {
        loadedImages++;
        if (loadedImages === images.length) {
            setTimeout(initializeAnimations, 100);
        }
    };

    images.forEach(img => {
        if (img.complete) {
            checkImagesLoaded();
        } else {
            img.addEventListener('load', checkImagesLoaded);
            img.addEventListener('error', checkImagesLoaded);
        }
    });

    if (images.length === 0) {
        initializeAnimations();
    }

    // === Modal for gallery ===
    const createModal = () => {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.cssText = `
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.8);
            justify-content: center;
            align-items: center;
        `;
        modal.innerHTML = `
            <div class="modal-content" style="position: relative; max-width: 90%; max-height: 90%; background: white; padding: 20px; border-radius: 8px;">
                <span class="close-modal" style="position: absolute; top: 10px; right: 15px; font-size: 28px; font-weight: bold; cursor: pointer;">&times;</span>
                <img src="" alt="" class="modal-image" style="max-width: 100%; height: auto; display: block; margin-bottom: 15px;">
                <div class="modal-description" style="text-align: center; font-weight: bold; color: #2E4057;"></div>
            </div>
        `;
        document.body.appendChild(modal);
        return modal;
    };

    const modal = createModal();
    const modalImage = modal.querySelector('.modal-image');
    const modalDescription = modal.querySelector('.modal-description');

    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const img = item.querySelector('img');
            const title = item.parentElement.querySelector('.gallery-item-title');
            if (img && title) {
                modalImage.src = img.src;
                modalImage.alt = img.alt;
                modalDescription.textContent = title.textContent;
                modal.style.display = 'flex';
            }
        });
    });

    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // === Subscribe button alert ===
    const subscribeBtn = document.getElementById('subscribeBtn');
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', () => {
            alert('Thank you for subscribing.');
        });
    }

    // === Cart functionality with visible count ===
    let cartItems = 0;
    const cartCount = document.getElementById('cartCount'); // make sure <span id="cartCount"> exists

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            cartItems++;
            alert('Item added to the cart');
            if (cartCount) cartCount.textContent = cartItems;
        });
    });

    const clearCartBtn = document.getElementById('clearCartBtn');
    const processOrderBtn = document.getElementById('processOrderBtn');

    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => {
            if (cartItems > 0) {
                cartItems = 0;
                alert('Cart cleared');
            } else {
                alert('No items to clear');
            }
            if (cartCount) cartCount.textContent = cartItems;
        });
    }

    if (processOrderBtn) {
        processOrderBtn.addEventListener('click', () => {
            if (cartItems > 0) {
                alert('Thank you for your order');
                cartItems = 0;
            } else {
                alert('Cart is empty');
            }
            if (cartCount) cartCount.textContent = cartItems;
        });
    }

    // === Contact form validation ===
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = contactForm.querySelector('input[name="name"]').value.trim();
            const email = contactForm.querySelector('input[name="email"]').value.trim();
            const message = contactForm.querySelector('textarea[name="message"]').value.trim();

            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }

            alert('Thank you for your message!');
            contactForm.reset();
        });
    }
});
