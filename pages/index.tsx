import { GetStaticProps } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import Layout from '../components/Layout'
import { getLectures, LectureMeta } from '../lib/mdx'

interface Props {
  sections: {
    mdx: MDXRemoteSerializeResult
    lecture?: LectureMeta
  }[]
  lectures: LectureMeta[]
}

export default function Home({ sections, lectures }: Props) {
  return (
    <Layout lectures={lectures}>
      <div className="jumbotron bg-light p-5 rounded-3 mb-4">
        <h1 className="display-4">Библиотека Стартапов Y Combinator</h1>
        <p className="lead">
          Сборник лекций из знаменитого курса Y Combinator в Стэнфорде.
        </p>
      </div>

      <div className="row">
        {sections.map((sec, i) => (
          <div className="col-md-6 mb-4" key={i}>
            <div className="card h-100">
              <div className="card-body">
                <article className="prose">
                  <MDXRemote {...sec.mdx} />
                </article>
              </div>
              {sec.lecture && (
                <div className="card-footer bg-white border-top-0">
                  <Link href={`/lectures/${sec.lecture.slug}`} legacyBehavior>
                    <a className="btn btn-primary">
                      Читать лекцию {sec.lecture.order} &rarr;
                    </a>
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const lectures = getLectures()
  const letterPath = path.join(process.cwd(), 'content', 'letter.md')
  const source = fs.readFileSync(letterPath, 'utf8')
  
  const parts = source.split(/(?=\n##\s)/).map(s => s.trim())

  const sections = await Promise.all(
    parts.map(async (part, i) => {
      const lecture = i > 0 ? lectures[i - 1] : null
      const mdx = await serialize(part)
      return { mdx, lecture }
    })
  )

  return { props: { sections, lectures } }
}