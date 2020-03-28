import React, { useState, useEffect } from 'react';
import styles from './styles.scss';
const BarContent = (props) => {
  const { width } = props;

  return (
    <div className={styles.component + ' class-name'}>
      <div
        className='bar-container'
      >
        <div
          className='bar'
          style={{
            width: `${width}%`
          }}
        />
      </div>
    </div>
  );

}
export default BarContent;
