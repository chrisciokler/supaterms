import { Footer } from './Footer'
import { Header } from './Header'


export function AppStack({
  children,
  footer = true
}: {
  children: React.ReactNode,
  footer?: boolean
}) {

  return (
    <>
      <Header />
      {children}
      {footer && <Footer />}
    </>
  )
}
