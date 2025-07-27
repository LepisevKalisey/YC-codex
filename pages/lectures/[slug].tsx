import { GetStaticPaths, GetStaticProps } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { loadMdx, getLectureSlugs } from '../../lib/mdx'
import path from 'path'

interface Props {
  mdxSource: MDXRemoteSerializeResult
}

export default function Lecture({ mdxSource }: Props) {
  return (
    <article style={{ padding: '2rem' }}>
      <MDXRemote {...mdxSource} />
    </article>
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
  return { props: { mdxSource } }
}
