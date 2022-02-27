import styles from '../styles/Home.module.css'

export interface SeasonalTheme {
  background: string, // path to background image
  credit: {
    photographer: string, // name of the photographer
    link: string // link to the pic on unsplash
  },
  textColor: string, // CSS class with the text-color attribute
  backgroundColor: string, // CSS class with the background-color attribute
  favicon: string // path to favicon
}

const getSeasonalTheme = (): SeasonalTheme => {
  return {
    background: '/img/ozcan-adiyaman-18fU4HAFjR8-unsplash.jpg',
    credit: {
      photographer: 'Özcan ADIYAMAN',
      link: 'https://unsplash.com/photos/18fU4HAFjR8'
    },
    textColor: styles.ukraineText,
    backgroundColor: styles.ukraineBackground,
    favicon: '/favicon-ua.png'
  }
  // const now = new Date()

  // const year = now.getFullYear()

  // // Remember that months start with zero, so 5 = June
  // const dates = [
  //   // spring equinox
  //   new Date(year, 2, 20),
  //   // summer solstice
  //   new Date(year, 5, 21),
  //   // autumn equinox
  //   new Date(year, 8, 21),
  //   // winter solstice
  //   new Date(year, 11, 21),
  //   // today's date
  //   now
  // ]

  // dates.sort((a, b) => {
  //   return a.getTime() - b.getTime()
  // })

  // const index = dates.indexOf(now)

  // switch(index) {
  //   case 1:
  //     return {
  //       background: '/img/ruby-doan-BrFuaOEfxCk-unsplash.jpg',
  //       credit: {
  //         photographer: 'Ruby Doan',
  //         link: 'https://unsplash.com/photos/BrFuaOEfxCk'
  //       },
  //       textColor: styles.springText,
  //       backgroundColor: styles.springBackground,
  //       favicon: '/favicon-spring.png'
  //     }
  //   case 2:
  //     return {
  //       background: '/img/jared-verdi-PNKwdJ8WetM-unsplash.jpg',
  //       credit: {
  //         photographer: 'Jared Verdi',
  //         link: 'https://unsplash.com/photos/PNKwdJ8WetM'
  //       },
  //       textColor: styles.summerText,
  //       backgroundColor: styles.summerBackground,
  //       favicon: '/favicon-summer.png'
  //     }
  //   case 3:
  //     return {
  //       background: '/img/eberhard-grossgasteiger-KX6ECaHP6wQ-unsplash.jpg',
  //       credit: {
  //         photographer: 'eberhard 🖐 grossgasteiger',
  //         link: 'https://unsplash.com/photos/KX6ECaHP6wQ'
  //       },
  //       textColor: styles.fallText,
  //       backgroundColor: styles.fallBackground,
  //       favicon: '/favicon-autumn.png'
  //     }
  //   default:
  //     return {
  //       background: '/img/atle-mo-X9QnU-h3X_8-unsplash.jpg',
  //       credit: {
  //         photographer: 'Atle Mo',
  //         link: 'https://unsplash.com/photos/X9QnU-h3X_8'
  //       },
  //       textColor: styles.winterText,
  //       backgroundColor: styles.winterBackground,
  //       favicon: '/favicon-winter.png'
  //     }
  // }
}

export default getSeasonalTheme