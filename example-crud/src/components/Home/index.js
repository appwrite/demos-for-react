import React, { useEffect, useState } from "react";
import { Button, Grid, Segment } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import { getUserData, logout } from "../../actions";
import Spinner from "../../helpers/Spinner";

const Home = () => {
  const history = useHistory();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserData()
      .then(response => {
        setProfile(response);
        setLoading(false);
      })
      .catch(e => {
        console.log(e.message);
        setProfile(false);
        setLoading(false);
      });
  }, []);

  const common = (
    <Segment textAlign={"center"}>
      <h2>
        Welcome to CRUD w/ <a href="https://appwrite.io/">Appwrite</a> Tutorial
      </h2>
    </Segment>
  );

  if (profile && loading === false) {
    console.log(profile);
    return (
      <div>
        {common}
        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column />
            <Grid.Column>
              <Segment>
                <Grid verticalAlign={"middle"}>
                  <Grid.Row columns={2}>
                    <Grid.Column computer={12} textAlign={"left"}>
                      <h3>
                        Go to <Link to={"/users"}>User Dashboard</Link>
                      </h3>
                    </Grid.Column>
                    <Grid.Column computer={4}>
                      <Button
                        floated={"right"}
                        primary
                        onClick={() => logout(history)}
                      >
                        Logout
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Grid.Column>
            <Grid.Column />
          </Grid.Row>
        </Grid>
      </div>
    );
  } else if (profile === false && loading === false) {
    return (
      <div>
        {common}
        <Segment textAlign={"center"}>
          To start please <Link to={"/login"}>Login</Link>
        </Segment>
      </div>
    );
  } else {
    return <Spinner />;
  }
};

export default Home;
