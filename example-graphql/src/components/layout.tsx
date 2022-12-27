import { Outlet, NavLink } from "react-router-dom"
import Footer from "./footer"

export default function Layout() {
  return (
    <main style={{display:'flex', height: '100vh', flexDirection: 'column'}}>
      <nav>
        <ul className="navigation-bar">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/locale">Locale</NavLink>
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