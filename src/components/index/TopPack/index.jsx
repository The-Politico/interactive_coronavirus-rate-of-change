import React from 'react';
import styles from './styles.scss';
import Histogram from './Histogram';

class TopPack extends React.Component {
  render () {
    const { title, data } = this.props;
    return (
      <div className={styles.component + ' class-name'}>
        <h5> { title } </h5>
        <div className='pack-container'>
        {
          data.map((a, i) =>
            <div className='pack' key={`key-${i}`}>
              <h4> {a.country} </h4>
              <Histogram data={a.dates} key={`key-${i}`} />
              <div className='labels'>
                <p className='label first'> First 100 cases </p>
                <p className='label last'> Today </p>
              </div>
            </div>
          )
        }
        </div>
      </div>
    );
  }
}
export default TopPack;
