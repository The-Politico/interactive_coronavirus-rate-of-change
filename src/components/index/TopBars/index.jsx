import React from 'react';
import TableRow from './TableRow';
import styles from './styles.scss';

class TopBars extends React.Component {
  render (){
    const { data } = this.props;
    data.sort((a, b) => b.people - a.people);
    const dataToUse = [data[0], data[1], data[2]];

    // const dmax = max(data.map(a => a.))
    return (
      <div className={styles.component + ' class-name'}>
        <table>
          <thead>
            <tr>
              <th className='country'></th>
              <th className='new-case'>One person tests positive every... </th>
              <th className='bar' />
              <th className='counter'> Cases since you've been reading </th>
            </tr>
          </thead>
          <tbody>
            {dataToUse.map((d, i)=>
              <TableRow
                key={d.country}
                data = {d}
              />
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
export default TopBars;
