import { Outlet, NavLink } from "react-router-dom";

export default function Layout() {
  return (
    <main style={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      <nav>
        <ul className="navigation-bar">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/locale">Locale</NavLink>
          </li>
          <li>
            <NavLink to="/databases">Databases</NavLink>
          </li>
        </ul>
      </nav>

      <section className="content">
        <Outlet />
      </section>
    </main>
  );
}
