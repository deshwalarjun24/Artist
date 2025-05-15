// Artistic Portfolio JavaScript

// Custom cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

document.addEventListener('mousemove', function(e) {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
    
    // Add a slight delay to the outline for a trailing effect
    setTimeout(() => {
        cursorOutline.style.left = e.clientX + 'px';
        cursorOutline.style.top = e.clientY + 'px';
    }, 50);
});

// Make cursor bigger on clickable elements
const clickables = document.querySelectorAll('a, button, .filter-btn, .view-project, .social-link, .dot');
clickables.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursorOutline.style.width = '60px';
        cursorOutline.style.height = '60px';
        cursorOutline.style.borderColor = 'var(--color-secondary)';
        cursorDot.style.backgroundColor = 'transparent';
    });
    
    element.addEventListener('mouseleave', () => {
        cursorOutline.style.width = '40px';
        cursorOutline.style.height = '40px';
        cursorOutline.style.borderColor = 'var(--color-secondary)';
        cursorDot.style.backgroundColor = 'var(--color-secondary)';
    });
});

// Mobile Navigation Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Portfolio Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get filter value
        const filterValue = button.getAttribute('data-filter');
        
        // Filter portfolio items
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 200);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 500);
            }
        });
    });
});

// Testimonial Slider
const testimonialTrack = document.querySelector('.testimonial-track');
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dots = document.querySelectorAll('.dot');

let currentSlide = 0;
const slideWidth = 100; // 100%

// Set initial position
testimonialTrack.style.transform = `translateX(0%)`;

// Update slider position
function updateSlider() {
    testimonialTrack.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
    
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Next slide
nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % testimonialSlides.length;
    updateSlider();
});

// Previous slide
prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
    updateSlider();
});

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlider();
    });
});

// Auto slide (optional)
let slideInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % testimonialSlides.length;
    updateSlider();
}, 5000);

// Pause auto slide on hover
testimonialTrack.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

testimonialTrack.addEventListener('mouseleave', () => {
    slideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        updateSlider();
    }, 5000);
});

// Project Modal
const viewProjectLinks = document.querySelectorAll('.view-project');
const projectModal = document.querySelector('.project-modal');
const modalClose = document.querySelector('.modal-close');
const modalBody = document.querySelector('.modal-body');

