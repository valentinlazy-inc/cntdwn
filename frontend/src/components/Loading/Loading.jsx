import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';

import './loading.css';

const useStyles = makeStyles(theme => ({
  root: {
    height: 200,
    maxWidth: '25em',
    borderRadius: 3,
    background: theme.palette.background.default,
    fill: 'none',
    stroke: theme.palette.action.active,
    strokeLinecap: 'round',
    strokeWidth: '8%',
    '& use': {
      stroke: theme.palette.primary.main,
      animation: '$a 2s linear infinite',
    },
  },
  '@keyframes a': {
    to: {
      strokeDashoffset: 0,
    },
  },
}));

function Loading() {
  const classes = useStyles();

  return (
    <svg className={classes.root} viewBox="-2000 -1000 4000 2000">
      <path id="inf" d="M354-354A500 500 0 1 1 354 354L-354-354A500 500 0 1 0-354 354z" />
      <use xlinkHref="#inf" strokeDasharray="1570 5143" strokeDashoffset="6713px" />
    </svg>
  )
}

export default Loading;

