document.addEventListener("DOMContentLoaded", function () {

    // Back to Top Button
    const backToTopButton = document.getElementById("back-to-top");
    window.addEventListener("scroll", function () {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.remove("hidden");
        } else {
            backToTopButton.classList.add("hidden");
        }
    });
    backToTopButton.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
    // Counter Animation
    const counters = document.querySelectorAll(".counter-value");
    const counterObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute("data-target"));
                    let count = 0;
                    const updateCount = () => {
                        const increment = target / 100;
                        if (count < target) {
                            count += increment;
                            counter.innerText = Math.ceil(count);
                            setTimeout(updateCount, 10);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCount();
                    observer.unobserve(counter);
                }
            });
        },
        { threshold: 0.5 },
    );
    counters.forEach((counter) => {
        counterObserver.observe(counter);
    });
    // Service Expand/Collapse
    const serviceExpandButtons = document.querySelectorAll(".service-expand-btn");
    serviceExpandButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const targetId = this.getAttribute("data-target");
            const detailsElement = document.getElementById(targetId);
            if (detailsElement.classList.contains("hidden")) {
                detailsElement.classList.remove("hidden");
                this.innerHTML = 'Show Less <i class="ri-arrow-up-line ml-1"></i>';
            } else {
                detailsElement.classList.add("hidden");
                this.innerHTML = 'Learn More <i class="ri-arrow-right-line ml-1"></i>';
            }
        });
    });
    // Project Filtering
    const projectFilters = document.querySelectorAll(".project-filter");
    const projectCards = document.querySelectorAll(".project-card");
    projectFilters.forEach((filter) => {
        filter.addEventListener("click", function () {
            // Update active filter
            projectFilters.forEach((f) =>
                f.classList.remove("bg-primary", "text-white"),
            );
            this.classList.add("bg-primary", "text-white");
            const filterValue = this.getAttribute("data-filter");
            projectCards.forEach((card) => {
                if (
                    filterValue === "all" ||
                    card.getAttribute("data-category") === filterValue
                ) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
    // Project Modal
    const projectDetailsBtns = document.querySelectorAll(".project-details-btn");
    const projectModal = document.getElementById("project-modal");
    const closeModalBtn = document.getElementById("close-modal");
    const projectModalContent = document.querySelector(".project-modal-content");
    // Project details data
    const projectDetails = {
        1: {
            title: "Oceanview Luxury Residence",
            category: "Residential",
            images: [
                "./assets/interiors/image-1.png",
            ],
            description:
                "This 6,500 square foot luxury residence features 5 bedrooms, 6.5 bathrooms, and panoramic ocean views. The project incorporated sustainable building practices, energy-efficient systems, and smart home technology throughout. Custom features include a chef's kitchen with premium appliances, a home theater, wine cellar, and an infinity pool overlooking the ocean.",
            client: "Richardson Family",
            location: "Coastal Heights, CA",
            completed: "June 2024",
            value: "$4.2 Million",
        },
        2: {
            title: "Horizon Corporate Center",
            category: "Commercial",
            images: [
                "./assets/interiors/image-1.png",
            ],
            description:
                "The Horizon Corporate Center is a 12-story, 250,000 square foot LEED Gold certified office building. The project features a striking glass facade, energy-efficient systems, and state-of-the-art amenities including a rooftop garden, fitness center, and conference facilities. The building incorporates sustainable design elements such as rainwater harvesting, solar panels, and high-efficiency HVAC systems.",
            client: "Horizon Enterprises",
            location: "Downtown Metropolitan",
            completed: "March 2023",
            value: "$78 Million",
        },
        3: {
            title: "Riverfront Bridge Project",
            category: "Infrastructure",
            images: [
                "./assets/interiors/image-1.png",
            ],
            description:
                "This 750-foot cable-stayed bridge connects two previously separated communities across the river. The project includes four vehicle lanes, dedicated bike lanes, and pedestrian walkways with scenic overlooks. The bridge features architectural lighting, public art installations, and viewing platforms. The design prioritized environmental protection of the river ecosystem during construction.",
            client: "Metropolitan Transportation Authority",
            location: "Riverfront District",
            completed: "November 2022",
            value: "$95 Million",
        },
        4: {
            title: "Parkside Shopping Plaza",
            category: "Commercial",
            images: [
                "./assets/interiors/image-1.png",
            ],
            description:
                "Parkside Shopping Plaza is a 125,000 square foot open-air retail center featuring 35 stores, restaurants, and entertainment venues. The project includes a central plaza with water features, outdoor seating areas, and event space. The design incorporates sustainable elements such as permeable paving, native landscaping, and energy-efficient lighting throughout the property.",
            client: "Parkside Development Group",
            location: "Eastside District",
            completed: "May 2023",
            value: "$42 Million",
        },
        5: {
            title: "The Residences at Westpark",
            category: "Residential",
            images: [
                "./assets/interiors/image-1.png",
            ],
            description:
                "The Residences at Westpark is a 200-unit luxury apartment complex featuring a mix of one, two, and three-bedroom units. The project includes resort-style amenities such as a pool with cabanas, fitness center, clubhouse, and dog park. The buildings incorporate energy-efficient design, smart home features, and high-end finishes throughout. The development also includes walking trails and preserved green space.",
            client: "Westpark Properties",
            location: "Westpark District",
            completed: "August 2023",
            value: "$65 Million",
        },
        6: {
            title: "Riverside Community Park",
            category: "Infrastructure",
            images: [
                "./assets/interiors/image-1.png",
            ],
            description:
                "Riverside Community Park is a 25-acre public recreation space featuring sports facilities, walking trails, and sustainable landscaping. The project includes baseball fields, basketball and tennis courts, a playground, picnic areas, and an amphitheater for community events. The park incorporates green infrastructure such as rain gardens, native plantings, and permeable surfaces to manage stormwater and enhance the natural environment.",
            client: "City Parks Department",
            location: "Riverside District",
            completed: "April 2024",
            value: "$18 Million",
        },
    };
    projectDetailsBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            const projectId = this.getAttribute("data-project");
            const project = projectDetails[projectId];
            if (project) {
                let imagesHtml = "";
                project.images.forEach((img, index) => {
                    imagesHtml += `<div class="project-slide ${index === 0 ? "block" : "hidden"}">
      <img src="${img}" alt="${project.title}" class="w-full h-auto rounded-t-lg">
      </div>`;
                });
                let dotsHtml = "";
                project.images.forEach((_, index) => {
                    dotsHtml += `<button class="project-dot w-3 h-3 rounded-full ${index === 0 ? "bg-primary" : "bg-gray-300"} mx-1"></button>`;
                });
                projectModalContent.innerHTML = `
      <div class="relative mb-4">
      ${imagesHtml}
      <div class="absolute top-1/2 left-4 transform -translate-y-1/2">
      <button class="w-10 h-10 bg-white/70 rounded-full flex items-center justify-center text-gray-800 hover:bg-white transition-colors project-prev">
      <i class="ri-arrow-left-s-line ri-lg"></i>
      </button>
      </div>
      <div class="absolute top-1/2 right-4 transform -translate-y-1/2">
      <button class="w-10 h-10 bg-white/70 rounded-full flex items-center justify-center text-gray-800 hover:bg-white transition-colors project-next">
      <i class="ri-arrow-right-s-line ri-lg"></i>
      </button>
      </div>
      <div class="absolute bottom-4 left-0 right-0 flex justify-center">
      ${dotsHtml}
      </div>
      </div>
      <div class="p-6">
      <h3 class="text-2xl font-semibold text-gray-800 mb-2">${project.title}</h3>
      <div class="flex items-center mb-4">
      <span class="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full">${project.category}</span>
      </div>
      <p class="text-gray-600 mb-6">${project.description}</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
      <div class="flex items-start">
      <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1">
      <i class="ri-user-line text-primary"></i>
      </div>
      <div>
      <h4 class="font-medium text-gray-800">Client</h4>
      <p>${project.client}</p>
      </div>
      </div>
      <div class="flex items-start">
      <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1">
      <i class="ri-map-pin-line text-primary"></i>
      </div>
      <div>
      <h4 class="font-medium text-gray-800">Location</h4>
      <p>${project.location}</p>
      </div>
      </div>
      <div class="flex items-start">
      <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1">
      <i class="ri-calendar-check-line text-primary"></i>
      </div>
      <div>
      <h4 class="font-medium text-gray-800">Completed</h4>
      <p>${project.completed}</p>
      </div>
      </div>
      <div class="flex items-start">
      <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1">
      <i class="ri-money-dollar-circle-line text-primary"></i>
      </div>
      <div>
      <h4 class="font-medium text-gray-800">Project Value</h4>
      <p>${project.value}</p>
      </div>
      </div>
      </div>
      </div>
      `;
                projectModal.classList.remove("hidden");
                projectModal.classList.add("flex");
                // Initialize project slider
                const projectSlides = document.querySelectorAll(".project-slide");
                const projectDots = document.querySelectorAll(".project-dot");
                const projectPrev = document.querySelector(".project-prev");
                const projectNext = document.querySelector(".project-next");
                let currentSlide = 0;
                const showSlide = (index) => {
                    projectSlides.forEach((slide) => slide.classList.add("hidden"));
                    projectDots.forEach((dot) => dot.classList.remove("bg-primary"));
                    projectDots.forEach((dot) => dot.classList.add("bg-gray-300"));
                    projectSlides[index].classList.remove("hidden");
                    projectDots[index].classList.remove("bg-gray-300");
                    projectDots[index].classList.add("bg-primary");
                };
                projectPrev.addEventListener("click", () => {
                    currentSlide =
                        (currentSlide - 1 + projectSlides.length) % projectSlides.length;
                    showSlide(currentSlide);
                });
                projectNext.addEventListener("click", () => {
                    currentSlide = (currentSlide + 1) % projectSlides.length;
                    showSlide(currentSlide);
                });
                projectDots.forEach((dot, index) => {
                    dot.addEventListener("click", () => {
                        currentSlide = index;
                        showSlide(currentSlide);
                    });
                });
            }
        });
    });
    closeModalBtn.addEventListener("click", function () {
        projectModal.classList.add("hidden");
        projectModal.classList.remove("flex");
    });
    // Close modal when clicking outside
    projectModal.addEventListener("click", function (e) {
        if (e.target === projectModal) {
            projectModal.classList.add("hidden");
            projectModal.classList.remove("flex");
        }
    });
    // Testimonial Slider
    const testimonialSlider = document.querySelector(".testimonial-slider");
    const testimonialSlides = document.querySelector(".testimonial-slides");
    const testimonialItems = document.querySelectorAll(".testimonial-slide");
    const prevButton = document.getElementById("prev-testimonial");
    const nextButton = document.getElementById("next-testimonial");
    const dots = document.querySelectorAll("#testimonial-dots button");
    let currentIndex = 0;
    let slideWidth;
    let slidesToShow;
    const updateSlidesToShow = () => {
        if (window.innerWidth < 768) {
            slidesToShow = 1;
        } else if (window.innerWidth < 1024) {
            slidesToShow = 2;
        } else {
            slidesToShow = 3;
        }
        slideWidth = testimonialSlider.clientWidth / slidesToShow;
        updateSlider();
    };
    const updateSlider = () => {
        testimonialItems.forEach((slide) => {
            slide.style.minWidth = `${slideWidth}px`;
        });
        testimonialSlides.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.remove("bg-primary", "dot-active");
            dot.classList.add("bg-gray-300");
        });
        const activeDotIndex = Math.floor(currentIndex / slidesToShow);
        if (dots[activeDotIndex]) {
            dots[activeDotIndex].classList.remove("bg-gray-300");
            dots[activeDotIndex].classList.add("bg-primary", "dot-active");
        }
    };
    prevButton.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });
    nextButton.addEventListener("click", () => {
        if (currentIndex < testimonialItems.length - slidesToShow) {
            currentIndex++;
            updateSlider();
        }
    });
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            currentIndex = index * slidesToShow;
            if (currentIndex > testimonialItems.length - slidesToShow) {
                currentIndex = testimonialItems.length - slidesToShow;
            }
            updateSlider();
        });
    });
    // Initialize slider
    updateSlidesToShow();
    // Update on window resize
    window.addEventListener("resize", updateSlidesToShow);
    // Form Validation
    const contactForm = document.getElementById("contact-form");
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const projectType = document.getElementById("project-type").value;
        const message = document.getElementById("message").value;
        const consent = document.getElementById("consent").checked;
        let isValid = true;
        // Simple validation
        if (!name) {
            isValid = false;
            document.getElementById("name").classList.add("border-red-500");
        } else {
            document.getElementById("name").classList.remove("border-red-500");
        }
        if (!email || !email.includes("@")) {
            isValid = false;
            document.getElementById("email").classList.add("border-red-500");
        } else {
            document.getElementById("email").classList.remove("border-red-500");
        }
        if (!phone) {
            isValid = false;
            document.getElementById("phone").classList.add("border-red-500");
        } else {
            document.getElementById("phone").classList.remove("border-red-500");
        }
        if (!projectType) {
            isValid = false;
            document.getElementById("project-type").classList.add("border-red-500");
        } else {
            document
                .getElementById("project-type")
                .classList.remove("border-red-500");
        }
        if (!message) {
            isValid = false;
            document.getElementById("message").classList.add("border-red-500");
        } else {
            document.getElementById("message").classList.remove("border-red-500");
        }
        if (!consent) {
            isValid = false;
            document.querySelector(".checkmark").classList.add("border-red-500");
        } else {
            document.querySelector(".checkmark").classList.remove("border-red-500");
        }
        if (isValid) {
            // In a real implementation, this would submit to a server
            alert("Thank you for your message! We will contact you soon.");
            contactForm.reset();
        }
    });
});