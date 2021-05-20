import Head from 'next/head'
import { getSortedPostsData } from '../lib/posts'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import Date from '../components/date'
import Portfolio from '../components/portfolio'
import { useRef } from 'react'
import PostBox, { boxSize } from '../components/postbox'

interface PostsData {
  date: string,
  title: string,
  id: string,
  imageURL: string
}

interface Props {
  postsData: PostsData[]
}

export const Home: React.FC<Props> = ({ postsData }) => {
  const portfolioRef = useRef<HTMLInputElement>(null)
  const blogRef = useRef<HTMLInputElement>(null)

  const scrollToRef = (ref: any) => ref?.current?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div>
      <style jsx global>{`
        body {
          background-color: #000000;
        }
      `}</style>
      <Head>
        <title>Camden Mecklem</title>
        <meta name="description" content="Camden Mecklem's personal website" />
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />
      </Head>
      <video className={styles.video} preload="auto" autoPlay muted loop id="bgvid">
        <source src="/vid/space.mp4" type="video/mp4" />
      </video>
      <main>
        <div className={`${styles.containerWithBgVideo} ${styles.container}`}>
          <h1 className={styles.title}>
            My name is Camden.
          </h1>
          <ul className={styles.nav}>
            <li id={styles.portfolioNav} onClick={() => scrollToRef(portfolioRef)}><button><span>Portfolio</span></button></li>
            <li id={styles.blogNav} onClick={() => scrollToRef(blogRef)}><button><span>Blog</span></button></li>
          </ul>
        </div>
        <div className={styles.container} id='portfolio-container' ref={portfolioRef}>
          <div>
            <h1 className={styles.title}>
              I create websites.
            </h1>
            <Portfolio />
          </div>
        </div>
        <div className={styles.container} id={styles.blogContainer} ref={blogRef}>
          <h1 className={styles.blogHeader}>
            I also write a blog.
          </h1>
          {/* <img id={styles.blogImg} src="/img/alexandria.jpg" alt="" /> */}
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
        <p>
          &copy; 2021 Camden Mecklem.
          <br />
          Header video from by the <a href="https://hubblesite.org/video/3/science">Space Telescope Science Institute</a> under CC BY-NC-SA 4.0.
          <br />
          Website made with <a href='https://nextjs.org/'>Next.js</a>
        </p>
      </footer>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const postsData = getSortedPostsData()
  return {
    props: {
      postsData
    }
  }
}

export default Home 