import React from 'react'
import Link from 'next/link'
import Date from '../components/date'
import styles from '../styles/PostBox.module.css'
import Image from 'next/image'

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
      <a className={styles.blogLink} tabIndex={-1}>
        <div className={size === boxSize.large ? `postbox ${styles.largePostbox}` : `postbox ${styles.smallPostbox}`} tabIndex={0}>
          <Image
            className={styles.backgroundImage}
            src={postData.imageURL}
            alt=''
            layout='fill'
            objectFit='cover'
            objectPosition='center'
          />
          <div className={styles.postboxContent}>
            <p>
                {postData.title}
            </p>
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