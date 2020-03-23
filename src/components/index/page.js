import React from 'react';

/* import components */
import {
  Ad,
  Container,
  Dek,
  Footer,
  Head,
  Headline,
  Info,
  Navigation,
  Section,
  Share,
  SkipNav,
  SkipToMainContent
} from '@politico/interactive-style';

/* import content */
import { pib as meta } from 'package.json';
import content from 'Content';
import Copy from 'Content/copy.md';

/* import styles */
import 'Theme/base.scss';

const Page = (props) => {
  return (
    <div className='story'>
      <Head {...content.meta} />
      <SkipNav />
      <Navigation />
      <Ad.Dynamic type='leaderboard' />
      <Share subject={meta.pageName} tweet={meta.pageName} />
      <Section href={content.section.link}>{content.section.name}</Section>
      <Headline>{content.headline}</Headline>
      <Dek>{content.dek}</Dek>
      <Info {...meta} />

      <SkipToMainContent />
      <Container>
        <Copy />
        <Ad.Dynamic />
        <Copy />
      </Container>
      <Footer />
    </div>
  );
};

export default Page;

export { Helmet } from 'react-helmet';
