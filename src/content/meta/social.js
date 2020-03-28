import path from 'path';
import { pib as meta } from 'package.json';

export default {
  fbook: {
    card_title: 'Two better ways to chart the spread of COVID-19',
    card_description: 'No single metric can perfectly describe where the novel coronavirus has hit hardest. So we’re proposing two.',
  },
  twitter: {
    card_title: 'Two better ways to chart the spread of COVID-19',
    share_tweet: 'No single metric can perfectly describe where the novel coronavirus has hit hardest. So we’re proposing two.',
    card_description: 'No single metric can perfectly describe where the novel coronavirus has hit hardest. So we’re proposing two.',
  },
  image: {
    url: `https://www.politico.com/${path.join(meta.publishPath, 'media/share.jpg')}`,
    alt: '<Text>',
    type: 'image/jpeg',
    width: '600',
    height: '300',
  },
};
