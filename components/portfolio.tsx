import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from '../styles/Portfolio.module.css'
import { PortfolioData } from '../pages/index'
import {
  ArrowLeftCircleFill,
  ArrowRightCircleFill,
  Github,
  Wifi
} from 'react-bootstrap-icons'
import { SeasonalTheme } from '../lib/seasons'

interface Props {
  portfolioData: PortfolioData[],
  seasonalTheme: SeasonalTheme
}

enum WhichWay {
  Increment,
  Decrement
}

const Portfolio: React.FC<Props> = ({ portfolioData, seasonalTheme }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [animation, setAnimation] = useState<WhichWay>(WhichWay.Increment)

  const getNextItem = (whichWay: WhichWay) => {
    switch (whichWay) {
      case WhichWay.Increment:
        if (currentIndex === portfolioData.length - 1) {
          setCurrentIndex(0)
        } else {
          setCurrentIndex(currentIndex + 1)
        }
        setAnimation(WhichWay.Increment)
        break
      case WhichWay.Decrement:
        if (currentIndex === 0) {
          setCurrentIndex(portfolioData.length - 1)
        } else {
          setCurrentIndex(currentIndex - 1)
        }
        setAnimation(WhichWay.Decrement)
        break
    }
  }

  const getCardClass = (index: number) => {
    let styleString = styles.portfolioCard

    if (index !== currentIndex) {
      styleString = styleString + ' ' + styles.hiddenCard
    }

    if (animation === WhichWay.Increment) {
      styleString = styleString + ' ' + styles.backwardCard
    } else {
      styleString = styleString + ' ' + styles.forwardCard
    }

    return styleString
  }

  return (
    <section
      className={styles.portfolio}
    >
      <button
        type='button'
        id={styles.leftArrow}
        name='previous-project'
        aria-label='previous-project'
        onClick={() => getNextItem(WhichWay.Decrement)}
      >
        <ArrowLeftCircleFill
          className={styles.arrow}
        />
      </button>
      {portfolioData.map((item, index) => {
        return (
          <div
            key={index}
            className={`${getCardClass(index)} ${seasonalTheme.backgroundColor}`}
          >
            <h1 className={styles.itemHeader}>{item.title}</h1>
            <div className={styles.portfolioFlex}>
              <div className={styles.leftPane}>
                <a href={item.url}>
                  <Image
                    src={item.image}
                    alt={`screenshot of ${item.title}`}
                    width={633}
                    height={300}
                    className={styles.screenshot}
                  />
                </a>
                <p>
                  <Wifi className={styles.linkIcon} />
                  <a href={item.url}>{item.url}</a>
                </p>
                <p>
                  <Github className={styles.linkIcon} />
                  <a href={item.github}>{item.github}</a>
                </p>
              </div>
              <div className={styles.rightPane}>
                <div className={styles.madeWith}>
                  <p>Made with:</p>
                  <ul className={styles.techList}>
                    {item.technologies.map((tech, index) => (
                      <li key={index}>
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
                <p>{item.description}</p>
              </div>
            </div>
          </div>
        )
      })}
      <button
        type='button'
        id={styles.rightArrow}
        name='next-project'
        aria-label='next-project'
        onClick={() => getNextItem(WhichWay.Increment)}
      >
        <ArrowRightCircleFill
          className={styles.arrow}
        />
      </button>
    </section>
  )
}

export default Portfolio