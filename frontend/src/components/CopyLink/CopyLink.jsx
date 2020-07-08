import React, { useCallback } from 'react';

import Link from '@material-ui/core/Link';

function CopyLink({ url }) {
  const handleClick = useCallback(
    e => {
      e.preventDefault();
      try {
        const el = document.createElement('input');
        el.value = url;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      } catch (err) {
        console.error(err);
      }
      window.location.href = url;
    },
    [url]
  );

  return (
    <Link href={url} onClick={handleClick}>
      {url}
    </Link>
  );
}

export default CopyLink;
