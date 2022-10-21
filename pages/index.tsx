import Head from 'next/head'
import Image from 'next/image'
import { getSortedPostsData } from '../lib/posts'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import Portfolio from '../components/portfolio'
import { useRef } from 'react'
import PostBox, { boxSize } from '../components/postbox'
import { getPortfolio } from '../lib/portfolio'
import getSeasonalTheme from '../lib/seasons'

interface PostsData {
  date: string,
  title: string,
  id: string,
  imageURL: string
}

export interface PortfolioData {
  title: string,
  image: string,
  technologies: string[],
  description: string,
  url: string,
  github: string
}

interface Props {
  postsData: PostsData[],
  portfolioData: PortfolioData[]
}

export const Home: React.FC<Props> = ({ portfolioData, postsData }) => {
  const portfolioRef = useRef<HTMLInputElement>(null)
  const blogRef = useRef<HTMLInputElement>(null)

  const scrollToRef = (ref: any) => ref?.current?.scrollIntoView({ behavior: 'smooth' })

  const seasonalStyle = getSeasonalTheme()
 
  return (
    <div>
      <style jsx global>{`
        body {
          background-color: #000000;
        }
      `}</style>
      <Head>
        <title>Camden Mecklem</title>
        <link rel="shortcut icon" type="image/png" href={seasonalStyle.favicon} />
        <meta name="description" content="Camden Mecklem is a web developer in the Cincinnati area." />

        <meta property="og:title" content="Camden Mecklem" />
        <meta property="og:description" content="Camden Mecklem is a web developer in the Cincinnati area." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/img/camdenmecklem.jpg" />
        <meta property="og:url" content="https://camdenmecklem.com" />
        <meta property="og:site_name" content="Camden Mecklem" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="camdenmecklem.com" />
        <meta property="twitter:url" content="https://camdenmecklem.com" />
        <meta name="twitter:title" content="Camden Mecklem" />
        <meta name="twitter:description" content="Camden Mecklem is a web developer in the Cincinnati area." />
      </Head>
      <main>
        <div className={`${styles.container} ${styles.helloContainer}`}>
          <Image
            className={styles.backgroundImage}
            src={seasonalStyle.background}
            alt=''
            layout='fill'
            objectFit='cover'
            objectPosition='center'
            draggable='false'
          />
          <div className={styles.helloDiv}>
            <h1 className={`${styles.title} ${seasonalStyle.textColor}`}>
              My name is Camden.
            </h1>
            <ul className={styles.nav}>
              <li
                id={styles.portfolioNav}
                onClick={() => scrollToRef(portfolioRef)}
              >
                <button className={seasonalStyle.backgroundColor}>
                  <span>Portfolio</span>
                </button>
              </li>
              <li
                id={styles.blogNav}
                onClick={() => scrollToRef(blogRef)}
              >
                <button className={seasonalStyle.backgroundColor}>
                  <span>Blog</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.container} id='portfolio-container' ref={portfolioRef}>
          <Portfolio
            portfolioData={portfolioData}
            seasonalTheme={seasonalStyle}
          />
        </div>
        <div className={styles.container} id={styles.blogContainer} ref={blogRef}>
          <h1 className={styles.title}>
            I also write a blog.
          </h1>
          <div className={styles.postList}>
            <h1 className={styles.subtitle}>
              Here are some recent posts:
            </h1>
            <section className={styles.blogPosts}>
              {/* Only fetch the most recent few posts for the homepage */}
              {postsData.slice(0, 3).map(( postdata ) => (
                <PostBox postData={postdata} size={boxSize.small} key={postdata.id} />
              ))}
            </section>
            <Link href={'/blog/'}>
              <a className={styles.blogSeeMore}>See more &rarr;</a>
            </Link>
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        <p>cover photo from <a href={seasonalStyle.credit.link}>{seasonalStyle.credit.photographer} on Unsplash</a></p>
        <p>𒁲𒈠𒃶𒈨𒂗</p>
      </footer>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const portfolioData = getPortfolio()
  const postsData = getSortedPostsData()
  return {
    props: {
      portfolioData,
      postsData
    }
  }
}

export default Home 