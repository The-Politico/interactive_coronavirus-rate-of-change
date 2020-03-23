import { pib as meta } from 'package.json';
import seo from './seo';
import social from './social';
import utag from './utag';

export default {
  title: meta.pageName,
  publishPath: meta.publishPath,
  opinion: meta.opinion,
  site: meta.site,

  utag,
  seo,
  social,
};
