module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'about-bg': "url('assets/img/about.jpg')",
        'wordbook-img': "url('assets/img/wordbook-img.jpg')",
        'wordbook-bg': "url('assets/img/wordbook-bg.jpg')",
        'game-bg': "url('assets/img/game-bg.png')",
        'sprint-img': "url('assets/img/sprint-img.png')",
        'challenge-img':"url('assets/img/challenge-img.jpg')",
        'statistics-img':"url('assets/img/statistics-img.png')",
        'statistics-bg':"url('assets/img/statistics-bg.png')"
      }
    },
  },
  plugins: [],
}