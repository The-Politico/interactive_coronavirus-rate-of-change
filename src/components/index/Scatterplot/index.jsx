import React from 'react';
import debounce from 'lodash/debounce';
import Chart from './drawForce.js';
import styles from './styles.scss';

class ForceChart extends React.Component {
  chartContainer = React.createRef()
  chart = new Chart()

  componentDidMount() {
    this.chart
      .data(this.props.data)
      .selection(this.chartContainer.current);
    // .draw();

    setTimeout(() => this.chart.draw(), 250);

    // Add a listener to resize chart with the window
    window.addEventListener('resize', debounce(() => this.chart.draw(), 250));
  }

  componentDidUpdate() {
    // Update the chart with the component
    this.chart
      .data(this.props.data)
      .draw();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', debounce(this.chart.draw(), 250));
  }

  render() {
    return (
      <div id='chart' ref={this.chartContainer} className={styles.component}>
        
      </div>
    );
  }
}
export default ForceChart;
