import React from 'react';
import styles from './styles.scss';
class BarContent extends React.Component {
  render () {
    const { d } = this.props;
    const sec = (24 * 3600) / d.people;
    return (
      <div className={styles.component + ' class-name'}>
        <div
          className='bar'
          style={{ animationDuration: `${sec}s`}}
        />
        <p className='note'>
          One person tests positive every <b>{Math.round(sec)}</b> seconds.
        </p>
      </div>
    );
  }
}
export default BarContent;
