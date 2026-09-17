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
        // Near the bottom of the page there may not be enough scrollable
        // height left to push `position` past the last section's end
        // (the browser simply can't scroll further), so the normal range
        // check below can never match the last section. Detect "scrolled
        // to (near) the bottom" directly and force the last link active.
        const atBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 2)
 
        navbarlinks.forEach((navbarlink, index) => {
            if (!navbarlink.hash) return
            let section = select(navbarlink.hash)
            if (!section) return
 
            const isLast = index === navbarlinks.length - 1
            // When at the bottom, only the last link's "atBottom" state
            // decides activation, this must fully override the normal
            // range check for every link (including the last one), or
            // an earlier section whose range overlaps near the page end
            // (e.g. Projects right above Contact) stays active too.
            const shouldBeActive = atBottom
                ? isLast
                : (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight))
 
            if (shouldBeActive) {
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
     * Initiate portfolio lightbox(es)
     * Deferred to window 'load' so this runs after glightbox.min.js has
     * definitely finished loading, regardless of script order/timing.
     */
    window.addEventListener('load', () => {
        if (typeof GLightbox === 'undefined') return;

        // Exposed on window so a project page loaded in the overlay's iframe
        // can reach it from window.top (see the back link handler below).
        window.portfolioLightbox = GLightbox({
            selector: '.portfolio-details-lightbox',
            width: '90%',
            height: '90vh'
        });
    });

    /**
     * "Back to portfolio" link on the project pages.
     * Those pages are also shown inside the portfolio's GLightbox overlay, and
     * there the link's target="_top" points at the very document already
     * loaded in the top window. The browser treats that as a same-document
     * fragment navigation: it scrolls and never reloads, so the overlay stays
     * on top and the link looks dead. Inside the overlay, close it instead.
     * Opened standalone the link is left alone and navigates normally.
     */
    on('click', '.project-back a', function (e) {
        if (window.self === window.top) return;

        let parentLightbox;
        try {
            parentLightbox = window.top.portfolioLightbox;
        } catch (err) {
            return; // Different origin: leave the default behaviour alone.
        }
        if (!parentLightbox) return;

        e.preventDefault();
        parentLightbox.close();
        if (this.hash) window.top.location.hash = this.hash;
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

    /**
     * Auto-updating "X+ years" experience/duration labels.
     * Add data-years-since="YYYY-MM-DD" to any element and its text content
     * gets replaced with "N+ years" (or "N years" if data-years-exact is set),
     * calculated from that date to "now" in Madrid time.
     */
    window.addEventListener('DOMContentLoaded', () => {
        const targets = select('[data-years-since]', true);
        if (!targets.length) return;

        const nowInMadrid = new Date(
            new Date().toLocaleString('en-US', { timeZone: 'Europe/Madrid' })
        );

        targets.forEach((el) => {
            const start = new Date(el.getAttribute('data-years-since'));
            if (isNaN(start.getTime())) return;

            let years = nowInMadrid.getFullYear() - start.getFullYear();
            const hasAnniversaryPassed = (
                nowInMadrid.getMonth() > start.getMonth() ||
                (nowInMadrid.getMonth() === start.getMonth() && nowInMadrid.getDate() >= start.getDate())
            );
            if (!hasAnniversaryPassed) years -= 1;

            const suffix = el.hasAttribute('data-years-exact') ? '' : '+';
            el.textContent = `${years}${suffix} year${years === 1 ? '' : 's'}`;
        });
    });

    /**
     * Update all email class to mailto Automatically.
     * `.noTextA` anchors keep their own markup (icon, heading); those that
     * need the address rendered inside them use a nested `.mailto-text`
     * element, so the anchor itself is never flattened to plain text.
     */
    window.addEventListener('DOMContentLoaded', () => {
        const currentMail = "oscar.lopezconde@outlook.com";

        select('a.mailto', true).forEach((el) => {
            el.setAttribute('href', 'mailto:' + currentMail);
            if (!el.classList.contains('noTextA')) el.textContent = currentMail;
        });

        select('.mailto-text', true).forEach((el) => {
            el.textContent = currentMail;
        });
    });

})()