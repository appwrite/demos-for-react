import React, { useState } from 'react';

function SignUp(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);



  async function processSignUp(event) {
    event.preventDefault()

    if (loading) return;


    setError(false)
    setLoading(true)

    if (!(password.length >= 6 && password.length <= 32)) {

      setError('Error: Password must be between 6 and 32 characters.')
      setLoading(true)

      return;
    }

    await props.signUpFunc(email, password);


    setLoading(false)
  }


  return (
    <div style={{ display: props.currentPage ? "none" : "block" }} >

      <h1>Sign Up</h1>
      {props.error().type === "signUp" && (
        <p className='error'>{props.error().message}</p>
      )}
      <form onSubmit={(e) => processSignUp(e)}>
        <input onChange={(event) => setEmail(event.target.value)} type='email' id='email' required placeholder='Email' />
        <input onChange={(event) => setPassword(event.target.value)} type='password' id='password' required placeholder='Password' />
        <button disabled={loading} type='submit'>Sign Up</button>
      </form>
    </div>
  )

};

export { SignUp };