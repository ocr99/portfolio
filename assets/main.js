(function () {
    "use strict";

    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        }
        else {
            return document.querySelector(el)
        }
    }

    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        }
    }

    /**
     * Easy on scroll event listener 
     */
    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
        let position = window.scrollY + 200
        navbarlinks.forEach(navbarlink => {
            if (!navbarlink.hash) return
            let section = select(navbarlink.hash)
            if (!section) return
            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                navbarlink.classList.add('active')
            }
            else {
                navbarlink.classList.remove('active')
            }
        })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)

    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
        let elementPos = select(el).offsetTop
        window.scrollTo({
            top: elementPos,
            behavior: 'smooth'
        })
    }

    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top')
    if (backtotop) {
        const toggleBacktotop = () => {
            if (window.scrollY > 100) {
                backtotop.classList.add('active')
            }
            else {
                backtotop.classList.remove('active')
            }
        }
        window.addEventListener('load', toggleBacktotop)
        onscroll(document, toggleBacktotop)
    }

    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function (e) {
        select('body').classList.toggle('mobile-nav-active')
        const expanded = select('body').classList.contains('mobile-nav-active')
        this.setAttribute('aria-expanded', expanded)
        this.classList.toggle('bi-list')
        this.classList.toggle('bi-x')
    })

    /**
     * Scroll with offset on links with a class name .scrollto
     */
    on('click', '.scrollto', function (e) {
        if (select(this.hash)) {
            e.preventDefault()

            let body = select('body')
            if (body.classList.contains('mobile-nav-active')) {
                body.classList.remove('mobile-nav-active')
                let navbarToggle = select('.mobile-nav-toggle')
                navbarToggle.classList.toggle('bi-list')
                navbarToggle.classList.toggle('bi-x')
                navbarToggle.setAttribute('aria-expanded', 'false')
            }
            scrollto(this.hash)
        }
    }, true)

    /**
     * Scroll with offset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
        if (window.location.hash) {
            if (select(window.location.hash)) {
                scrollto(window.location.hash)
            }
        }
    });

    /**
     * Preloader
     */
    let preloader = select('#preloader');
    if (preloader) {
        const removePreloader = () => preloader.remove();
        window.addEventListener('load', removePreloader);
        // Safety net: never let the preloader block the page if 'load'
        // is delayed by a slow/blocked third-party asset.
        setTimeout(removePreloader, 4000);
    }

    /**
     * Porfolio isotope and filter
     * Only initialize Isotope when a filter bar actually exists on the page —
     * otherwise it takes absolute-position control of the grid and overrides
     * Bootstrap's own centering/layout for no reason.
     */
    window.addEventListener('load', () => {
        let portfolioContainer = select('.portfolio-container');
        let portfolioFiltersBar = select('#portfolio-flters');

        if (portfolioContainer && portfolioFiltersBar && typeof Isotope !== 'undefined') {
            let portfolioIsotope = new Isotope(portfolioContainer, {
                itemSelector: '.portfolio-item'
            });

            let portfolioFilters = select('#portfolio-flters li', true);

            on('click', '#portfolio-flters li', function(e) {
                e.preventDefault();
                portfolioFilters.forEach(function(el) {
                    el.classList.remove('filter-active');
                });
                this.classList.add('filter-active');

                portfolioIsotope.arrange({
                    filter: this.getAttribute('data-filter')
                });
                portfolioIsotope.on('arrangeComplete', function() {
                    if (typeof AOS !== 'undefined') AOS.refresh()
                });
            }, true);
        }

    });


    /**
     * Initiate portfolio lightbox(es)
     * Deferred to window 'load' so this runs after glightbox.min.js has
     * definitely finished loading, regardless of script order/timing.
     */
    window.addEventListener('load', () => {
        if (typeof GLightbox === 'undefined') return;

        GLightbox({
            selector: '.portfolio-lightbox'
        });

        GLightbox({
            selector: '.portfolio-details-lightbox',
            width: '90%',
            height: '90vh'
        });
    });

    /**
     * Portfolio details slider
     * Only present on pages that load Swiper (e.g. elboncami.html,
     * personal-portfolio.html) — guarded so index.html, which doesn't
     * load Swiper, doesn't throw a "Swiper is not defined" error.
     */
    window.addEventListener('load', () => {
        if (typeof Swiper === 'undefined') return;
        if (!select('.portfolio-details-slider')) return;

        const swiper = new Swiper(".portfolio-details-slider", {
            speed: 400,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            keyboard: {
                enabled: true,
            },
            pagination: {
                el: ".swiper-pagination",
                type: "bullets",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });

        /**
         * Show the bullet navigation buttons of Swiper only on hover the image
         */
        let next = select('.swiper-button-next');
        let prev = select('.swiper-button-prev');

        if (next && prev) {
            on('mouseover', '.hover-wrapper', function(e) {
                next.style.opacity = 1;
                prev.style.opacity = 1;
            });
            on('mouseout', '.hover-wrapper', function(e) {
                next.style.opacity = 0;
                prev.style.opacity = 0;
            });
        }
    });

    /**
     * Animation on scroll
     */
    window.addEventListener('load', () => {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                easing: 'ease-in-out',
                once: true,
                mirror: false
            })
        }
    });

    /*
     * Calculate Age Automatically
     * window.addEventListener('load', () => {
     *     const ageEl = document.getElementById("currentAge");
     *     if (!ageEl) return;
     *
     *     // Obtener fecha local en zona horaria de Madrid
     *     const nowInMadrid = new Date(
     *         new Date().toLocaleString('en-US', { timeZone: 'Europe/Madrid' })
     *     );
     *
     *     const birthYear = 1999;
     *     const birthMonth = 6; // Julio (mes 6 en JS)
     *     const birthDay = 3;
     *
     *     let age = nowInMadrid.getFullYear() - birthYear;
     *
     *     const hasBirthdayPassed = (
     *         nowInMadrid.getMonth() > birthMonth ||
     *         (nowInMadrid.getMonth() === birthMonth && nowInMadrid.getDate() >= birthDay)
     *     );
     *
     *     if (!hasBirthdayPassed) {
     *         age -= 1;
     *     }
     *
     *     ageEl.textContent = age.toString();
     * });
     */


    /**
     * Update all email class to mailto Automatically
     */
    window.addEventListener('DOMContentLoaded', () => {
        let currentMail = "oscar.lopezconde@outlook.com";
        let anchors = select('a.mailto', true);

        for(const element of anchors) {
            if (element.classList.contains("mail-schedule")){
                element.setAttribute("href", ("mailto:" + currentMail + "?subject=I%20would%20like%20to%20Schedule%20a%20call"));
                element.textContent = "Schedule a Call!"
            }
            else {
                element.setAttribute("href", ("mailto:" + currentMail));
                if (!(element.classList.contains("noTextA"))) element.textContent = currentMail;
            }
        }
    });

})()