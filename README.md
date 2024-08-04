# TeaFusion
Welcome to the TeaFusion website repository! This project is a full-featured, mobile-first web application designed to provide users with information about TeaFusion Cafe, including the menu, contact details, and an online ordering system.

# Project Overview
The TeaFusion website is a modern, responsive web application that showcases the cafe's offerings and allows customers to place online orders. The website includes sections such as Home, About Us, Menu, Contact Us, and an Online Order page. It is designed to be mobile-first, ensuring a seamless experience across devices.

# Features
Smooth Scrolling: Navigate through sections with smooth transitions.
Responsive Design: Mobile-first design with a responsive layout for all devices.
Interactive Menu: Users can view the menu, read descriptions, and access online ordering links.
Cart Functionality: Add, update, and remove items in the cart, with real-time updates to total prices.
Tax and Discount Calculation: Estimate tax based on ZIP code and apply discount codes.
Fun Fact Feature: Fetch and display random tea-related facts.
AJAX Implementation: Asynchronous requests for reservation forms, tax estimates, discount validation, and fun facts.
ES6 Modules: Organized and modern JavaScript codebase.

# Installation
To set up the project locally, follow these steps:
Clone the Repository:

bash
Copy code
git clone https://github.com/username/teafusion-website.git
Navigate to the Project Directory:

bash
Copy code
cd teafusion-website
Open the Project in Your Preferred Code Editor.

# Host the Files:

Use a local server to host the files for development and testing. You can use tools like XAMPP, WAMP, or a simple Python HTTP server.
Usage
Open the Project in a Browser:

Launch the website by opening index.html in your preferred web browser.
Navigate Through the Sections:

Use the navigation menu to explore different sections of the website, such as Home, About Us, Menu, and Contact Us.
Try the Online Order Page:

Click on the Online Order link to explore the menu, add items to the cart, estimate tax, apply discounts, and proceed to checkout.
Interact with Features:

Enjoy smooth scrolling, interactive elements, and responsive design across devices.

# Code Structure
Here's an overview of the project's folder structure:

css
Copy code
teafusion-website/
│
├── assets/
│   ├── css/
│   │   ├── bootstrap.min.css
│   │   ├── font-awesome.css
│   │   ├── owl-carousel.css
│   │   ├── lightbox.css
│   │   ├── teafusion.css
│   │   └── online-order.css
│   │
│   ├── js/
│   │   ├── jquery-2.1.0.min.js
│   │   ├── bootstrap.min.js
│   │   ├── owl-carousel.js
│   │   ├── lightbox.js
│   │   ├── teafusion.js
│   │   ├── reservation.js
│   │   └── online-order.js
│   │
│   ├── images/
│   │   ├── teafusion-logo.png
│   │   ├── menu-item-01.jpg
│   │   ├── menu-item-02.jpg
│   │   ├── ... (additional images)
│   │   └── menu-item-06.jpg
│   │
│   ├── data/
│   │   ├── discounts.json
│   │   └── facts.json
│   │
├── index.html
├── online-order.html
└── README.md

# JavaScript Functionality
teafusion.js
Header Background Scroll: Changes the header's background color based on scroll position for better visibility.
Menu Dropdown Toggle: Manages the mobile menu visibility with a hamburger icon.
Slider Initialization: Configures and initializes the slick slider for the homepage banner.
Tab Initialization: Sets up interactive tabs for different sections.
Owl Carousel: Initializes the owl carousel for the menu section.
Reservation AJAX: Handles form submission using AJAX for seamless reservations.
Scroll Animation: Integrates scroll animations for elements appearing in view.
Smooth Scrolling: Smoothly scrolls to sections when clicking navigation links.
Preloader Animation: Displays a loading animation until all content is ready.
reservation.js
Reservation Class: Implements an ES6 class to manage reservation details.
Submit Method: Sends reservation data to the server using AJAX.
online-order.js
Cart Management: Adds, updates, and removes items from the shopping cart.
Tax Estimation: Fetches tax rates based on ZIP code using AJAX.
Discount Application: Validates and applies discount codes.
Fun Fact Fetching: Retrieves random tea facts via AJAX.
Tab Navigation: Controls tab functionality on the online order page.

# CSS Styling
The teafusion.css file handles the overall styling of the website. Here's a brief summary of its key components:

Global Styles
Fonts and Layout: Sets the base font family to Poppins and applies global styling for a clean and modern look.
Header
Fixed Header: Ensures the header remains at the top while scrolling.
Navigation Menu: Styles the main navigation, including the mobile hamburger menu.
Top (Banner)
Hero Section: Styles the hero section with background images and text overlay.
About Us
Content and Styling: Styles the about us section with unique pseudo-elements and text formatting.
Menu
Menu Cards: Styles the menu cards with hover effects and transitions.
Carousel: Manages the styling for the carousel of menu items.
Contact
Form Styling: Styles the contact form and reservation table with input fields and placeholders.
Table Design: Creates an elegant design for the opening hours table.
Footer
Social Icons: Styles social media icons and footer content for a consistent look.
Responsive Design
Media Queries: Implements media queries for mobile-first design, ensuring responsive behavior across devices.

# Acknowledgments
Icons: Font Awesome for social media icons.
API: API Ninjas for tax estimation and facts.
Libraries: jQuery, Bootstrap, Owl Carousel, Slick Slider.
