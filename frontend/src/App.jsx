import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Home';
import Timer from './Timer';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/timer/:id" exact>
          <Timer />
        </Route>
        <Route path="/" exact>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
