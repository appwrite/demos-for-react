import { Outlet, Link } from "react-router-dom"
import appwriteLogo from "../../public/appwrite.svg"
import Footer from "./footer"

export default function Layout() {
  return (
    <main>
      <nav>
        <ul className="navigation-bar">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/countries">Countries</Link>
          </li>
          <li>
            <Link to="/eu-countries">EU Countries</Link>
          </li>
          <li>
            <Link to="/phone-codes">Phone Codes</Link>
          </li>
          <li>
            <Link to="/continents">Continents</Link>
          </li>
          <li>
            <Link to="/currencies">Currencies</Link>
          </li>
          <li>
            <Link to="/languages">Languages</Link>
          </li>
        </ul>
      </nav>

      <div className="appwrite-logo">
        <img src={appwriteLogo} alt="Appwrite's logo" />
      </div>

      <section className="content">
        <Outlet />
      </section>

      <Footer />
    </main >
  )
}