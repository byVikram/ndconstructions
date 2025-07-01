window.addEventListener('load', () => {
    gsap.registerPlugin(ScrollTrigger);

    // ******************************************************
    // Animation for Home screen Banner
    // ******************************************************

    gsap.from("#home-header", {
        scrollTrigger: {
            trigger: "#home",
            start: "top 80%",
            toggleActions: "play reverse play reverse",

        },
        x: -100,
        opacity: 0,
        duration: 1.8,
        delay: 0.3,
        ease: "power2.out",
    });

    // * Animation to h1 of home banner
    const h1 = document.getElementById("home-header");
    const text = h1.textContent;
    h1.textContent = ""; // clear text

    // Wrap every character in a span
    text.split("").forEach(char => {
        const span = document.createElement("span");
        span.textContent = char;
        h1.appendChild(span);
    });

    gsap.from("#home-header span", {
        scrollTrigger: {
            trigger: "#home",
            start: "top 80%",
            toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        y: 20,
        duration: 0.1,
        ease: "power2.out",
        stagger: 0.05,
    });


    gsap.from("#home p", {
        scrollTrigger: {
            trigger: "#home",
            start: "top 80%",
            toggleActions: "play reverse play reverse",
        },
        x: -80,
        opacity: 0,
        duration: 1.4,
        delay: 0.6,
        ease: "power2.out",
    });


    gsap.from("#home .flex > a", {
        scrollTrigger: {
            trigger: "#home",
            start: "top 80%",
            toggleActions: "play reverse play reverse",
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        delay: 0.5,
        ease: "power2.out",
    });


    // ******************************************************
    // Animation for Stats section
    // ******************************************************


    gsap.utils.toArray("#stats-section .container .text-center").forEach((elem) => {
        gsap.from(elem, {
            scrollTrigger: {
                trigger: elem,       // trigger on each individual block
                start: "top 80%",
                toggleActions: "play reverse play reverse",
            },
            y: 40,
            opacity: 0,
            duration: 1.2,
            ease: "power2.out",
        });
    });

    // Animate fade up and count up on scroll trigger
    gsap.utils.toArray('.counter-value').forEach(counter => {
        let target = +counter.getAttribute('data-target');
        let count = { val: 0 };

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: counter,
                start: "top 80%",
                toggleActions: "play none none none",
                // markers: true, // Add markers to debug trigger points
            }
        });

        tl.to(count, {
            val: target,
            duration: 2,
            ease: "power1.out",
            onUpdate: () => {
                counter.innerText = Math.floor(count.val);
            }
        });


    });


    // ******************************************************
    // Animation for Service section
    // ******************************************************

    gsap.from("#services h2", {
        scrollTrigger: {
            trigger: "#services",
            start: "top 80%",
            toggleActions: "play reverse play reverse",
        },
        x: -80,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power2.out",
    });

    gsap.from("#services .w-20", {
        scrollTrigger: {
            trigger: "#services",
            start: "top 80%",
            toggleActions: "play reverse play reverse",
        },
        x: 80,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power2.out",
    });

    gsap.from("#services-intro", {
        scrollTrigger: {
            trigger: "#services",
            start: "top 80%",
            toggleActions: "play reverse play reverse",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power2.out",
    });


    gsap.utils.toArray(".service-card").forEach((card, i) => {
        gsap.from(card, {
            opacity: 0,
            duration: 1,
            delay: i * 0.3,
            ease: "power2.out",
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play reverse play reverse",
            },
        });
    });

    gsap.utils.toArray(".service-expand-btn").forEach((btn) => {
        btn.addEventListener("mouseenter", () => {
            gsap.to(btn, {
                scale: 1.1,
                duration: 0.3,
                ease: "power2.out",
            });
        });
        btn.addEventListener("mouseleave", () => {
            gsap.to(btn, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
            });
        });
    });

});