import { BaseChart, d3 } from '@politico/graphics-kit';
import ReactDOM from 'react-dom';
import Tooltip from './Tooltip';
import { wrap } from './../utils/wrap.js';

class Chart extends BaseChart {
  draw() {
    const data = this.data();
    const node = this.selection().node();
    // console.log('national', data)
    const div = this.selection().appendSelect('div', 'container');
    const tooltip = div.appendSelect('div', 'tooltip');
    // const key = div.appendSelect('div', 'map-key')
    //       .html(`<p><span class='bin-1'></span> Workers who are economically more stable </p>
    //       <p><span class='bin-3'></span> Workers in economic danger</p>`)

    const frameW = 1000;
    const width = div._groups[0][0].offsetWidth;
    const w = width > frameW ? frameW : width;
    const p = w > 600 ? 40 : 20;
    const h = w > 600 ? w * .7 : w;
    const m = w > 600 ? 70 : 90;

    const svg = div.appendSelect('svg')
      .attr('width', w)
      .attr('height', h)

    const maxVel = d3.max(data.map(a => a.maxVel))

    const xScale = d3.scaleLinear()
      .domain([-10, 10])
      .range([p, w - p])

    const xAxis = d3.axisBottom(xScale)
      .tickSizeInner(-h + 2 * p)
      .ticks(w > 600 ? 10 : 5);

    const height = h - p;
    const yScale = d3.scaleLinear()
      .domain([0, maxVel / 4, maxVel / 2, maxVel])
      .range([h - p, h - p - height/3, h - p - height * 2 / 3, p])

    const yAxis = d3.axisLeft(yScale)
      //.tickFormat(a => '$' + d3.format('.2s')(a))
      .tickSizeInner(-w + 2 * p)
      .ticks(10)

    svg.appendSelect('g', 'axis x-axis')
      .attr('transform', `translate(${0}, ${h-p})`)
      .call(xAxis)

    svg.appendSelect('g', 'axis y-axis')
      .attr('transform', `translate(${p }, ${0})`)
      .call(yAxis)

    const line = d3.line()
      .x(d => xScale(d.acc))
      .y(d => yScale(d.velocity))

    data.forEach((d, i) => {
      svg.appendSelect('path', `country key-${i} ${d.country}`)
        .datum(d.dates)
        .attr('d', line)
    })

    // Add labels
    div.appendSelect('div', 'label y')
      .html(`<p> Percent increase in positive cases </p>`)

    div.appendSelect('div', 'label x1')
      .html(`<p> Effectively controlling spread </p>`)

    div.appendSelect('div', 'label x2')
      .html(`<p> Uncontained spread </p>`)



    // svg.selectAll('circle.data-point').on('mousemove', d => {
    //    ReactDOM.render(
    //      <Tooltip data={d} />,
    //      tooltip.node()
    //    );
    //
    //    const coordinates = d3.mouse(node);
    //    const xPos = coordinates[0];
    //    const yPos = coordinates[1];
    //    const tooltipWidth = tooltip.node().offsetWidth;
    //    const tooltipHeight = tooltip.node().offsetHeight;
    //
    //    const xStyle = xPos > (w * 0.50) ?
    //      `left:${xPos - tooltipWidth - 15}px;` : `left:${xPos + 15}px;`;
    //    const yStyle = yPos > (h * 0.55) ?
    //      `top:${(yPos - tooltipHeight - 15)}px;` : `top:${yPos + 15}px;`;
    //
    //    tooltip.attr('style', `${xStyle}${yStyle}`)
    //      .classed('visible', true);
    //
    //     svg.selectAll('circle.id-' + d.id)
    //       .classed('selected', true)
    //    // Show data
    //  }).on('mouseleave', () => {
    //    tooltip.classed('visible', false);
    //
    //    svg.selectAll('circle')
    //      .classed('selected', false)
    //  });
    //

    return this;
  }
}

export default Chart;
