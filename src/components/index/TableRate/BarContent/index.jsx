import React from 'react';
import styles from './styles.scss';
class BarContent extends React.Component {
  render () {
    const { d } = this.props;
    const sec = (24 * 3600) / d.people;
    return (
      <div className={styles.component + ' class-name'}>
        <div
          className='bar bar-container'
        />
        <div
          className='bar'
          style={{ animationDuration: `${sec}s`}}
        />
      </div>
    );
  }
}
export default BarContent;
