import React, {useState, useEffect} from 'react';
import classnames from 'classnames';
import { styles } from './styles.scss';
const CounterItem = (props) => {
  const { country, people } = props.data;
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
    <div className={classnames('CounterItem', styles)}>
      { country }: <span>{counter}</span>
    </div>
  );
}
export default CounterItem;
