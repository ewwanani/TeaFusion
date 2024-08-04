import { Reservation } from './reservation.js';

document.addEventListener('DOMContentLoaded', function () {

    "use strict";

    // Handle scroll event for header background
    window.addEventListener('scroll', function() {
        var scroll = window.scrollY;
        var box = document.querySelector('.header-text') ? document.querySelector('.header-text').offsetHeight : 0;
        var header = document.querySelector('header') ? document.querySelector('header').offsetHeight : 0;

        if (scroll >= box - header) {
            document.querySelector("header").classList.add("background-header");
        } else {
            document.querySelector("header").classList.remove("background-header");
        }
    });

    // Menu dropdown toggle
    var menuTrigger = document.querySelector('.menu-trigger');
    var mainNav = document.querySelector('.main-nav');

    if (menuTrigger && mainNav) {
        menuTrigger.addEventListener('click', function () {
            console.log('Hamburger icon clicked');
            menuTrigger.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
        // Close the dropdown menu after clicking a link
        document.querySelectorAll('.nav a').forEach(function(link) {
            link.addEventListener('click', function() {
                // Close the menu
                menuTrigger.classList.remove('active');
                mainNav.classList.remove('active');
            });
        });

    } else {
        console.error('Menu trigger or main nav not found');
    }
    



    // Slick slider initialization
    if (document.querySelector(".Modern-Slider")) {
        $(".Modern-Slider").slick({
            autoplay: true,
            autoplaySpeed: 10000,
            speed: 600,
            slidesToShow: 1,
            slidesToScroll: 1,
            pauseOnHover: false,
            dots: true,
            pauseOnDotsHover: true,
            cssEase: 'linear',
            draggable: false,
            prevArrow: '<button class="PrevArrow"></button>',
            nextArrow: '<button class="NextArrow"></button>',
        });
    }

    // Tabs initialization
    if (document.querySelector("#tabs")) {
        $("#tabs").tabs();
    }

    // Owl carousel initialization
    if (document.querySelector('.owl-menu-item')) {
        $('.owl-menu-item').owlCarousel({
            items: 5,
            loop: true,
            dots: true,
            nav: true,
            autoplay: true,
            margin: 30,
            responsive: {
                0: { items: 1 },
                600: { items: 2 },
                1000: { items: 5 }
            }
        });
    }

    document.addEventListener("DOMContentLoaded", function() {
        var menuTrigger = document.querySelector('.menu-trigger');
        var mainNav = document.querySelector('.main-nav');

        menuTrigger.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    });

    // AJAX for Reservation Form
    const reservationForm = document.getElementById('reservation-form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const formData = new FormData(this);
            const reservation = new Reservation(
                formData.get('name'),
                formData.get('email'),
                formData.get('phone'),
                formData.get('number-guests'),
                formData.get('date'),
                formData.get('time'),
                formData.get('message')
            );

            reservation.submit();
        });
    }
    

    // Scroll animation initialization
    if (typeof ScrollReveal !== 'undefined') {
        window.sr = ScrollReveal();
    }



    // Smooth scroll for menu links
    document.querySelectorAll('.scroll-to-section a[href*="#"]:not([href="#"])').forEach(function (anchor) {
        anchor.addEventListener('click', function (event) {
            event.preventDefault();
            var targetId = this.getAttribute('href').split('#')[1];
            var target = document.getElementById(targetId);

            if (target) {
                var width = window.innerWidth;
                if (width < 991) {
                    document.querySelector('.menu-trigger').classList.remove('active');
                    document.querySelector('.header-area .nav').classList.remove('active');
                }

                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Smooth scroll on document ready
    function onScroll(event) {
        var scrollPos = document.documentElement.scrollTop || document.body.scrollTop;
        document.querySelectorAll('.nav a').forEach(function (link) {
            var currLink = link;
            var refElement = document.querySelector(currLink.getAttribute("href"));
            if (refElement) { // Add this check to ensure refElement is not null
                if (refElement.offsetTop <= scrollPos && (refElement.offsetTop + refElement.offsetHeight > scrollPos)) {
                    document.querySelectorAll('.nav ul li a').forEach(function (link) {
                        link.classList.remove("active");
                    });
                    currLink.classList.add("active");
                } else {
                    currLink.classList.remove("active");
                }
            }
        });
    }

    document.addEventListener("scroll", onScroll);

    //smoothscroll
    document.querySelectorAll('.scroll-to-section a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.removeEventListener("scroll", onScroll);

            document.querySelectorAll('.scroll-to-section a').forEach(function (link) {
                link.classList.remove('active');
            });
            this.classList.add('active');

            var target = document.querySelector(this.hash);
            window.scrollTo({
                top: target.offsetTop - 79,
                behavior: 'smooth'
            });

            window.location.hash = this.hash;
            document.addEventListener("scroll", onScroll);
        });
    });

    // Page loading animation
    window.addEventListener('load', function () {
        if (document.querySelector('.cover')) {
            $('.cover').parallax({
                imageSrc: document.querySelector('.cover').dataset.image,
                zIndex: '1'
            });
        }

        var preloader = document.getElementById("preloader");
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(function () {
                preloader.style.visibility = 'hidden';
                preloader.style.display = 'none';
            }, 600);
        }
    });

});
