import React from 'react';
import styles from './styles.scss';
import Histogram from './../Histogram';
import { timeFormat } from 'd3';
class Table extends React.Component {
  render (){
    const { data, label } = this.props;
    // const dmax = max(data.map(a => a.))
    return (
      <div className={styles.component + ' class-name'}>
        <table>
          <thead>
            <tr>
              <th className='country'> Country </th>
              <th className='double'> At current rate, time to <b>double</b> positive cases </th>
              <th className='spread'> { label }</th>
              <th className='histogram'> New infections per day </th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i)=>
              <tr key={`key-${i}`} >
                <td className='country'>{d.country}</td>
                <td className='double'>
                    {Math.round(d.double, 1)} days
                </td>
                <td className='spread'>{timeFormat('%b %d')(new Date(d.peak))}</td>
                <td className='histogram'>
                  <Histogram data={d.dates} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
export default Table;
