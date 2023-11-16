/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		fontFamily: {
			sans: ['Comfortaa', 'sans-serif'],
		},		
		colors: {
			gray: colors.gray,
			white: colors.white,
			red: colors.red,
			black: colors.black,
		},
		extend: {},
	},
	plugins: [],
}
