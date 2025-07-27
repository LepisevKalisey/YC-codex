import Link from 'next/link'
import { LectureMeta } from '../lib/mdx'

interface LayoutProps {
  children: React.ReactNode
  lectures: LectureMeta[]
}

export default function Layout({ children, lectures }: LayoutProps) {
  return (
    <>
      <header className="bg-light border-bottom">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light">
            <Link href="/" legacyBehavior>
              <a className="navbar-brand">YC Startup Library</a>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                {lectures.map((lec) => (
                  <li className="nav-item" key={lec.slug}>
                    <Link href={`/lectures/${lec.slug}`} legacyBehavior>
                      <a className="nav-link">Лекция {lec.order}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </header>
      <main className="container py-4">{children}</main>
      <footer className="text-center py-3 bg-light border-top">
        <p className="mb-0">YC Codex</p>
      </footer>
    </>
  )
}