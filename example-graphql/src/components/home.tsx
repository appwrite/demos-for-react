import appwriteLogo from "../../public/appwrite.svg"

export default function Home() {
  return (
    <>
      <div className="appwrite-logo">
        <img src={appwriteLogo} alt="Appwrite's logo" />
      </div>
      <div className="info">
        Welcome
      </div>
    </>
  )
}