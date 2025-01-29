/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bainy: 'rgb(var(--color-bainy))',
        action: 'rgb(var(--color-action))',
        card: 'rgb(var(--color-card))',
        background: {
          main: 'rgb(var(--color-bg-main))',
          dark: 'rgb(var(--color-bg-dark))',
          card: 'rgb(var(--color-bg-card))',
        },
        text: {
          primary: 'rgb(var(--color-text-primary))',
          secondary: 'rgb(var(--color-text-secondary))',
          white: 'rgb(var(--color-text-white))',
        },
        status: {
          success: 'rgb(var(--color-success))',
          'success-hover': 'rgb(var(--color-success-hover))',
          warning: 'rgb(var(--color-warning))',
          'warning-hover': 'rgb(var(--color-warning-hover))',
          error: 'rgb(var(--color-error))',
          'error-hover': 'rgb(var(--color-error-hover))',
        },
        border: {
          main: 'rgb(var(--color-border))',
          focus: 'rgb(var(--color-border-focus))',
        },
        nav: 'rgb(var(--color-bg-nav))',
      },
    },
  },
  plugins: [],
}