import Link from 'next/link'
import { getSortedPostsData } from '../lib/posts'
import { GetStaticProps } from 'next'
import PostBox from '../components/postbox'
import styles from '../styles/Blog.module.css'

interface PostsData {
  date: string,
  title: string,
  id: string,
  imageURL: string
}

interface Props {
  postsData: PostsData[]
}

export const BlogHome: React.FC<Props> = ({ postsData }) => (
  <div>
    <div className={styles.container}>
      <h1 className={styles.title}>Camden's Blog</h1>
      <div className={styles.homepageLink}>
        <Link href='/'><a>&#8592; Return to homepage</a></Link>
      </div>
      <div>
        {postsData.map(({ id, date, title, imageURL }) => (
          <PostBox
            id={id}
            date={date}
            title={title}
            imageURL={imageURL}
          />
        ))}
      </div>
    </div>
    <style jsx global>{`
        body {
          background-color: #e9e9e9;
        }
      `}</style>
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

export default BlogHome