import React from 'react';
import styles from './styles.scss';

import { format, max } from 'd3';

class Table extends React.Component {
  render () {
    const { data } = this.props;
    data.sort((a, b) => b.population - a.population);
    const dmax = max(data.map(a => a.population));
    console.log('danger-zone', data)
    return (
      <div className={styles.component + ' class-name'}>
        <table>
          <thead>
            <tr>
              <th className='occupation'> Occupation </th>
              <th className='income'> Income </th>
              <th className='proximity'> Proximity </th>
              <th className='population'> Employment </th>
              <th />
            </tr>
          </thead>
          <tbody>
            { data.map((d, i) =>
              <tr>
                <td className='occupation'>{d.job}</td>
                <td className='income'>${format(',')(d.income)}</td>
                <td
                  className={`proximity bin-${d.bin}`}
                > 
                  {d.proximity}
                </td>
                <td className='population'>{format(',')(d.population)}</td>
                <td className='bars'>
                  <div
                      className={`bar population bin-${d.bin}`}
                      style={{ width: `${d.population * 100 / dmax}%`}}
                    />
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
