import React from 'react';
import { zeroPad } from 'react-countdown-now';

import './timer.css';

function TimerPiece({ title, amount, withoutZero = false }) {
  return (
    <div>
      <span>{withoutZero ? amount : zeroPad(amount, 2)}</span>
      <span className="help-title">{title}</span>
    </div>
  );
}

function Timer({ days, hours, minutes, seconds }) {
  return (
    <div className="timer">
      <TimerPiece amount={days} title="days" withoutZero />
      <TimerPiece title="hours" amount={hours} />
      <TimerPiece title="minutes" amount={minutes} />
      <TimerPiece title="seconds" amount={seconds} />
    </div>
  );
}

export default Timer;
