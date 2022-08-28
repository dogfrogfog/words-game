module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'about-bg': "url('assets/img/about.jpg')",
        'wordbook-img': "url('assets/img/wordbook.jpg')",
        'wordbook-bg': "url('assets/img/wordbook3.jpg')",
        'game-bg': "url('assets/img/game-bg2.jpg')",
        'sprint-img': "url('assets/img/sprint-img.jpg')",
        'challenge-img':"url('assets/img/challenge-img.jpg')",
        'statistics-img':"url('assets/img/statistics-img2.jpeg')",
        'statistics-bg':"url('assets/img/statistics-bg.jpeg')"
      }
    },
  },
  plugins: [],
}