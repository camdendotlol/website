import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

const portfolioDirectory = path.join(process.cwd(), 'portfolio')

export const getPortfolio = () => {
  const fileNames = fs.readdirSync(portfolioDirectory)
  const portfolioData = fileNames.map(filename => {
    const fullPath = path.join(portfolioDirectory, filename)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    return {
      title: matterResult.data.title,
      description: matterResult.content,
      image: matterResult.data.image,
      technologies: matterResult.data.technologies,
      url: matterResult.data.url,
      date: matterResult.data.date,
      github: matterResult.data.github
    }
  })

  return portfolioData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}
