import { Outlet, Link } from "react-router-dom"
import Footer from "./footer"

export default function Layout() {
  return (
    <main style={{display:'flex', height: '100vh', flexDirection: 'column'}}>
      <nav>
        <ul className="navigation-bar">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/locale">Locale</Link>
          </li>
        </ul>
      </nav>

      <section className="content">
        <Outlet />
      </section>

      <Footer />
    </main >
  )
}