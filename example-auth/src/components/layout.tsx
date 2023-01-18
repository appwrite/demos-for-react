import { Outlet, Link } from "react-router-dom"
import appwriteLogo from "../assets/appwrite.svg"

export default function Layout() {
  return (
    <main>
      <nav>
        <ul className="navigation-bar">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Log In</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
      </nav>

      <div className="appwrite-logo">
        <img src={appwriteLogo} alt="Appwrite's logo" />
      </div>

      <section className="content">
        <Outlet />
      </section>
    </main >
  )
}