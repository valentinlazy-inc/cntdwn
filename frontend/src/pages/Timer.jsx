import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown-now';
import { useParams } from 'react-router-dom';

import Loading from '../components/Loading/Loading';
import TimerComponent from '../components/Timer/Timer';
import withFirebase from '../HOC/withFirebase/withFirebase';
import { subscribeToTimer } from '../services/pushes';
import { get } from '../services/timer';

function Timer({ firebase }) {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    async function load() {
      const timer = await get(id);
      setData(timer);
      if (timer.datetime < Date.now()) {
        setCompleted(true);
      }
    }

    const saveToken = async () => {
      const token = await firebase.askForPermissionToReceiveNotifications();
      await subscribeToTimer(token, id);
    };
    try {
      load();
      saveToken();
    } catch (err) {
      console.error(err);
    }
  }, [id, firebase]);

  if (!data) {
    return (
      <Grid container justify="center">
        <Loading />
      </Grid>
    );
  }

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      direction="column"
      spacing={4}
    >
      <Typography component="p">{data.note}</Typography>
      {completed && (
        <Typography component="p" color="error">
          {data.finish_message}
        </Typography>
      )}
      <Countdown
        date={new Date(data.datetime)}
        onComplete={() => setCompleted(true)}
        renderer={TimerComponent}
      />
    </Grid>
  );
}

export default withFirebase(Timer);
