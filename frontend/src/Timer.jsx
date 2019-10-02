import React, { useEffect, useState } from 'react';
import Countdown, { zeroPad } from 'react-countdown-now';
import { useParams } from 'react-router-dom';

import Loading from './components/Loading/Loading';
import './timer.css';
import { get } from './services/timer';

function Timer() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  
  useEffect(() => {
    async function load() {
      const timer = await get(id);
      setData(timer);
    }
    load();
  }, []);
  
  if (!data) {
    return <div className="content"><Loading /></div>;
  }
  
  return (
    <div className="content">
      <p>{data.note}</p>
      <Countdown
        date={new Date(`${data.date} ${data.time}`)}
        renderer={({ days, hours, minutes, seconds }) => (
          <div className="timer">
            <div>
              <span>
                {days}
              </span>
              <span className="help-title">days</span>
            </div>
            <div>
              <span>
                {zeroPad(hours, 2)}
              </span>
              <span className="help-title">hours</span>
            </div>
            <div>
              <span>
                {zeroPad(minutes, 2)}
              </span>
              <span className="help-title">minutes</span>
            </div>
            <div>
              <span>
                {zeroPad(seconds, 2)}
              </span>
              <span className="help-title">seconds</span>
            </div>
          </div>
        )}
      />
    </div>
  );
}

export default Timer;
