import { Outlet, NavLink } from "react-router-dom";

export default function LocaleLayout() {
  return (
    <section style={{ width: "100%" }}>
      <nav className="locale-nav">
        <ul className="navigation-bar">
          <li>
            <NavLink to="/locale/countries">Countries</NavLink>
          </li>
          <li>
            <NavLink to="/locale/eu-countries">EU Countries</NavLink>
          </li>
          <li>
            <NavLink to="/locale/phone-codes">Phone Codes</NavLink>
          </li>
          <li>
            <NavLink to="/locale/continents">Continents</NavLink>
          </li>
          <li>
            <NavLink to="/locale/currencies">Currencies</NavLink>
          </li>
          <li>
            <NavLink to="/locale/languages">Languages</NavLink>
          </li>
          <li>
            <NavLink to="/locale/all">All</NavLink>
          </li>
        </ul>
      </nav>

      <section className="content" style={{ position: "relative" }}>
        <Outlet />
      </section>
    </section>
  );
}
