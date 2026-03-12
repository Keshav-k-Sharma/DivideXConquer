module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#07080f',
        surface: '#0f1117',
        border: '#1e2235',
        accent: '#00ff9f',
        cyan: '#00c8ff',
        purple: '#a855f7',
        orange: '#ff6b35',
        yellow: '#ffd700',
        muted: '#4a5568',
      },
      fontFamily: {
        mono: ['Space Mono', 'monospace'],
        sans: ['DM Sans', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
      },
    },
  },
  plugins: [],
}