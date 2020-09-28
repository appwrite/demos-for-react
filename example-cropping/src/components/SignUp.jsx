import React, { useState } from 'react';
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
   form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));


function SignUp(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const classes = useStyles();
  async function signUp(e) {
    e.preventDefault()
    if (loading) return;


    setError(false)
    setLoading(true)

    if (!(password.length >= 6 && password.length <= 32)) {

      setError('Error: Password must be between 6 and 32 characters.')
      setLoading(true)

      return;
    }
    try {

      await props.appwrite.account.create(
        email,
        password
      );
      props.setCurrentPage(props.currentPage)

    } catch (err) {
      setError(err.message)

    }
    setLoading(false)
  }




  return (
    <Container component="main" maxWidth="xs"  style={{ display: props.currentPage ? "none" : "block" }}>
    <CssBaseline />
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      
      {error && (
           <Alert severity="error">{error}</Alert>
    )}
      <form className={classes.form} noValidate onSubmit={(e) => signUp(e)}>
        <TextField
        onChange={(event) => setEmail(event.target.value)} 
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
        onChange={(event) => setPassword(event.target.value)}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
       
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={loading}
        >
          Sign Up
        </Button>
        <Grid container>
          
          <Grid item>
            <Link href="#" variant="body2" onClick={()=>props.setCurrentPage(props.currentPage)}>
              {"have an account? Login"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  </Container>
  )

};

export { SignUp };