import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const copyURL = 'https://dy1ht16ivl5br.cloudfront.net/interactives/apps/kitchensink/17BywYWZeIoI/data.json';

fetch(copyURL)
  .then(d => d.json())
  .then(copy => {
        ReactDOM.render(
          <App
            copy={copy.content}
            timestamp={copy.meta}
          />, // eslint-disable-line react/jsx-filename-extension
          document.getElementById('story')
        );
      });
