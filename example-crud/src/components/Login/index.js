import React, { useEffect, useState } from "react";
import { Button, Form, Grid, Message, Segment } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import { getUserData, login } from "../../actions";
import Spinner from "../../helpers/Spinner";

const Login = () => {
  const history = useHistory();

  const [profile, setProfile] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUserData()
      .then(response => {
        setProfile(response);
        setLoading(false);
      })
      .catch(e => {
        console.log(e.message);
        setLoading(false);
        setProfile(false);
      });
  }, []);

  useEffect(() => {
    if (profile) {
      history.push("/users");
    }
  }, [history, profile]);

  const loginHandler = () => {
    login(email, password)
      .then(() => history.push("/users"))
      .catch(err => {
        setError(err.message);
      });
  };

  if (profile === false && loading === false) {
    return (
      <Grid>
        <Grid.Row columns={1}>
          <Grid.Column>
            <Segment textAlign={"center"}>User Login</Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{ marginTop: "20px" }} columns={3}>
          <Grid.Column />
          <Grid.Column>
            <Segment>
              {error && (
                <Message error>
                  <Message.Header>Error</Message.Header>
                  {error}
                </Message>
              )}
              <Form onSubmit={loginHandler}>
                <Form.Field>
                  <label>Email</label>
                  <input
                    type={"email"}
                    placeholder="Email"
                    onChange={e => setEmail(e.target.value)}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Password</label>
                  <input
                    type={"password"}
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                  />
                </Form.Field>
                <Form.Field>
                  <Link to={"/"}>Go to Home</Link>
                </Form.Field>
                <Button type="submit">Login</Button>
              </Form>
            </Segment>
          </Grid.Column>
          <Grid.Column />
        </Grid.Row>
      </Grid>
    );
  } else {
    return <Spinner />;
  }
};

export default Login;
