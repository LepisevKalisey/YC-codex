import fs from 'fs'
import path from 'path'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'

export async function loadMdx(filePath: string): Promise<MDXRemoteSerializeResult> {
  const source = fs.readFileSync(filePath, 'utf8')
  return serialize(source)
}

export function getLectureSlugs(): string[] {
  const dir = path.join(process.cwd(), 'content')
  return fs
    .readdirSync(dir)
    .filter((f) => f.startsWith('chapter'))
    .map((f) => f.replace(/\.md$/, ''))
}
