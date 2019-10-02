import React, { useState } from 'react';
import './Home.css';
import { post } from './services/timer';

function Home() {
  const [ url, setURL ] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { target: { elements } } = e;
    const data = Array.from(elements)
      .reduce((acc, element) =>
          ({ ...acc, [element.name]: element.value }),
        {},
      );
  
    const timer = await post(data);
    setURL(`${window.location.protocol}//${window.location.host}/timer/${timer.id}`);
  };

  return (
    <div className="Home">
      <header className="Home-header">
        <p>
          You can create your own timer
        </p>
        <form onSubmit={handleSubmit}>
          <input required type="text" name="note" placeholder="note for a timer" />
  
          <div className="Home-time">
            <input required type="date" name="date" />
            <input required type="time" name="time" />
          </div>
          <button type="submit">save</button>
        </form>
        {url &&
        <div>
          your timer created. you can share it then. URL:
          <a href={url}>{url}</a>
        </div>
        }
      </header>
    </div>
  );
}

export default Home;
