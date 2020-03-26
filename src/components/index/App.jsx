import React, { Component } from 'react';
import Markdown from 'react-markdown/with-html';
import { Ad, Section, Share, Headline, Dek, Info } from '@politico/interactive-style';

import { pib as meta } from 'package.json';
import content from 'Content';

import 'Theme/base.scss';

import { processData } from './utils/processData';

import TopPack from './TopPack';
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

        <TopPack
          title='Spread still growing'
          data={data.filter(a => !a.peaked).slice(0, 4)}
        />
        <TopPack
          title='Infection contained'
          data={data.filter(a => a.peaked).slice(0, 4)}
        />

        <h3 className='subhed'>{copy.ClimbingHed}</h3>
        <Markdown source={copy.ClimbingContent} className='body' linkTarget='_blank' />
        <TableDouble data={data.filter(a => !a.peaked)} />

        <h3 className='subhed'>{copy.PeakedHed}</h3>
        <Markdown source={copy.PeakedContent} className='body' linkTarget='_blank' />
        <TableDouble data={data.filter(a => a.peaked)} />

        <Ad.Dynamic />

        <h3 className='subhed'>{copy.NewHed}</h3>
        <Markdown source={copy.NewContent} className='body' linkTarget='_blank' />
        <TableRate data={data} />

        <Markdown source={copy.Methodology} className='methodology' linkTarget='_blank' />

      </div>
    );
  }
}

export default App;
