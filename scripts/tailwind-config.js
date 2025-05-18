tailwind.config = {
	theme: {
		extend: {
			colors: {
				primary: "#1E3A8A",     // Deep Blue (trust, professionalism)
				secondary: "#2563EB",   // Blue Accent (modern, clean)
				accent: "#10B981",      // Emerald (energy, balance)
				muted: "#F3F4F6",       // Soft Gray Background
				neutral: "#6B7280",     // Neutral Text
				danger: "#EF4444",      // Clear Red for errors
				info: "#3B82F6",        // Light Blue (info, links)
				success: "#22C55E",     // Green (confirmation)
				warning: "#F59E0B",     // Orange (alerts)
				dark: "#111827",        // Deep Gray/Black (text or dark mode)
				light: "#FFFFFF",       // Pure white
			},
			borderRadius: {
				none: "0px",
				sm: "4px",
				DEFAULT: "8px",
				md: "12px",
				lg: "16px",
				xl: "20px",
				"2xl": "24px",
				"3xl": "32px",
				full: "9999px",
				button: "8px",
			},
		},
	},
};
