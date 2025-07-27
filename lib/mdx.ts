import fs from 'fs'
import path from 'path'
import { serialize }
from 'next-mdx-remote/serialize'
import matter from 'gray-matter'

const contentPath = path.join(process.cwd(), 'content')

export interface LectureMeta {
  slug: string
  title: string
  order: number
}

export function getLectureSlugs(): string[] {
  return fs
    .readdirSync(contentPath)
    .filter((f) => f.startsWith('chapter'))
    .map((f) => f.replace(/\.md$/, ''))
}

export function getLectures(): LectureMeta[] {
  const slugs = getLectureSlugs()
  const lectures = slugs
    .map((slug) => {
      const filePath = path.join(contentPath, `${slug}.md`)
      const source = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(source)
      return {
        slug,
        title: data.title,
        order: data.order,
      } as LectureMeta
    })
    .sort((a, b) => a.order - b.order)
  return lectures
}

export async function loadMdx(filePath: string) {
  const source = fs.readFileSync(path.join(process.cwd(), filePath), 'utf8')
  const { content, data } = matter(source)
  const mdxSource = await serialize(content, { scope: data })
  return { source: mdxSource, meta: data }
}