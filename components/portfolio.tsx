import React from 'react'
import styles from '../styles/Portfolio.module.css'

const Portfolio: React.FC = () => {
  return (
    <section>
      <ul className={styles.portfolioDisplay}>
        <li className={styles.portfolioItem}>
          <a href="https://gr.camdenmecklem.com/">
            <img className={styles.portfolioImage} id={styles.groupreadImage} src="/img/groupread.webp" alt="" />
          </a>
          <p>Groupread</p>
        </li>
        <li className={styles.portfolioItem}>
          <a href="https://la.camdenmecklem.com">
            <img className={styles.portfolioImage} id={styles.linearaImage} src="/img/lineara.webp" alt="" />
          </a>
          <p>Linear A</p>
        </li>
        <li className={styles.portfolioItem}>
          <a href="https://iamkauthar.work/">
            <img className={styles.portfolioImage} id={styles.kautharImage} src="/img/kauthar.webp" alt="" />
          </a>
          <p>Kauthar Marlie</p>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio