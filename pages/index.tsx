import Head from 'next/head'
import { getSortedPostsData } from '../lib/posts'
import styles from '../styles/Blog.module.css'
import { GetStaticProps } from 'next'
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

export const Home: React.FC<Props> = ({ postsData }) => (
  <div>
    <Head>
      <title>Camden&apos;s Blog</title>
      <link rel="shortcut icon" type="image/png" href='/favicon-autumn.png' />
      <meta name="description" content="Camden Mecklem is a web developer in the Cincinnati area." />

      <meta property="og:title" content="Camden's Blog" />
      <meta property="og:description" content="Camden Mecklem is a web developer in the Cincinnati area." />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/img/camdenmecklem.jpg" />
      <meta property="og:url" content="https://camden.lol" />
      <meta property="og:site_name" content="Camden's Blog" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="camdenmecklem.com" />
      <meta property="twitter:url" content="https://camden.lol" />
      <meta name="twitter:title" content="Camden's Blog" />
      <meta name="twitter:description" content="Camden Mecklem is a web developer in the Cincinnati area." />
    </Head>
    <main>
    <div>
      <div className={styles.container}>
        <h1 className={styles.title}>Camden&apos;s Blog</h1>
        <div>
          {postsData.map((p) => (
            <PostBox
              key={p.id}
              postData={p}
              size={boxSize.large}
            />
          ))}
        </div>
      </div>
      <style jsx global>{`
        body {
          background-color: #f6f6f6;
        }
      `}</style>
      </div>
    </main>
    <div className={styles.mastodonLink}>
      <a rel="me" href="https://mas.to/@camden">Mastodon</a>
    </div>
  </div>
)

export const getStaticProps: GetStaticProps = async () => {
  const postsData = getSortedPostsData()
  return {
    props: {
      postsData
    }
  }
}

export default Home 