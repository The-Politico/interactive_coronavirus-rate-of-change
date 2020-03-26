import React from 'react';
import styles from './styles.scss';
import { max } from 'd3';

class Histogram extends React.Component {
  render () {
    const { data } = this.props;
    const w = 100 / data.length;
    const dmax = max(data.map(a => a.new));
    console.log(data)
    return (
      <div className={styles.component + ' class-name'}>
       {data.map((a, i) =>
         <div
          className='bar-container'
          key={`key-${i}`}
          style={{ width: `${w}%`}}
        >
          <div
            className={`bar ${a.direction}`}
            style={{
              height: `${100 * a.new / dmax}%`
            }}
          />
         </div>
       )}
      </div>
    );
  }
}
export default Histogram;