import { Models } from "appwrite";
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { getUserData, logout } from "../appwrite";

export default function Home() {
  const navigate = useNavigate()
  const [user, setUser] = useState<Models.Account<Models.Preferences>>()

  useEffect(() => {
    getUserData()
      .then((account) => setUser(account))
      .catch((error) => navigate('/login'))
  }, [])

  const handleLogOut = () => logout().then(() => navigate('/login'))

  if (!user) return <p>You aren't logged in.</p>

  return (
    <div>
      <p>Logged in as {user.email}</p>
      <button onClick={handleLogOut}>Log out</button>
    </div>
  )
}