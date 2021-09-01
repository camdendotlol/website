import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import highlight from 'remark-highlight.js'
import html from 'remark-html'
import imageSize from 'image-size'
import strip from 'strip-markdown'

const postsDirectory = path.join(process.cwd(), 'posts')
const imageDirectory = path.join(process.cwd(), 'public')

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
    let quote = matterResult.data.quote.replace(/\//g, '\n')

    // Get dimensions so the post component can make room for the image before it loads
    const dimensions = imageSize(path.join(imageDirectory, matterResult.data.imageURL))

    // Combine the data with the id
    return {
      id,
      quote: quote,
      date: matterResult.data.date,
      title: matterResult.data.title,
      imageURL: matterResult.data.imageURL,
      imageWidth: dimensions.width,
      imageHeight: dimensions.height,
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
  let quote = matterResult.data.quote.replace(/\//g, '\n')
  
  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
  .use(html)
  .use(highlight)
  .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Replace my favorite punctuation mark with an em dash
  const finalContentHtml = contentHtml.replace(/ - /g, ' — ')

  // Get plain text without any Markdown formatting for OpenGraph metadata
  const plainTextQuery = await remark()
  .use(strip)
  .process(matterResult.content)

  const plainText = plainTextQuery.toString()

  // Get dimensions so the post component can make room for the image before it loads
  const dimensions = imageSize(path.join(imageDirectory, matterResult.data.imageURL))

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml: finalContentHtml,
    plainText,
    quote,
    date: matterResult.data.date,
    title: matterResult.data.title,
    imageURL: matterResult.data.imageURL,
    imageWidth: dimensions.width,
    imageHeight: dimensions.height,
    quoteType: matterResult.data.quoteType,
    quoteAuthor: matterResult.data.quoteAuthor,
    path: id
  }
}
