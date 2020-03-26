import React from 'react';
import TableRow from './TableRow';
import styles from './styles.scss';

class Table extends React.Component {
  render (){
    const { data } = this.props;
    data.sort((a, b) => b.people - a.people);


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
              <th className='counter'> Cases since you've been reading </th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i)=>
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
export default Table;
