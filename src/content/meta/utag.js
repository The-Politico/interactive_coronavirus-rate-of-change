import { pib as meta } from 'package.json';

export default {
  activate: true,
  pageName: meta.pageName,
  appName: meta.pageName,
  siteSection: meta.siteSection,
  adUnitSection: meta.adUnitSection,
  contentTag: meta.contentTag,
  pageType: meta.pageType,
  pageSubType: meta.pageSubType,
  authors: meta.authors,
  "internal_site_id": meta.internal_site_id
};
