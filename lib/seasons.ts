import styles from '../styles/Home.module.css'

export interface SeasonalTheme {
  background: string, // path to background image
  credit: string, // HTML div that goes in the footer to credit the photographer
  textColor: string, // CSS class with the text-color attribute
  backgroundColor: string, // CSS class with the background-color attribute
  favicon: string // path to favicon
}

const getSeasonalTheme = (): SeasonalTheme => {
  const now = new Date()

  const year = now.getFullYear()

  // Remember that months start with zero, so 5 = June
  const dates = [
    // spring equinox
    new Date(year, 2, 20),
    // summer solstice
    new Date(year, 5, 21),
    // autumn equinox
    new Date(year, 8, 21),
    // winter solstice
    new Date(year, 11, 21),
    // today's date
    now
  ]

  dates.sort((a, b) => {
    return a.getTime() - b.getTime()
  })

  const index = dates.indexOf(now)

  switch(index) {
    case 1:
      return {
        background: '/img/ruby-doan-BrFuaOEfxCk-unsplash.jpg',
        credit:
          `<p>
            cover photo from <a href = "https://unsplash.com/photos/BrFuaOEfxCk">Ruby Doan on Unsplash</a>
          </p>`
        ,
        textColor: styles.springText,
        backgroundColor: styles.springBackground,
        favicon: '/favicon-spring.png'
      }
    case 2:
      return {
        background: '/img/jared-verdi-PNKwdJ8WetM-unsplash.jpg',
        credit:
          `<p>
            cover photo from <a href = "https://unsplash.com/photos/PNKwdJ8WetM">Jared Verdi on Unsplash</a>
          </p>`
        ,
        textColor: styles.summerText,
        backgroundColor: styles.summerBackground,
        favicon: '/favicon-summer.png'
      }
    case 3:
      return {
        background: '/img/eberhard-grossgasteiger-KX6ECaHP6wQ-unsplash.jpg',
        credit:
          `<p>
            cover photo from <a href="https://unsplash.com/photos/KX6ECaHP6wQ">eberhard 🖐 grossgasteiger on Unsplash</a>
          </p>`
        ,
        textColor: styles.fallText,
        backgroundColor: styles.fallBackground,
        favicon: '/favicon-autumn.png'
      }
    default:
      return {
        background: '/img/atle-mo-X9QnU-h3X_8-unsplash.jpg',
        credit:
          `<p>
            cover photo from <a href = "https://unsplash.com/photos/X9QnU-h3X_8">Atle Mo on Unsplash</a>
          </p>`
        ,
        textColor: styles.winterText,
        backgroundColor: styles.winterBackground,
        favicon: '/favicon-winter.png'
      }
  }
}

export default getSeasonalTheme