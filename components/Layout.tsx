import Link from 'next/link'
import { LectureMeta } from '../lib/mdx'
import { ReactNode } from 'react'

interface Props {
  lectures: LectureMeta[]
  children: ReactNode
}

export default function Layout({ lectures, children }: Props) {
  return (
    <>
      <header style={{ padding: '1rem', background: '#f0f0f0' }}>
        <nav>
          <Link href="/">Главная</Link>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {lectures.map((lec) => (
              <li key={lec.slug}>
                <Link href={`/lectures/${lec.slug}`}>{lec.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </>
  )
}
