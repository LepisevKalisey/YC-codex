import { GetStaticPaths, GetStaticProps } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { loadMdx, getLectureSlugs, getLectures, LectureMeta } from '../../lib/mdx'
import Layout from '../../components/Layout'
import path from 'path'

interface Props {
  mdxSource: MDXRemoteSerializeResult
  lectures: LectureMeta[]
}

export default function Lecture({ mdxSource, lectures }: Props) {
  return (
    <Layout lectures={lectures}>
      <article style={{ padding: '2rem' }}>
        <MDXRemote {...mdxSource} />
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getLectureSlugs()
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string
  const mdxSource = await loadMdx(path.join(process.cwd(), 'content', `${slug}.md`))
  const lectures = getLectures()
  return { props: { mdxSource, lectures } }
}
