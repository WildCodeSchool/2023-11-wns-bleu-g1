import type { Config } from "tailwindcss";

const config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: "1.5rem",
				sm: "2rem",
				lg: "4rem",
				xl: "5rem",
				"2xl": "6rem",
			},
			screens: {
				sm: "640px",
				md: "768px",
				lg: "1000px",
				"2xl": "1200px",
			},
		},
		extend: {
			colors: {
				border: "hsl(var(--border))",
				topbarbackground: "hsl(var(--topbar-background))",
				terminalbackground: "hsl(var(--terminal-background))",
         darkterminalbackground: "hsl(var(--dark-terminal-background))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: {
					DEFAULT: "hsl(var(--background))",
					primary: "hsl(var(--background-primary))",
				},
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				error: {
					DEFAULT: "hsl(var(--error))",
					200: "hsl(var(--error-200))",
					300: "hsl(var(--error-300))",
					foreground: "hsl(var(--error-foreground))",
				},
				warning: {
					DEFAULT: "hsl(var(--warning))",
					200: "hsl(var(--warning-200))",
					300: "hsl(var(--warning-300))",
					foreground: "hsl(var(--warning-foreground))",
				},
				success: {
					DEFAULT: "hsl(var(--success))",
					200: "hsl(var(--success-200))",
					300: "hsl(var(--success-300))",
					foreground: "hsl(var(--success-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
