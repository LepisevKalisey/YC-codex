import { GetStaticPaths, GetStaticProps } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import Layout from '../../components/Layout'
import { getLectureSlugs, getLectures, LectureMeta, loadMdx } from '../../lib/mdx'

interface Props {
  source: MDXRemoteSerializeResult
  meta: LectureMeta
  lectures: LectureMeta[]
}

export default function LecturePage({ source, meta, lectures }: Props) {
  return (
    <Layout lectures={lectures}>
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">{meta.title}</h1>
          <hr />
          <article className="prose">
            <MDXRemote {...source} />
          </article>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string
  const { source, meta } = await loadMdx(`content/${slug}.md`)
  const lectures = getLectures()
  return { props: { source, meta: meta as LectureMeta, lectures } }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getLectureSlugs()
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}