import React from 'react';

import { FirebaseContext } from '../../services/firebase';

export default function withFirebase(C) {
  return function (props) {
    return (
      <FirebaseContext.Consumer>
        {firebase => <C firebase={firebase} {...props} />}
      </FirebaseContext.Consumer>
    );
  }
}
