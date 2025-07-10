window.addEventListener('load', () => {
    gsap.registerPlugin(ScrollTrigger);

    // ===========================================
    // UTILITY FUNCTIONS
    // ===========================================

    const animateFrom = (targets, options) => {
        gsap.from(targets, {
            scrollTrigger: {
                trigger: options.trigger || targets,
                start: options.start || "top 80%",
                toggleActions: options.toggleActions || "play reverse play reverse",
            },
            ...options.props
        });
    };

    const splitTextToSpans = (element) => {
        const text = element.textContent;
        element.textContent = "";
        text.split("").forEach(char => {
            const span = document.createElement("span");
            span.textContent = char;
            element.appendChild(span);
        });
    };

    // ===========================================
    // HOME SECTION
    // ===========================================

    const homeHeader = document.getElementById("home-header");
    splitTextToSpans(homeHeader);

    animateFrom("#home-header", {
        trigger: "#home",
        props: {
            x: -100,
            opacity: 0,
            duration: 1.8,
            delay: 0.3,
            ease: "power2.out"
        }
    });

    animateFrom("#home-header span", {
        trigger: "#home",
        props: {
            opacity: 0,
            y: 20,
            duration: 0.1,
            ease: "power2.out",
            stagger: 0.05
        }
    });

    animateFrom("#home p", {
        trigger: "#home",
        props: {
            x: -80,
            opacity: 0,
            duration: 1.4,
            delay: 0.6,
            ease: "power2.out"
        }
    });

    animateFrom("#home .flex > a", {
        trigger: "#home",
        props: {
            y: 40,
            opacity: 0,
            duration: 1.2,
            delay: 0.5,
            stagger: 0.15,
            ease: "power2.out"
        }
    });

    // ===========================================
    // STATS SECTION
    // ===========================================

    gsap.utils.toArray("#stats-section .container .text-center").forEach(elem => {
        animateFrom(elem, {
            props: {
                y: 40,
                opacity: 0,
                duration: 1.2,
                ease: "power2.out"
            }
        });
    });

    gsap.utils.toArray(".counter-value").forEach(counter => {
        let target = +counter.getAttribute('data-target');
        let count = { val: 0 };

        gsap.timeline({
            scrollTrigger: {
                trigger: counter,
                start: "top 80%",
                toggleActions: "play none none none",
            }
        }).to(count, {
            val: target,
            duration: 2,
            ease: "power1.out",
            onUpdate: () => {
                counter.innerText = Math.floor(count.val);
            }
        });
    });

    // ===========================================
    // SERVICE SECTION
    // ===========================================

    console.log(document.querySelectorAll("#cta-section"));

    animateFrom(["#services h2", "#services .w-20", "#services-intro"], {
        trigger: "#services",
        props: {
            opacity: 0,
            duration: 1,
            delay: 0.3,
            ease: "power2.out",
            x: (i, el) => el.matches(".w-20") ? 80 : el.matches("h2") ? -80 : 0,
            y: (i, el) => el.matches("#services-intro") ? 50 : 0
        }
    });

    gsap.utils.toArray(".service-card").forEach((card, i) => {
        animateFrom(card, {
            props: {
                opacity: 0,
                duration: 1,
                delay: i * 0.3,
                ease: "power2.out"
            }
        });
    });

    gsap.utils.toArray(".service-expand-btn").forEach(btn => {
        btn.addEventListener("mouseenter", () => {
            gsap.to(btn, { scale: 1.1, duration: 0.3, ease: "power2.out" });
        });
        btn.addEventListener("mouseleave", () => {
            gsap.to(btn, { scale: 1, duration: 0.3, ease: "power2.out" });
        });
    });

    // ===========================================
    // PROJECTS SECTION
    // ===========================================

    animateFrom(["#projects h2", "#projects .w-20", "#projects-intro"], {
        trigger: "#projects",
        props: {
            opacity: 0,
            duration: 1,
            delay: 0.3,
            ease: "power2.out",
            x: (i, el) => el.matches(".w-20") ? 80 : el.matches("h2") ? -80 : 0,
            y: (i, el) => el.matches("#projects-intro") ? 50 : 0
        }
    });

    gsap.utils.toArray(".project-card").forEach((card, i) => {
        animateFrom(card, {
            props: {
                opacity: 0,
                duration: 1,
                delay: i * 0.3,
                ease: "power2.out"
            }
        });
    });


    // ===========================================
    // TESTIMONIALS SECTION
    // ===========================================

    animateFrom(["#testimonials h2", "#testimonials .w-20", "#testimonials-intro"], {
        trigger: "#testimonials",
        props: {
            opacity: 0,
            duration: 1,
            delay: 0.3,
            ease: "power2.out",
            x: (i, el) => el.matches(".w-20") ? 80 : el.matches("h2") ? -80 : 0,
            y: (i, el) => el.matches("#testimonials-intro") ? 50 : 0
        }
    });

});
