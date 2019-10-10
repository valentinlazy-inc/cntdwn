import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';

import { post } from './services/timer';

const useStyles = makeStyles(theme => ({
  padding: {
    padding: theme.spacing(2),
  },
}));

function Home() {
  const [url, setURL] = useState('');
  const [datetime, setDatetime] = useState(moment().add(5, 'minutes').toDate());
  const classes = useStyles();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { target: { elements } } = e;
    const data = Array.from(elements)
      .filter(e => e.name)
      .reduce((acc, element) =>
          ({ [element.name]: element.value, ...acc }),
        { datetime: datetime._isAMomentObject ? +datetime.format('x'): datetime.getTime() },
      );
    
    const timer = await post(data);
    const url = timer.url || `${window.location.protocol}//${window.location.host}/t/${timer.id}`;
    setURL(url);
  };
  
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Grid container component="form" onSubmit={handleSubmit} direction="column" justify="center" alignItems="center"
            spacing={0}>
        <Typography variant="h5" color="primary">
          You can create your own timer
        </Typography>
        
        <Grid item className={classes.padding}>
          <TextField
            fullWidth
            required
            variant="outlined"
            type="text"
            name="note"
            label="Note for a timer"
          />
        </Grid>
        <Grid item className={classes.padding}>
          <TextField
            fullWidth
            required
            variant="outlined"
            defaultValue="time is over"
            type="text"
            name="finish_message"
            label="Finish message"
          />
        </Grid>
        <Grid item className={classes.padding}>
          <DateTimePicker
            value={datetime}
            onChange={setDatetime}
            inputVariant="outlined"
            label="End time"
            disablePast
            name="datetime"
          />
        </Grid>
        <Grid item className={classes.padding}>
          <Button
            variant="outlined"
            disableRipple
            disableFocusRipple
            color="primary"
            fullWidth
            type="submit"
          >
            save
          </Button>
        </Grid>
        
        {url &&
        <Grid item className={classes.padding}>
          <Typography color="primary">
            your timer created. you can share it then. <br/>
            URL: <Link href={url}>{url}</Link>
          </Typography>
        </Grid>
        }
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

export default Home;
