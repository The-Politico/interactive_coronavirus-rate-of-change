import React from 'react';
import styles from './styles.scss';
import { format } from 'd3';

class Table extends React.Component {
  render (){
    const { data } = this.props;
    function spread(d){
      return d.double > d.previous ? 'slowing down' : 'speeding up';
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
              <th className='double'> Days to <b>double</b> positive cases </th>
              <th className='spread'> Infection Spread </th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i)=>
              <tr key={`key-${i}`}>
                <td className='country'>{d.country}</td>
                <td className='double'>
                  <span
                    style={{ background: `rgba(204, 95, 68, ${2 / d.double})`}}>
                    {Math.round(d.double, 1)}
                  </span>
                </td>
                <td className={`spread ${spreadClass(d)}`}>{spread(d)}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
export default Table;
