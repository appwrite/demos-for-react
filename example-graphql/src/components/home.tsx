import appwriteLogo from "../../public/appwrite.svg"

export default function Home() {
  return (
    <>
      <a className="appwrite-logo" href="https://appwrite.io/" target="_blank" rel="noreferrer noopener">
        <img src={appwriteLogo} alt="Appwrite's logo" />
      </a>
      <div className="info">
        Welcome
      </div>
    </>
  )
}