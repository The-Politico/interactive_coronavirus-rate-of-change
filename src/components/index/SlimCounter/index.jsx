import React from 'react';
import classnames from 'classnames';
import { styles } from './styles.scss';
import CounterItem from './CounterItem';


const SlimCounter = (props) => {
  const { data } = props;

  if (!data) {
    return null;
  }

  data.sort((a, b) => b.people - a.people);
  const dataToUse = [data[0], data[1], data[2]];

  return (
    <div className={classnames('SlimCounter', styles)}>
      <div className='content'>
        <div className='label desktop'>Estimated cases since you began reading:</div>
        <div className='label mobile'>Cases since reading:</div>
        {
          dataToUse.map((d) => (
            <CounterItem key={d.country} data={d} />
          ))
        }
      </div>
    </div>
  );
}
export default SlimCounter;
