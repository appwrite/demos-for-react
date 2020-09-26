import React,{useState} from 'react';

function Login(props) {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(false);
      
   

  async function processLogin (event) {
    event.preventDefault() // Prevent default to prevent reloading of page.

    if (loading) return; // If loading then return.

    
setError(false)
setLoading(true)
    // Validation
    if (!(password.length >= 6 && password.length <= 32)) {
      // If validation incorrect then set error and then set loading to false
      setError('Error: Password must be between 6 and 32 characters.')
setLoading(true)
      
      return;
    }

    await props.loginFunc(email, password); // Request login

    // If success then set loading to false
    setLoading(false)
  }

    
    return (
      <div>
        <h1>Login</h1>
        {error && (
          <p className='error'>{error}</p>
        )}
        <form onSubmit={(e) => processLogin(e)}>
          <input onChange={(event) => setEmail(event.target.value)} type='email' id='email' required placeholder='Email' />
          <input onChange={(event) => setPassword(event.target.value)} type='password' id='password' required placeholder='Password' />
          <button disabled={loading} type='submit'>Sign In</button>
        </form>
      </div>
    )
  
};

export { Login };