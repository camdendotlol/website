import Link from 'next/link'
import Head from 'next/head'
import { getSortedPostsData } from '../lib/posts'
import { GetStaticProps } from 'next'
import PostBox from '../components/postbox'
import styles from '../styles/Blog.module.css'
import { boxSize } from '../components/postbox'

interface PostsData {
  date: string,
  title: string,
  id: string,
  imageURL: string
}

interface Props {
  postsData: PostsData[]
}

export const BlogHome: React.FC<Props> = ({ postsData }) => {
  return (
    <>
      <Head>
        <title>Camden`&apos;`s Blog</title>
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />
      </Head>
      <div>
        <div className={styles.container}>
          <h1 className={styles.title}>Camden`&apos;`s Blog</h1>
          <div className={styles.homepageLink}>
            <Link href='/'><a>&#8592; Return to homepage</a></Link>
          </div>
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
    </>
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

export default BlogHome