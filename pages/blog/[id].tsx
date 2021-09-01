import Date from '../../components/date'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { getAllPostIds, getPostData } from '../../lib/posts'
import { GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'querystring'
import styles from '../../styles/Blog.module.css'

// Syntax highlighting CSS
import 'highlight.js/styles/foundation.css'

interface Props {
  postData: {
    title: string,
    date: string,
    quote: string,
    quoteType: string,
    quoteAuthor: string,
    imageURL: string,
    imageWidth: number,
    imageHeight: number,
    contentHtml: string,
    plainText: string,
    path: string
  }
}

const Post: React.FC<Props> = ({ postData }) => {
  const getTextStyle = () => {
    if (postData.quoteType === 'poetry') {
      return styles.quoteTextPoetry
    } else {
      return styles.quoteTextProse
    }
  }

  const getMetadataSnippet = (text: string): string => {
    if (text.length < 200) {
      return text
    } else {
      return `${text.slice(0, 197)}...`
    }
  }

  return (
    <>
      <Head>
        <title>{postData.title} - Camden&apos;s Blog</title>
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />
        <meta property="og:title" content={`${postData.title} - Camden's Blog`} />
        <meta property="og:description" content={getMetadataSnippet(postData.plainText)} />
        <meta property="og:url" content={`https://camdenmecklem.com/blog/${postData.path}/`} />
        <meta property="og:image" content={postData.imageURL} />
        <meta property="og:site_name" content="Camden's Blog" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="camdenmecklem.com" />
        <meta property="twitter:url" content={`https://camdenmecklem.com/blog/${postData.path}/`} />
        <meta name="twitter:title" content={`${postData.title} - Camden's Blog`} />
        <meta name="twitter:description" content={getMetadataSnippet(postData.plainText)} />
        <meta name="twitter:image" content={postData.imageURL} />
      </Head>
      <div className={styles.container}>
        <p className={styles.blogHeader}><Link href="/blog/"><a>Camden&apos;s Blog</a></Link></p>
        <h1 className={styles.title}>{postData.title}</h1>
        <p className={styles.date}>&#8213; <Date dateString={postData.date} /> &#8213;</p>
        <div className={styles.postHeaderImg}>
          <Image width={postData.imageWidth} height={postData.imageHeight} className={styles.postHeaderImg} src={postData.imageURL} alt='' />
        </div>
        <div className={styles.quoteBox}>
          <p className={getTextStyle()}>{postData.quote}</p>
          <p className={styles.quoteAuthor}>&#8212; {postData.quoteAuthor}</p>
        </div>
        <p>&#167;</p>
        <div className={styles.blogPostContent} dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        <p>&#167;</p>
        <p className={styles.blogPostContent}>If you liked this post, you can help me make more of them by <a href="https://www.amazon.com/hz/wishlist/ls/1G2J9M8GI8CN2" className={styles.plugLink}>buying me stuff on Amazon</a>.</p>
        <p>&#167;</p>
        <div className={styles.backtoBlog}>
          <Link href='/blog/'><a>&#8592; Back to the blog</a></Link>
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

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

// hacky way to handle a TypeScript error with params.id
interface IParams extends ParsedUrlQuery {
  id: string
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as IParams
  const postData = await getPostData(id as string)
  return {
    props: {
      postData
    }
  }
}

export default Post