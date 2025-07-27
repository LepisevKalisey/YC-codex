import { GetStaticProps } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import fs from 'fs'
import path from 'path'
import Layout from '../components/Layout'
import { getLectures, LectureMeta } from '../lib/mdx'

interface Props {
  sections: MDXRemoteSerializeResult[]
  lectures: LectureMeta[]
}

export default function Home({ sections, lectures }: Props) {
  return (
    <Layout lectures={lectures}>
      {sections.map((sec, i) => (
        <section key={i} id={`section-${i}`}>
          <MDXRemote {...sec} />
        </section>
      ))}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const letterPath = path.join(process.cwd(), 'content', 'letter.md')
  const source = fs.readFileSync(letterPath, 'utf8')
  const parts = source.split(/\n## /)
  const sections: MDXRemoteSerializeResult[] = []
  for (let i = 0; i < parts.length; i++) {
    const md = i === 0 ? parts[i] : '## ' + parts[i]
    sections.push(await serialize(md))
  }
  const lectures = getLectures()
  return { props: { sections, lectures } }
}
