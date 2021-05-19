import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark, { stringify } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export const getSortedPostsData = () => {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const postsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Support newlines in quotes
    let quoteIter = matterResult.data.quote.split('')
    quoteIter = quoteIter.map((c: string) => c === '\\' ? '\n' : c)
    const quote = quoteIter.join('')

    // Combine the data with the id
    return {
      id,
      quote: quote,
      date: matterResult.data.date,
      title: matterResult.data.title,
      imageURL: matterResult.data.imageURL,
      quoteType: matterResult.data.quoteType,
      quoteAuthor: matterResult.data.quoteAuthor
    }
  })
  // Sort posts by date
  return postsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export const getAllPostIds = () => {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export const getPostData = async (id: string) => {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Support newlines in quotes
  let quoteIter = matterResult.data.quote.split('')
  quoteIter = quoteIter.map((c: string) => c === '\\' ? '\n' : c)
  const quote = quoteIter.join('')

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    quote: quote,
    date: matterResult.data.date,
    title: matterResult.data.title,
    imageURL: matterResult.data.imageURL,
    quoteType: matterResult.data.quoteType,
    quoteAuthor: matterResult.data.quoteAuthor
  }
}
