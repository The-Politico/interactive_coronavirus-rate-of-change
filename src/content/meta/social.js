import path from 'path';
import { pib as meta } from 'package.json';

export default {
  fbook: {
    card_title: '',
    card_description: '',
  },
  twitter: {
    card_title: '',
    share_tweet: '',
    card_description: '',
  },
  image: {
    url: `https://www.politico.com/${path.join(meta.publishPath, 'media/share.jpg')}`,
    alt: '<Text>',
    type: 'image/jpeg',
    width: '600',
    height: '300',
  },
};
