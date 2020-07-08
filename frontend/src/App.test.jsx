import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { FirebaseContext } from './services/firebase';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <FirebaseContext.Provider value={{ analytics: jest.fn() }}>
      <App />
    </FirebaseContext.Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
