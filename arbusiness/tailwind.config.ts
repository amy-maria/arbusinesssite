/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // adjust based on your folder structure
  ],
  theme: {
    extend: {
      colors: {
        // Primary CTA colors
        project: {
          DEFAULT: '#1D4ED8',      // main CTA blue
          hover: '#2563EB',        // hover state
          active: '#1E40AF',       // active / pressed state
          light: '#60A5FA',        // lighter version for backgrounds
        },
        // Secondary / accent colors
        accent: {
          DEFAULT: '#F59E0B',      // yellow/orange accent
          hover: '#D97706',
          light: '#FBBF24',
        },
        // Neutral / general UI colors
        neutral: {
          dark: '#111827',          // text on light background
          medium: '#6B7280',        // secondary text
          light: '#F3F4F6',         // backgrounds
          lighter: '#E5E7EB',
        },
        // Status / feedback colors
        success: '#10B981',
        warning: '#FBBF24',
        error: '#EF4444',
        info: '#3B82F6',
      },
      borderRadius: {
        'cta': '0.5rem',
        'card': '0.75rem',
      },
      fontFamily: {
        heading: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        cta: '0 4px 6px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
};
