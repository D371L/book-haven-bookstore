document.addEventListener('DOMContentLoaded', function() {
    // Burger menu functionality
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (burgerMenu && navLinks) {
        burgerMenu.addEventListener('click', function() {
            burgerMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!burgerMenu.contains(event.target) && !navLinks.contains(event.target)) {
                burgerMenu.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }

    // Smooth scrolling for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Animation on scroll using Intersection Observer (modern approach)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Wait for images to load before observing elements
    const images = document.querySelectorAll('img');
    let loadedImages = 0;

    const initializeAnimations = () => {
        const animatedElements = document.querySelectorAll(
            '.gallery-item-container, .about-photo, .event-item, .hero-section .image-box, .hero-section .text-box, .about-text, .events-wrapper'
        );

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    };

    const checkImagesLoaded = () => {
        loadedImages++;
        if (loadedImages === images.length) {
            // All images loaded, now initialize animations
            setTimeout(initializeAnimations, 100);
        }
    };

    // Check if images are already loaded or add load event listeners
    images.forEach(img => {
        if (img.complete) {
            checkImagesLoaded();
        } else {
            img.addEventListener('load', checkImagesLoaded);
            img.addEventListener('error', checkImagesLoaded); // Handle broken images
        }
    });

    // If no images, initialize animations immediately
    if (images.length === 0) {
        initializeAnimations();
    }

    // Interactive gallery with modal window
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

    // Click handler for gallery images
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

    // Modal window close handlers
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Contact form with validation (if exists)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = contactForm.querySelector('input[name="name"]').value;
            const email = contactForm.querySelector('input[name="email"]').value;
            const message = contactForm.querySelector('textarea[name="message"]').value;

            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }

            alert('Thank you for your message! We will contact you soon.');
            contactForm.reset();
        });
    }
});