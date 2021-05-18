import Date from '../../components/date'
import { getAllPostIds, getPostData } from '../../lib/posts'
import { GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'querystring'

interface Props {
  postData: {
    title: string,
    date: string,
    contentHtml: string
  }
}

const Post: React.FC<Props> = ({ postData }) => {
  return (
    <div>
      <h1>{postData.title}</h1>
      <Date dateString={postData.date} />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </div>
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