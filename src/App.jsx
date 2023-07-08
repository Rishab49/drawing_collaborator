import { Route } from "wouter";
import Connection from "./pages/connection";
import Paint from "./pages/paint";

const App = () => {
  return (
    <>
      <Route path="/" component={Connection} />
      <Route path="/draw/:roomID" component={Paint} />
    </>
  );
};

export default App;
