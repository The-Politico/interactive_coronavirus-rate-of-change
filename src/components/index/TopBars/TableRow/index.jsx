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
  const { data } = props;
  const { country, people} = data;

  const percentIncrement = .025;
  const milliseconds = (24 * 3600 * 1000) / people;
  const barIncrementTime = milliseconds * percentIncrement;

  const [counter, incrementCounter] = useState(0);
  const [width, changeWidth] = useState(0);

  useEffect(() => {
    const barIncrementInterval = setInterval(() => {
      changeWidth(width => {
        if (width === 100) {
          incrementCounter(counter + 1);
          return 0;
        } else {
          return width + (percentIncrement * 100);
        }
      });
    }, barIncrementTime);

    return () => {
      clearInterval(barIncrementInterval);
    }
  }, [counter]);

  return (
    <tr className={styles}>
      <td className='country'>{country}</td>
      <td className='new-case'>{getTime(people)}</td>
      <td className='bars'>
        <BarContent width={width} />
      </td>
      <td className='counter'>{counter}</td>
    </tr>
  )
};
export default TableRow;
