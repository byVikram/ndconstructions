window.addEventListener('load', () => {
    gsap.registerPlugin(ScrollTrigger);

    // Animate heading
    gsap.from("#cta-section h2", {
        scrollTrigger: {
            trigger: "#cta-section",
            start: "top 80%",
            toggleActions: "play reverse play reverse"
        },
        opacity: 0,
        y: -30,
        duration: 1,
        ease: "power2.out"
    });

    // Animate paragraph
    gsap.from("#cta-section-intro", {
        scrollTrigger: {
            trigger: "#cta-section",
            start: "top 80%",
            toggleActions: "play reverse play reverse"
        },
        opacity: 0,
        y: 40,
        duration: 1,
        delay: 0.2,
        ease: "power2.out"
    });

    // Animate buttons
    gsap.from("#cta-section .flex a", {
        scrollTrigger: {
            trigger: "#cta-section",
            start: "top 80%",
            toggleActions: "play reverse play reverse"
        },
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.4,
        stagger: 0.2,
        ease: "power2.out"
    });
});
