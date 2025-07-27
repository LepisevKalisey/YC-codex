import fs from 'fs'
import path from 'path'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'

export async function loadMdx(filePath: string): Promise<MDXRemoteSerializeResult> {
  const source = fs.readFileSync(filePath, 'utf8')
  const processed = source.replace(/^(#{1,6})\s*([^#\n]*?)\s*{#([^}]+)}\s*$/gm, (_m, hashes, title, id) => {
    const level = (hashes as string).length
    return `<h${level} id="${id}">${(title as string).trim()}</h${level}>`
  })
  return serialize(processed)
}

export function getLectureSlugs(): string[] {
  const dir = path.join(process.cwd(), 'content')
  return fs
    .readdirSync(dir)
    .filter((f) => f.startsWith('chapter'))
    .map((f) => f.replace(/\.md$/, ''))
}

export interface LectureMeta {
  slug: string
  title: string
}

export function getLectures(): LectureMeta[] {
  return getLectureSlugs().map((slug) => {
    const file = fs.readFileSync(
      path.join(process.cwd(), 'content', `${slug}.md`),
      'utf8'
    )
    const match = file.match(/^#\s*([^\n{]+)[^\n]*{#.*}/)
    const title = match ? match[1].trim() : slug
    return { slug, title }
  })
}
