import React from "react";
import { Grid } from "semantic-ui-react";
import Loader from "react-loader-spinner";

export default ({ top, design, designSize }) => {
  return (
    <Grid verticalAlign="middle" columns={4} centered>
      <Grid.Row>
        <Grid.Column />
        <Grid.Column textAlign="center">
          <div style={{ minHeight: "100vh" }}>
            <div
              style={
                top
                  ? { position: "relative", top: top }
                  : { position: "relative", top: "45vh" }
              }
            >
              <Loader
                type={design ? design : "MutatingDots"}
                color="#000000"
                height={designSize ? designSize : 100}
                width={designSize ? designSize : 100}
              />
            </div>
          </div>
        </Grid.Column>
        <Grid.Column />
      </Grid.Row>
    </Grid>
  );
};
