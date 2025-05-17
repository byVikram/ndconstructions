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
                "https://readdy.ai/api/search-image?query=A%20luxurious%20modern%20home%20with%20ocean%20views%2C%20featuring%20contemporary%20architecture%20with%20large%20windows%2C%20open%20spaces%2C%20and%20premium%20finishes.%20The%20image%20shows%20the%20completed%20residence%20with%20beautiful%20landscaping%20and%20outdoor%20living%20areas%2C%20highlighting%20the%20high-end%20residential%20construction%20with%20attention%20to%20detail%20and%20quality%20craftsmanship.&width=800&height=500&seq=20&orientation=landscape",
                "https://readdy.ai/api/search-image?query=Interior%20of%20a%20luxury%20modern%20home%20showing%20an%20open%20concept%20living%20space%20with%20high%20ceilings%2C%20premium%20finishes%2C%20and%20large%20windows%20with%20ocean%20views.%20The%20image%20displays%20elegant%20furnishings%2C%20custom%20cabinetry%2C%20and%20high-end%20materials%20that%20showcase%20exceptional%20residential%20construction%20quality.&width=800&height=500&seq=21&orientation=landscape",
                "https://readdy.ai/api/search-image?query=Modern%20luxury%20home%20kitchen%20with%20premium%20appliances%2C%20custom%20cabinetry%2C%20and%20high-end%20finishes.%20The%20image%20shows%20a%20spacious%2C%20well-designed%20cooking%20and%20dining%20space%20with%20island%2C%20highlighting%20the%20quality%20craftsmanship%20in%20residential%20construction.&width=800&height=500&seq=22&orientation=landscape",
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
                "https://readdy.ai/api/search-image?query=A%20modern%2012-story%20commercial%20office%20building%20with%20glass%20facade%2C%20contemporary%20architecture%2C%20and%20professional%20landscaping.%20The%20image%20shows%20the%20completed%20corporate%20headquarters%20with%20distinctive%20design%20elements%2C%20highlighting%20the%20scale%20and%20quality%20of%20commercial%20construction.&width=800&height=500&seq=23&orientation=landscape",
                "https://readdy.ai/api/search-image?query=Modern%20corporate%20office%20lobby%20with%20high%20ceilings%2C%20reception%20desk%2C%20and%20contemporary%20design%20elements.%20The%20image%20shows%20a%20professional%2C%20welcoming%20entrance%20space%20with%20quality%20materials%20and%20finishes%20that%20represent%20excellence%20in%20commercial%20construction.&width=800&height=500&seq=24&orientation=landscape",
                "https://readdy.ai/api/search-image?query=Contemporary%20office%20interior%20with%20open%20workspace%20design%2C%20modern%20furnishings%2C%20and%20collaborative%20areas.%20The%20image%20shows%20a%20professional%20working%20environment%20with%20quality%20finishes%2C%20good%20lighting%2C%20and%20thoughtful%20space%20planning%20that%20represents%20excellence%20in%20commercial%20construction.&width=800&height=500&seq=25&orientation=landscape",
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
                "https://readdy.ai/api/search-image?query=A%20modern%20cable-stayed%20bridge%20spanning%20across%20a%20river%20with%20pedestrian%20walkways%20and%20bike%20lanes.%20The%20image%20shows%20the%20completed%20infrastructure%20project%20with%20impressive%20engineering%20features%20and%20architectural%20design%2C%20highlighting%20excellence%20in%20bridge%20construction.&width=800&height=500&seq=26&orientation=landscape",
                "https://readdy.ai/api/search-image?query=Close-up%20view%20of%20a%20modern%20bridge%20showing%20structural%20details%2C%20pedestrian%20walkways%2C%20and%20architectural%20lighting%20features.%20The%20image%20displays%20the%20quality%20engineering%20and%20construction%20of%20the%20infrastructure%20project%20with%20attention%20to%20both%20function%20and%20design.&width=800&height=500&seq=27&orientation=landscape",
                "https://readdy.ai/api/search-image?query=Aerial%20view%20of%20a%20cable-stayed%20bridge%20crossing%20a%20river%20and%20connecting%20communities%2C%20showing%20the%20full%20span%20and%20surrounding%20landscape.%20The%20image%20displays%20the%20scale%20and%20impact%20of%20the%20infrastructure%20project%20with%20both%20the%20bridge%20and%20its%20integration%20with%20surrounding%20areas%20visible.&width=800&height=500&seq=28&orientation=landscape",
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
                "https://readdy.ai/api/search-image?query=A%20modern%20open-air%20retail%20shopping%20center%20with%20attractive%20storefronts%2C%20pedestrian%20walkways%2C%20and%20landscaped%20areas.%20The%20image%20shows%20a%20completed%20commercial%20development%20with%20multiple%20retail%20spaces%2C%20restaurants%2C%20and%20entertainment%20venues%2C%20highlighting%20quality%20commercial%20construction.&width=800&height=500&seq=29&orientation=landscape",
                "https://readdy.ai/api/search-image?query=Interior%20view%20of%20a%20modern%20shopping%20mall%20showing%20retail%20spaces%2C%20common%20areas%2C%20and%20architectural%20features.%20The%20image%20displays%20quality%20finishes%2C%20good%20lighting%2C%20and%20thoughtful%20design%20that%20creates%20an%20inviting%20shopping%20environment.&width=800&height=500&seq=30&orientation=landscape",
                "https://readdy.ai/api/search-image?query=Outdoor%20plaza%20area%20of%20a%20shopping%20center%20with%20seating%2C%20landscaping%2C%20and%20gathering%20spaces.%20The%20image%20shows%20a%20well-designed%20community%20space%20that%20enhances%20the%20retail%20environment%20with%20attention%20to%20both%20function%20and%20aesthetics.&width=800&height=500&seq=31&orientation=landscape",
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
                "https://readdy.ai/api/search-image?query=A%20modern%20luxury%20apartment%20complex%20with%20multiple%20buildings%2C%20landscaped%20grounds%2C%20and%20resort-style%20amenities.%20The%20image%20shows%20a%20completed%20multi-family%20residential%20development%20with%20attractive%20architecture%20and%20outdoor%20spaces%2C%20highlighting%20quality%20in%20multi-family%20construction.&width=800&height=500&seq=32&orientation=landscape",
                "https://readdy.ai/api/search-image?query=Interior%20of%20a%20modern%20luxury%20apartment%20showing%20open%20concept%20living%20space%2C%20kitchen%2C%20and%20high-end%20finishes.%20The%20image%20displays%20quality%20materials%2C%20thoughtful%20design%2C%20and%20attention%20to%20detail%20in%20multi-family%20residential%20construction.&width=800&height=500&seq=33&orientation=landscape",
                "https://readdy.ai/api/search-image?query=Resort-style%20pool%20area%20of%20a%20luxury%20apartment%20complex%20with%20lounging%20areas%2C%20cabanas%2C%20and%20landscaping.%20The%20image%20shows%20the%20community%20amenities%20that%20enhance%20residential%20living%20with%20attention%20to%20both%20function%20and%20lifestyle%20features.&width=800&height=500&seq=34&orientation=landscape",
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
                "https://readdy.ai/api/search-image?query=A%20modern%20public%20park%20with%20walking%20paths%2C%20recreational%20areas%2C%20and%20landscaped%20green%20spaces.%20The%20image%20shows%20a%20completed%20community%20infrastructure%20project%20with%20sports%20facilities%2C%20seating%20areas%2C%20and%20natural%20elements%2C%20highlighting%20quality%20in%20public%20space%20development.&width=800&height=500&seq=35&orientation=landscape",
                "https://readdy.ai/api/search-image?query=Sports%20facilities%20in%20a%20public%20park%20showing%20courts%2C%20fields%2C%20and%20recreational%20equipment.%20The%20image%20displays%20well-designed%20active%20spaces%20that%20serve%20community%20needs%20with%20quality%20construction%20and%20attention%20to%20durability.&width=800&height=500&seq=36&orientation=landscape",
                "https://readdy.ai/api/search-image?query=Nature%20trail%20and%20landscaped%20areas%20in%20a%20public%20park%20showing%20walking%20paths%2C%20native%20plantings%2C%20and%20seating%20areas.%20The%20image%20shows%20the%20integration%20of%20natural%20and%20built%20elements%20that%20create%20a%20sustainable%20community%20space.&width=800&height=500&seq=37&orientation=landscape",
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