import React from 'react';

import ShareIcon from '@material-ui/icons/Share';

function ShareButton({ text, url, title = 'Timer' }) {
  return (
    <ShareIcon
      onClick={() => {
        navigator
          .share({
            title,
            text,
            url
          })
          .then(() => console.log('Successful share'))
          .catch(error => console.log('Error sharing', error));
      }}
    />
  );
}

export default ShareButton;
