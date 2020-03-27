import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { styles } from './styles.scss'
import { format } from 'd3';
import BarContent from './BarContent';

function getTime(people){
  const totalSec = (24 * 3600) / people;
  const min = Math.floor(totalSec / 60);
  const sec = Math.round(totalSec) % 60;
  const minLabel = min === 0 ? '' : min + 'm';
  const secLabel = sec + 's';
  return minLabel + ' ' + secLabel;
}

const TableRow = (props) => {
  const { data, hiddenClass } = props;
  const { country, people} = data;
  const milliseconds = (24 * 3600 * 1000) / people;
  const [counter, incrementCounter] = useState(0);

  useEffect(() => {
    const incrementInterval = setInterval(() => {
      incrementCounter(counter + 1);
    }, milliseconds);

    return () => {
      clearInterval(incrementInterval);
    }
  });

  return (
    <tr className={styles + ' ' + hiddenClass}>
      <td className='country'>{country}</td>
      <td className='people'>{format(',')(Math.round(people))}</td>
      <td className='new-case'>{getTime(people)}</td>
      <td className='bars'>
        <BarContent people={people} />
      </td>
      <td className='counter'>{counter}</td>
    </tr>
  )
};
export default TableRow;
