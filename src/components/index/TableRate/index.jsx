import React, {useState} from 'react';
import TableRow from './TableRow';
import styles from './styles.scss';

const Table = (props) => {
  const { data } = props;
  data.sort((a, b) => b.people - a.people);
  const [tableHide, toggleTable] = useState(true);
  const hiddenClass = tableHide ? 'hidden' : '';
  const buttonText = tableHide ? 'Show all states' : 'Hide states';

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
              data={d}
              hiddenClass={i >= 10 ? hiddenClass : ''}
            />
          )}
        </tbody>
      </table>
      <button className='tableToggle' onClick={() => toggleTable(!tableHide)}>{buttonText}</button>
    </div>
  );
}

export default Table;
