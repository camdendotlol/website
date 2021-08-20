import React from 'react'
import Image from 'next/image'
import styles from '../styles/Portfolio.module.css'
import chromapollImage from '../public/img/chromapoll.png'
import groupreadImage from '../public/img/groupread.png'
import linearAImage from '../public/img/lineara.png'
import kautharImage from '../public/img/kauthar.png'
import githubLogo from '../public/img/GitHub-Mark-64px.png'
import camdenImage from '../public/img/camdenmecklem.png'

const Portfolio: React.FC = () => {
  return (
    <section>
      <ul className={styles.portfolioDisplay}>
        <li className={styles.portfolioItem} tabIndex={0}>
          <a href="http://chromapoll.xyz/" tabIndex={-1}>
            <Image className={styles.portfolioImage} src={chromapollImage} alt="" />
            <p>Chromapoll</p>
          </a>
        </li>
        <li className={styles.portfolioItem} tabIndex={0}>
          <a href="https://gr.camdenmecklem.com/" tabIndex={-1}>
            <Image className={styles.portfolioImage} src={groupreadImage} alt="" />
            <p>Groupread</p>
          </a>
        </li>
        <li className={styles.portfolioItem} tabIndex={0}>
          <a href="https://la.camdenmecklem.com" tabIndex={-1}>
            <Image className={styles.portfolioImage} src={linearAImage} alt="" />
            <p>Linear A</p>
          </a>
        </li>
        <li className={styles.portfolioItem} tabIndex={0}>
          <a href="https://iamkauthar.work/" tabIndex={-1}>
            <Image className={styles.portfolioImage} src={kautharImage} alt="" />
            <p>Kauthar Marlie</p>
          </a>
        </li>
        <li className={styles.portfolioItem} tabIndex={0}>
          <a tabIndex={-1}>
            <Image className={styles.portfolioImage} src={camdenImage} alt="" />
            <p>This one :)</p>
          </a>
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