import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
