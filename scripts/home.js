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
            title: "Lakshmi Villa Renovation",
            category: "Residential Renovation",
            images: [
                "assets/projects/project-1.webp",
                "assets/projects/project-1-1.webp",
                "assets/projects/project-1-2.webp"
            ],
            description:
                "Complete renovation of a 3-bedroom independent home in Mysuru. The project involved modernizing interiors, upgrading plumbing & electrical work, and adding a new modular kitchen.",
            client: "Mr. Ramesh",
            location: "Mysuru City",
            completed: "March 2024",
            value: "₹12 Lakhs",
        },
        2: {
            title: "Srinivas Individual Home",
            category: "Residential New Build",
            images: ["assets/projects/project-2.webp"],
            description:
                "Construction of a double-storey 3-bedroom house in a suburban area near Bengaluru, designed for a small family with basic amenities and a small garden.",
            client: "Mr. Srinivas",
            location: "Hoskote, Bengaluru Rural",
            completed: "January 2024",
            value: "₹18 Lakhs",
        },
        3: {
            title: "Rajesh Office Space Renovation",
            category: "Residential New Build",
            images: ["assets/projects/project-3.webp"],
            description:
                "Construction of a 3-bedroom house.",
            client: "Rajesh Enterprises",
            location: "Hubli",
            completed: "December 2023",
            value: "₹10 Lakhs",
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

                // Animate overlay fade-in
                gsap.fromTo(projectModal, { opacity: 0 }, {
                    opacity: 1,
                    duration: 0.6,
                    ease: "power2.out"
                });

                // Animate content zoom in from center
                gsap.fromTo(projectModalContent, {
                    scale: 0.9,
                    opacity: 0,
                    transformOrigin: "center center"
                }, {
                    scale: 1,
                    opacity: 1,
                    duration: 0.65,
                    ease: "power2.out"
                });

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

        // gsap.to(projectModalContent, {
        //     scale: 0.9,
        //     opacity: 0,
        //     duration: 0.2,
        //     ease: "power2.in",
        //     onComplete: () => {
        //         gsap.to(projectModal, {
        //             opacity: 0,
        //             duration: 0.2,
        //             ease: "power2.in",
        //             onComplete: () => {
        //                 projectModal.classList.add("hidden");
        //                 projectModal.classList.remove("flex");
        //             }
        //         });
        //     }
        // });
    });


    // Close modal when clicking outside
    projectModal.addEventListener("click", function (e) {
        if (e.target === projectModal) {
            // projectModal.classList.add("hidden");
            // projectModal.classList.remove("flex");

            gsap.to(projectModalContent, {
                scale: 0.8,
                opacity: 0,
                duration: 0.6,
                ease: "power2.in",
                onComplete: () => {
                    gsap.to(projectModal, {
                        opacity: 0,
                        duration: 0.6,
                        ease: "power2.in",
                        onComplete: () => {
                            projectModal.classList.add("hidden");
                            projectModal.classList.remove("flex");
                        }
                    });
                }
            });
        }
    });

});