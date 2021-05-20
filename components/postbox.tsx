import React from 'react'
import Link from 'next/link'
import Date from '../components/date'
import styles from '../styles/PostBox.module.css'

export enum boxSize {
  small,
  large
}

interface Props {
  postData: {
    date: string,
    title: string,
    id: string,
    imageURL: string
  },
  size: boxSize
}

const PostBox: React.FC<Props> = ({ postData, size }) => {
  return (
    <Link key={postData.id} href={`/blog/${postData.id}`}>
      <a className={styles.blogLink}>
        <div className={size === boxSize.large ? `postbox ${styles.largePostbox}` : `postbox ${styles.smallPostbox}`}>
          <style jsx>
            {
              `.postbox {
                background-image: url(${postData.imageURL})
              }`
            }
          </style>
          <div className={styles.postboxContent}>
            <h3>
                {postData.title}
            </h3>
            <small>
              <Date dateString={postData.date} />
            </small>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default PostBox