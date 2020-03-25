import React from 'react';
import styles from './styles.scss';
import BarContent from './BarContent';
import { format } from 'd3';

class Table extends React.Component {
  render (){
    const { data } = this.props;
    // const dmax = max(data.map(a => a.))
    return (
      <div className={styles.component + ' class-name'}>
        <table>
          <thead>
            <tr>
              <th className='country'> Country </th>
              <th className='double'> Days to <b>double</b> positive cases </th>
              <th className='people'> New positive cases per day </th>
              <th className='bar' />
            </tr>
          </thead>
          <tbody>
            {data.map((d, i)=>
              <tr key={`key-${i}`}>
                <td className='country'>{d.country}</td>
                <td className='double'>{Math.round(d.double, 1)}</td>
                <td className='people'>{format(',')(Math.round(d.people))}</td>
                <td className='bars'>
                  <BarContent d={d} />
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
