import React from 'react';
import styles from './styles.scss';
import Histogram from './../Histogram';

class Table extends React.Component {
  render (){
    const { data } = this.props;
    function spread(d){
      const diff = Math.round(d.double - d.previous);
      if (diff === 0) { return 'No change' }
      else if (diff > 0) { return '+' + diff }
      else { return diff }
    }
    function spreadClass(d){
      return d.double > d.previous ? 'slower' : 'faster';
    }
    // const dmax = max(data.map(a => a.))
    return (
      <div className={styles.component + ' class-name'}>
        <table>
          <thead>
            <tr>
              <th className='country'> Country </th>
              <th className='double'> At current rate, time to <b>double</b> positive cases </th>
              <th className='spread'> Date of peak infection </th>
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
                <td className={`spread ${spreadClass(d)}`}>{spread(d)}</td>
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
