import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const copyURL = 'https://dy1ht16ivl5br.cloudfront.net/interactives/apps/kitchensink/17BywYWZeIoI/data.json';
const dataURL = 'https://dy1ht16ivl5br.cloudfront.net/interactives/2020/covid-tracking-data/global-jhu.json';
fetch(copyURL)
  .then(d => d.json())
  .then(copy => {
    fetch(dataURL)
      .then(d => d.json())
      .then(data => {
          ReactDOM.render(
          <App
            data={data.data}
            copy={copy.content}
            timestamp={data.meta.fields[data.meta.fields.length - 1]}
          />, // eslint-disable-line react/jsx-filename-extension
          document.getElementById('story')
        );
      });
    });
