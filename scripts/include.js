document.addEventListener("DOMContentLoaded", () => {
	// Load header and footer
	Promise.all([
		fetch("./components/gif-loader.html").then(res => res.text()),
		fetch("./components/header.html").then(res => res.text()),
		fetch("./components/footer.html").then(res => res.text())
	]).then(([loaderHTML, headerHTML, footerHTML]) => {
		// Inject loader HTML into the DOM
		document.getElementById("gif-loader").innerHTML = loaderHTML;
		document.getElementById("header").innerHTML = headerHTML;
		document.getElementById("footer").innerHTML = footerHTML;

		// Mobile Menu Toggle
		const mobileMenuButton = document.getElementById("mobile-menu-button");
		const mobileMenu = document.getElementById("mobile-menu");

		if (mobileMenuButton && mobileMenu) {
			mobileMenuButton.addEventListener("click", function () {
				mobileMenu.classList.toggle("hidden");
			});
		}

		// Smooth Scroll for Navigation Links
		document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
			anchor.addEventListener("click", function (e) {
				e.preventDefault();
				const targetId = this.getAttribute("href");
				if (targetId === "#") return;
				const targetElement = document.querySelector(targetId);
				if (targetElement) {
					window.scrollTo({
						top: targetElement.offsetTop - 80,
						behavior: "smooth",
					});
					// Close mobile menu if open
					if (mobileMenu) {
						mobileMenu.classList.add("hidden");
					}
				}
			});
		});
	});
});


// Hide loader ONLY after entire page finishes loading
window.addEventListener("load", () => {
	const gifLoader = document.getElementById("gif-loader");
	if (gifLoader) {
		gifLoader.classList.add("fade-out");
		setTimeout(() => {
			gifLoader.remove(); // optional: remove from DOM after animation
		}, 500); // match with your fade transition duration
	}
});


function loadBanner(bannerData) {
	fetch("./components/banner.html")
		.then(res => res.text())
		.then(data => {
			const bannerContainer = document.getElementById("banner");
			if (bannerContainer) {
				bannerContainer.innerHTML = data;

				document.getElementById("banner-title").textContent = bannerData.title || "";
				document.getElementById("banner-subtitle").textContent = bannerData.subtitle || "";

				const bgElement = document.getElementById("banner-bg");
				if (bgElement && bannerData.backgroundImage) {
					bgElement.style.backgroundImage = `url('${bannerData.backgroundImage}')`;
					bgElement.style.backgroundRepeat = "no-repeat";

					const isMobile = window.matchMedia("(max-width: 768px)").matches;
					// bgElement.style.backgroundSize = isMobile ? "contain" : "cover";
					bgElement.style.backgroundPosition = isMobile ? "left" : "top";
				}
			}
		});
}
