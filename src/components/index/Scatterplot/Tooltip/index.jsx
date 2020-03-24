import React from 'react';
import styles from './styles.scss';
import classnames from 'classnames';
import { format } from 'd3';

class Tooltip extends React.Component {
  render () {
    const d = this.props.data;
    console.log(d)
    return (
      <div className={classnames('Tooltip', styles.styles)}>
        <h3> {d.job} </h3>
        <table>
          <tr>
            <td className='metric-name'>Annual income: </td>
            <td className='metric-nb'>${format(',')(d.income)} </td>
          </tr>
          <tr>
            <td className='metric-name'>Physical proximity: </td>
            <td className='metric-nb'>{d.proximity}</td>
          </tr>
          <tr>
            <td className='metric-name'>Employment: </td>
            <td className='metric-nb'>{format(',')(d.population)}</td>
          </tr>
        </table>

      </div>
    );
  }
}
export default Tooltip;
