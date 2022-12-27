import { Outlet, Link } from "react-router-dom"
import appwriteLogo from "../../../public/appwrite.svg"

export default function LocaleLayout() {
  return (
    <section style={{width: '100%'}}>
      <nav className="locale-nav">
        <ul className="navigation-bar">
          <li>
            <Link to="/locale/countries">Countries</Link>
          </li>
          <li>
            <Link to="/locale/eu-countries">EU Countries</Link>
          </li>
          <li>
            <Link to="/locale/phone-codes">Phone Codes</Link>
          </li>
          <li>
            <Link to="/locale/continents">Continents</Link>
          </li>
          <li>
            <Link to="/locale/currencies">Currencies</Link>
          </li>
          <li>
            <Link to="/locale/languages">Languages</Link>
          </li>
        </ul>
      </nav>

      <section className="content" style={{position:'relative'}}>
        <Outlet />
      </section>
    </section >
  )
}