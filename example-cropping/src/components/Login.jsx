import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Account } from 'appwrite';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  async function login(e) {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    try {
      setError(false);
      const account = new Account(props.appwrite)
      await account.createEmailSession(email, password);
      props.getUserData();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  const classes = useStyles();

  return (
    <Container
      component="main"
      maxWidth="xs"
      // eslint-disable-next-line react/destructuring-assignment
      style={{ display: props.currentPage ? 'block' : 'none' }}
    >
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}
        <form className={classes.form} noValidate onSubmit={(e) => login(e)}>
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
            Login
          </Button>
          <Grid container>
            <Grid item>
              <Button variant="body2" onClick={() => props.setCurrentPage(props.currentPage)}>
                Don&apos;t have an account? Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
