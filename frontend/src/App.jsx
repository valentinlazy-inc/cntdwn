import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import SwitchControl from '@material-ui/core/Switch';
import CssBaseline from '@material-ui/core/CssBaseline';

import withFirebase from './HOC/withFirebase/withFirebase';

import Home from './Home';
import Timer from './Timer';

import { blackTheme, whiteTheme } from './themes';

function App({ firebase }) {
  useEffect(() => {
    firebase.analytics();
  }, []);

  const [theme, setTheme] = useState(blackTheme);

  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <Grid container style={{ minHeight: '100vh' }} alignItems="baseline">
          <CssBaseline />
          <Grid container justify="flex-end" alignItems="center">
            <Typography color="primary">
              {theme === whiteTheme ? 'black' : 'white'}
            </Typography>
            <SwitchControl
              onChange={() =>
                setTheme(theme === whiteTheme ? blackTheme : whiteTheme)
              }
            />
          </Grid>
          <Switch>
            <Route path="/t/:id" exact>
              <Timer />
            </Route>
            <Route path="/" exact>
              <Home />
            </Route>
          </Switch>
        </Grid>
      </MuiThemeProvider>
    </Router>
  );
}

export default withFirebase(App);
