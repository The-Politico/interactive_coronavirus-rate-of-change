import React, { Component } from 'react';
import Markdown from 'react-markdown/with-html';
import { Ad, Section, Share, Headline, Dek, Info } from '@politico/interactive-style';

import { pib as meta } from 'package.json';
import content from 'Content';

import 'Theme/base.scss';

import { processData } from './utils/processData';

import TableDouble from './TableDouble';
import TableRate from './TableRate';


class App extends React.Component {
  constructor(props){
    super(props);
    const processedData = processData();
    this.state = {
      data: processedData,
    }
  }

  render() {
    const { copy, timestamp } = this.props;
    const { data } = this.state;
    //console.log('hello???', data)

    return (
      <div>
        <Share subject={meta.pageName} shareTweet={content.meta.social.twitter.share_tweet} />
        <Section href={content.section.link}>{content.section.name}</Section>
        <Headline>{copy.Hed}</Headline>
        <Dek>{copy.Dek}</Dek>
        <Info {...meta} />

        <Markdown source={copy.Intro} className='body' linkTarget='_blank' />
        <TableDouble data={data.filter(a => !a.peaked)} />

        <TableDouble data={data.filter(a => a.peaked)} />

        <Ad.Dynamic />
        <TableRate data={data} />

        <Markdown source={copy.Methodology} className='methodology' linkTarget='_blank' />

      </div>
    );
  }
}

export default App;
