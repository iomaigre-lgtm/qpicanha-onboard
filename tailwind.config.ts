import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#c1ff72',
        dark: '#050505',
      },
    },
  },
  plugins: [],
}
export default config