// Sample project data (in a real project, this would come from a database or API)
const projectData = [
    {
        title: 'Chromatic Dreams',
        category: 'Painting',
        date: '2024',
        medium: 'Oil on Canvas',
        dimensions: '36" x 48"',
        description: 'An exploration of color theory and emotional expression through abstract forms. This piece uses a vibrant palette to evoke feelings of joy and contemplation.',
        process: 'Created over a period of three months, this painting evolved through multiple layers and techniques. The initial concept was inspired by a dream sequence, which was then translated into visual language through color and texture.',
        images: [
            'https://images.unsplash.com/photo-1549887552-cb1071d3e5ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80',
            'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1058&q=80',
            'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80'
        ]
    },
    {
        title: 'Digital Metamorphosis',
        category: 'Digital Art',
        date: '2023',
        medium: 'Digital Illustration',
        dimensions: 'Variable',
        description: 'A digital artwork exploring themes of transformation and technology. This piece blends organic forms with digital elements to create a commentary on our evolving relationship with technology.',
        process: 'Created using a combination of digital painting techniques and procedural generation. The work began as a series of sketches that were then developed digitally, incorporating elements of randomness and algorithmic design.',
        images: [
            'https://images.unsplash.com/photo-1619410283995-43d9134e7656?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
            'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
            'https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        ]
    },
    {
        title: 'Textural Symphony',
        category: 'Mixed Media',
        date: '2024',
        medium: 'Mixed Media on Canvas',
        dimensions: '24" x 36"',
        description: 'A tactile exploration of texture and form, this mixed media piece incorporates various materials to create a rich, multi-dimensional surface that invites touch and close inspection.',
        process: 'This piece was created through a process of layering various materials including acrylic paint, paper, fabric, and found objects. Each layer was carefully built up and manipulated to create a complex interplay of textures and colors.',
        images: [
            'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=745&q=80',
            'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
            'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80'
        ]
    }
];

// Open modal with project details
viewProjectLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Get project data (in a real project, you would match this to the actual project)
        const project = projectData[index % projectData.length];
        
        // Populate modal content
        modalBody.innerHTML = `
            <div class="project-details">
                <div class="project-gallery">
                    <div class="main-image">
                        <img src="${project.images[0]}" alt="${project.title}">
                    </div>
                    <div class="thumbnail-gallery">
                        ${project.images.map(img => `
                            <div class="thumbnail">
                                <img src="${img}" alt="${project.title} detail">
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="project-info">
                    <h2>${project.title}</h2>
                    <div class="project-meta">
                        <div class="meta-item">
                            <span class="meta-label">Category:</span>
                            <span class="meta-value">${project.category}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Date:</span>
                            <span class="meta-value">${project.date}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Medium:</span>
                            <span class="meta-value">${project.medium}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Dimensions:</span>
                            <span class="meta-value">${project.dimensions}</span>
                        </div>
                    </div>
                    <div class="project-description">
                        <h3>Description</h3>
                        <p>${project.description}</p>
                    </div>
                    <div class="project-process">
                        <h3>Process</h3>
                        <p>${project.process}</p>
                    </div>
                </div>
            </div>
        `;
        
        // Show modal
        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        // Add thumbnail click functionality
        setTimeout(() => {
            const thumbnails = document.querySelectorAll('.thumbnail img');
            const mainImage = document.querySelector('.main-image img');
            
            thumbnails.forEach(thumb => {
                thumb.addEventListener('click', () => {
                    mainImage.src = thumb.src;
                    
                    // Add active class to selected thumbnail
                    thumbnails.forEach(t => t.parentElement.classList.remove('active'));
                    thumb.parentElement.classList.add('active');
                });
            });
        }, 100);
    });
});

// Close modal
modalClose.addEventListener('click', () => {
    projectModal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Re-enable scrolling
});

// Close modal when clicking outside content
projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        projectModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Form validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Simulate form submission
        alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
        
        // Reset form
        contactForm.reset();
    });
}

// Function to preload images
function preloadImages(urls, allDone) {
    let loaded = 0;
    const toLoad = urls.length;
    
    // If no images to load, call the callback immediately
    if (toLoad === 0) {
        if (allDone) allDone();
        return;
    }
    
    // Set a timeout to ensure we don't wait forever
    const timeout = setTimeout(() => {
        console.log('Image preloading timed out');
        if (allDone) allDone();
    }, 10000); // 10 second timeout
    
    urls.forEach(url => {
        const img = new Image();
        img.onload = img.onerror = () => {
            loaded++;
            if (loaded === toLoad) {
                clearTimeout(timeout);
                if (allDone) allDone();
            }
        };
        img.src = url;
    });
}

// Mobile navigation toggle
function setupMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Make sure all content is visible immediately
document.addEventListener('DOMContentLoaded', () => {
    // Show loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background-color:#fff;display:flex;justify-content:center;align-items:center;z-index:9999;';
    loadingIndicator.innerHTML = '<div style="text-align:center;"><h2>Loading Content...</h2><p>Please wait while we load the images</p></div>';
    document.body.appendChild(loadingIndicator);
    
    // Collect all image URLs
    const imageUrls = [];
    document.querySelectorAll('img').forEach(img => {
        if (img.src) imageUrls.push(img.src);
    });
    
    // Add background images
    document.querySelectorAll('.artist-image').forEach(el => {
        const style = window.getComputedStyle(el);
        const bgImg = style.backgroundImage.replace(/url\(['"]?([^'"]*)['"]/g, '$1');
        if (bgImg && bgImg !== 'none') imageUrls.push(bgImg);
    });
    
    // Preload images then show content
    preloadImages(imageUrls, () => {
        // Remove loading indicator
        loadingIndicator.remove();
        
        // Now show all content
    // Make all elements visible by default
    const style = document.createElement('style');
    style.innerHTML = `
        .section-header, .about-content, .portfolio-item, .timeline-item, .testimonial-content {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
        }
        
        img {
            opacity: 1 !important;
        }
    `;
    document.head.appendChild(style);
    
    // Force all images to load properly
    document.querySelectorAll('img').forEach(img => {
        img.onerror = function() {
            // If image fails to load, replace with a placeholder
            this.src = 'https://via.placeholder.com/600x800?text=Image+Not+Available';
        };
    });
    
    // Handle window resize for responsive images
    function handleResize() {
        // Adjust portfolio image heights for consistency
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach(item => {
            const img = item.querySelector('img');
            if (img) {
                // Ensure image maintains aspect ratio but fills container
                if (window.innerWidth <= 768) {
                    img.style.height = 'auto';
                    img.style.maxHeight = '400px';
                } else {
                    img.style.height = '400px';
                }
            }
        });
    }
    
    // Initial call and add event listener
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Setup mobile navigation
    setupMobileNav();
    });
});
