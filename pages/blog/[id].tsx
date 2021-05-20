import { useEffect } from 'react'
import Date from '../../components/date'
import Link from 'next/link'
import Head from 'next/head'
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
    imageURL: string
    contentHtml: string,
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

  return (
    <>
      <Head>
        <title>{postData.title} - Camden's Blog</title>
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />
      </Head>
      <div className={styles.container}>
        <p className={styles.blogHeader}><Link href="/blog/"><a>Camden's Blog</a></Link></p>
        <h1 className={styles.title}>{postData.title}</h1>
        <p className={styles.date}>&#8213; <Date dateString={postData.date} /> &#8213;</p>
        <img className={styles.postHeaderImg} src={postData.imageURL} alt=""/>
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
            background-color: #e9e9e9;
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