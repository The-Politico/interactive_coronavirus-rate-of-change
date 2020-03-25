import React from 'react';
import styles from './styles.scss';
import BarContent from './BarContent';
import { format } from 'd3';

class Table extends React.Component {
  render (){
    const { data } = this.props;
    data.sort((a, b) => b.people - a.people);
    function getTime(d){
      const totalSec = (24 * 3600) / d.people;
      const min = Math.floor(totalSec / 60);
      const sec = Math.round(totalSec) % 60;
      const minLabel = min === 0 ? '' : min + 'm';
      const secLabel = sec + 's';
      return minLabel + ' ' + secLabel;
    }

    // const dmax = max(data.map(a => a.))
    return (
      <div className={styles.component + ' class-name'}>
        <table>
          <thead>
            <tr>
              <th className='country'> Country </th>
              <th className='people'> New positive cases per day </th>
              <th className='new-case'> +1 case every... </th>
              <th className='bar' />
            </tr>
          </thead>
          <tbody>
            {data.map((d, i)=>
              <tr key={`key-${i}`}>
                <td className='country'>{d.country}</td>
                <td className='people'>{format(',')(Math.round(d.people))}</td>
                <td className='new-case'>{getTime(d)}</td>
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
