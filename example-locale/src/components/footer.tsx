import packageJson from "../../package.json"

export default function Footer() {
  return (
    <footer>
      <p>Example built by</p>
      <a href="https://alexpatterson.dev" target="_blank" rel="noreferrer">
        Alex Patterson
      </a>
      <p>on top of Appwrite SDK {packageJson.dependencies.appwrite}</p>
    </footer>
  )
}