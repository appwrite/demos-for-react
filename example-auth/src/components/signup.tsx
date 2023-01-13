import { FormEvent, useState } from "react";
import { register } from "../appwrite";

export default function SignUp() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) {
      alert('Email is required.')
      return;
    }

    if (!password) {
      alert('Password is required.')
      return;
    }

    if (password.length < 8) {
      alert('Password must be at least 8 characters long.')
      return;
    }

    register(email, password).then((account) => alert(`Successfully created account with ID: ${account.$id}`))
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="email">
        Email
      </label>
      <input
        id="email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="password">
        Password
      </label>
      <input
        id="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Sign up</button>
    </form>
  )
}