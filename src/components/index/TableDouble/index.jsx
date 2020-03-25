import React from 'react';
import styles from './styles.scss';
import { format } from 'd3';

class Table extends React.Component {
  render (){
    const { data } = this.props;
    function spread(d){
      const diff = Math.round(d.double - d.previous);
      if (diff === 0) { return 'No change' }
      else if (diff > 0) { return '+' + diff }
      else { return diff }
    }
    function spreadClass(d){
      return d.double > d.previous ? 'slower' : 'faster';
    }
    // const dmax = max(data.map(a => a.))
    return (
      <div className={styles.component + ' class-name'}>
        <table>
          <thead>
            <tr>
              <th className='country'> Country </th>
              <th className='double'> Days to <b>double</b> positive cases </th>
              <th className='spread'> Change since last week </th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i)=>
              <tr key={`key-${i}`}
                style={{ background: `rgba(204, 95, 68, ${2 / d.double})`}}
              >
                <td className='country'>{d.country}</td>
                <td className='double'>
                  <span>
                    {Math.round(d.double, 1)}
                  </span>
                  <div className='slope-container'>
                    <div className='slope'
                      style={
                        {
                          transform: `rotate(-${180 / d.double}deg)`,
                          width: `${20 / Math.cos(Math.PI / d.double)}px`
                        }
                      }
                    />
                  </div>
                </td>
                <td className={`spread ${spreadClass(d)}`}>{spread(d)}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
export default Table;
