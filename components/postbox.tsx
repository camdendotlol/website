import React from 'react'
import Link from 'next/link'
import Date from '../components/date'
import styles from '../styles/PostBox.module.css'

interface Props {
  date: string,
  title: string,
  id: string,
  imageURL: string
}

const PostBox: React.FC<Props> = ({ date, title, id, imageURL }) => {
  return (
    <Link key={id} href={`/blog/${id}`}>
      <a>
        <div className={`postbox ${styles.postbox}`}>
          <style jsx>
            {
              `.postbox {
                background-image: url(${imageURL})
              }`
            }
          </style>
          <div className={styles.postboxContent}>
            <h3>
                {title}
            </h3>
            <small>
              <Date dateString={date} />
            </small>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default PostBox