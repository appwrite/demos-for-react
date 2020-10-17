import React, {Fragment} from "react";
import "./App.css";
import YourInfo from "./components/YourInfo";
import Header from "./components/Header";

function App() {
  return (
    <Fragment>
      <div className="App">
        <Header />
        <YourInfo />
      </div>
    </Fragment>
  );
}

export default App;
