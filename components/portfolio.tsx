import React from 'react'
import Image from 'next/image'
import styles from '../styles/Portfolio.module.css'
import groupreadImage from '../public/img/groupread.png'
import linearAImage from '../public/img/lineara.png'
import kautharImage from '../public/img/kauthar.png'
import linksImage from '../public/img/links.png'
import githubLogo from '../public/img/GitHub-Mark-64px.png'

const Portfolio: React.FC = () => {
  return (
    <section>
      <ul className={styles.portfolioDisplay}>
        <li className={styles.portfolioItem}>
          <a href="https://gr.camdenmecklem.com/">
            <Image className={styles.portfolioImage} src={groupreadImage} alt="" />
          </a>
          <p>Groupread</p>
        </li>
        <li className={styles.portfolioItem}>
          <a href="https://la.camdenmecklem.com">
            <Image className={styles.portfolioImage} src={linearAImage} alt="" />
          </a>
          <p>Linear A</p>
        </li>
        <li className={styles.portfolioItem}>
          <a href="https://iamkauthar.work/">
            <Image className={styles.portfolioImage} src={kautharImage} alt="" />
          </a>
          <p>Kauthar Marlie</p>
        </li>
        <li className={styles.portfolioItem}>
          <a href="http://links.camdenmecklem.com/">
            <Image className={styles.portfolioImage} src={linksImage} alt="" />
          </a>
          <p>Links</p>
        </li>
      </ul>
      <p className={styles.githubLink}>
        <Image src={githubLogo} alt="" />
        <a href='https://github.com/mythmakerseven'>Check out my Github for more.</a>
      </p>
    </section>
  )
}

export default Portfolio