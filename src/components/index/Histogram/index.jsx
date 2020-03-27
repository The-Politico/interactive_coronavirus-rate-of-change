import React from 'react';
import styles from './styles.scss';
import { max, format } from 'd3';

class Histogram extends React.Component {
  render () {
    const { data } = this.props;
    const w = 100 / data.length;
    const dmax = max(data.map(a => a.new));
    return (
      <div className={styles.component + ' class-name'}>
       {data.map((a, i) =>
         <div
          className='bar-container'
          key={`key-${i}`}
          style={{
            width: `${w}%`,
            borderTop: `${a.pastPeak ? 'none' : '1px solid #EF8B67'}`
          }}
        >
          <div
            className={`bar ${a.pastPeak}`}
            style={{
              height: `${100 * a.new / dmax}%`
            }}
          />
         </div>
       )}
       <p className='peak-nb'>{format(',')(dmax)}</p>
      </div>
    );
  }
}
export default Histogram;
