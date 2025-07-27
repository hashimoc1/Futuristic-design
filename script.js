document.addEventListener('DOMContentLoaded', function() {
    // Preloader Animation
    const loader = document.getElementById('loader');
    const progressBar = document.querySelector('.progress-bar');
    const mainContent = document.getElementById('main-content');
    
    // Simulate loading progress
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 10;
        progressBar.style.width = `${Math.min(progress, 100)}%`;
        
        if (progress >= 100) {
            clearInterval(loadingInterval);
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                    mainContent.style.opacity = '1';
                    
                    // Initialize all animations and effects after loading
                    initAnimations();
                    initHologram();
                    initGallery();
                    initNavigation();
                    initForm();
                    initSecretModal();
                    initParticles();
                    initStatsCounter();
                }, 1000);
            }, 500);
        }
    }, 100);
    
    // Initialize all animations
    function initAnimations() {
        // GSAP animations
        gsap.from('.hero-title span', {
            duration: 1,
            y: 50,
            opacity: 0,
            stagger: 0.2,
            ease: 'power3.out'
        });
        
        gsap.from('.hero-subtitle', {
            duration: 1,
            y: 30,
            opacity: 0,
            delay: 0.6,
            ease: 'power3.out'
        });
        
        gsap.from('.cyber-button', {
            duration: 1,
            y: 30,
            opacity: 0,
            delay: 0.9,
            ease: 'power3.out'
        });
        
        gsap.from('.hero-hologram', {
            duration: 1.5,
            x: 100,
            opacity: 0,
            delay: 0.3,
            ease: 'power3.out'
        });
        
        gsap.from('.grid-line', {
            duration: 1.5,
            scaleY: 0,
            opacity: 0,
            stagger: 0.1,
            ease: 'power3.out'
        });
    }
    
    // Initialize 3D Hologram
    function initHologram() {
        const container = document.getElementById('hologram-container');
        
        // Basic Three.js setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);
        
        // Add hologram effect
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshPhongMaterial({
            color: 0x6e00ff,
            emissive: 0x6e00ff,
            specular: 0x00f0ff,
            shininess: 100,
            transparent: true,
            opacity: 0.8,
            wireframe: true
        });
        
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);
        
        // Add lights
        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);
        
        const pointLight = new THREE.PointLight(0x00f0ff, 1, 100);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);
        
        const pointLight2 = new THREE.PointLight(0x6e00ff, 1, 100);
        pointLight2.position.set(-5, -5, -5);
        scene.add(pointLight2);
        
        camera.position.z = 3;
        
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            
            sphere.rotation.x += 0.005;
            sphere.rotation.y += 0.01;
            
            renderer.render(scene, camera);
        }
        
        animate();
        
        // Handle resize
        window.addEventListener('resize', () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });
    }
    
    // Initialize Gallery
    function initGallery() {
        const galleryGrid = document.querySelector('.gallery-grid');
        const galleryViewer = document.getElementById('gallery-viewer');
        const viewerImage = document.querySelector('.viewer-image');
        const viewerClose = document.querySelector('.viewer-close');
        const viewerPrev = document.querySelector('.viewer-prev');
        const viewerNext = document.querySelector('.viewer-next');
        
        // Sample gallery images (replace with actual images)
        const galleryImages = [
            'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ];
        
        // Create gallery items
        galleryImages.forEach((img, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `<img src="${img}" alt="Gallery Image ${index + 1}">`;
            galleryGrid.appendChild(galleryItem);
            
            // Add click event to open viewer
            galleryItem.addEventListener('click', () => {
                openViewer(index);
            });
        });
        
        // Open viewer function
        function openViewer(index) {
            viewerImage.src = galleryImages[index];
            galleryViewer.classList.add('active');
            currentIndex = index;
        }
        
        // Close viewer
        viewerClose.addEventListener('click', () => {
            galleryViewer.classList.remove('active');
        });
        
        // Navigation between images
        let currentIndex = 0;
        
        viewerPrev.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
            viewerImage.src = galleryImages[currentIndex];
        });
        
        viewerNext.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % galleryImages.length;
            viewerImage.src = galleryImages[currentIndex];
        });
        
        // Close viewer when clicking outside image
        galleryViewer.addEventListener('click', (e) => {
            if (e.target === galleryViewer) {
                galleryViewer.classList.remove('active');
            }
        });
    }
    
    // Initialize Navigation
    function initNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const navIndicator = document.querySelector('.nav-indicator');
        const sections = document.querySelectorAll('section');
        const exploreBtn = document.getElementById('explore-btn');
        
        // Set initial active link
        setActiveLink(0);
        
        // Update nav indicator position
        function setActiveLink(index) {
            const activeLink = navLinks[index];
            navIndicator.style.width = `${activeLink.offsetWidth}px`;
            navIndicator.style.left = `${activeLink.offsetLeft}px`;
            
            // Update active class
            navLinks.forEach(link => link.classList.remove('active'));
            activeLink.classList.add('active');
        }
        
        // Handle nav link clicks
        navLinks.forEach((link, index) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                setActiveLink(index);
                
                // Scroll to section
                sections[index].scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
        
        // Handle explore button click
        exploreBtn.addEventListener('click', () => {
            setActiveLink(1);
            sections[1].scrollIntoView({
                behavior: 'smooth'
            });
        });
        
        // Update nav on scroll
        window.addEventListener('scroll', () => {
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (pageYOffset >= sectionTop - 200) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === currentSection) {
                    link.classList.add('active');
                    
                    // Update indicator
                    navIndicator.style.width = `${link.offsetWidth}px`;
                    navIndicator.style.left = `${link.offsetLeft}px`;
                }
            });
        });
    }
    
    // Initialize Form
    function initForm() {
        const form = document.querySelector('.cyber-form');
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', { name, email, message });
            
            // Show success message
            alert('Message sent successfully!');
            form.reset();
        });
    }
    
    // Initialize Secret Modal
    function initSecretModal() {
        const secretBtn = document.getElementById('secret-btn');
        const secretModal = document.getElementById('secret-modal');
        const modalClose = document.querySelector('.modal-close');
        
        secretBtn.addEventListener('click', () => {
            secretModal.classList.add('active');
        });
        
        modalClose.addEventListener('click', () => {
            secretModal.classList.remove('active');
        });
        
        // Close modal when clicking outside
        secretModal.addEventListener('click', (e) => {
            if (e.target === secretModal) {
                secretModal.classList.remove('active');
            }
        });
    }
    
    // Initialize Particles
    function initParticles() {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#6e00ff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#6e00ff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }
    
    // Initialize Stats Counter
    function initStatsCounter() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000; // Animation duration in ms
            const step = target / (duration / 16); // 60fps
            
            let current = 0;
            
            const counter = setInterval(() => {
                current += step;
                stat.textContent = Math.floor(current);
                
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(counter);
                }
            }, 16);
        });
    }
});