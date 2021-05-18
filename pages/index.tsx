import Head from 'next/head'
import { getSortedPostsData } from '../lib/posts'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import Date from '../components/date'
import Portfolio from '../components/portfolio'

interface PostsData {
  date: string,
  title: string,
  id: string
}

interface Props {
  postsData: PostsData[]
}

const downArrow = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={styles.downArrow} viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
</svg>
)

export const Home: React.FC<Props> = ({ postsData }) => {
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
        <link rel="icon" href="/favicon.ico" />
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
            <li id={styles.portfolioNav}><span>Portfolio</span></li>
            <li id={styles.blogNav}><span>Blog</span></li>
          </ul>
          {downArrow}
        </div>
        <div className={styles.container}>
          <h1 className={styles.title}>
            I create websites.
          </h1>
          <Portfolio />
        </div>
        <div className={styles.container} id={styles.blogContainer}>
          <h1 className={styles.blogHeader}>
            I also write a blog.
          </h1>
          <img id={styles.blogImg} src="/img/alexandria.jpg" alt="" />
          <div className={styles.postList}>
            <h1 className={styles.subtitle}>
              Here are some recent posts:
            </h1>
            <section>
              {/* Only fetch the most recent couple posts for the homepage */}
              {postsData.slice(0, 2).map(({ id, date, title }) => (
                <div key={id}>
                <h3>
                  <Link key={id} href={`/blog/${id}`}>
                    <a>{title}</a>
                  </Link>
                </h3>
                <small>
                  <Date dateString={date} />
                </small>
                </div>
              ))}
            </section>
            <Link href={'/blog/'}>
              <a className={styles.blogSeeMore}>See more &rarr;</a>
            </Link>
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        &copy; 2021 Camden Mecklem
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