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
    const key = div.appendSelect('div', 'map-key')
          .html(`<p><span class='bin-1'></span> Workers who are economically more stable </p>
          <p><span class='bin-3'></span> Workers in economic danger</p>`)

    const frameW = 1000;
    const width = div._groups[0][0].offsetWidth;
    const w = width > frameW ? frameW : width;
    const p = w > 600 ? 40 : 20;
    const h = w > 600 ? w * .8 : w * 1.4;
    const m = w > 600 ? 70 : 90;

    const svg = div.appendSelect('svg')
      .attr('width', w)
      .attr('height', h)

    const proximityExtent = d3.extent(data.map(a => a.proximity))
    const incomeMax = d3.max(data.map(a => a.income))

    const xScale = d3.scaleLinear()
      .domain(proximityExtent)
      .range([p * 2, w - p])

    const xAxis = d3.axisBottom(xScale)
      .tickSizeInner(-h + 2 * p)
      .ticks(w > 600 ? 10 : 5);

    const yScale = d3.scaleLinear()
      .domain([0, incomeMax])
      .range([h - p, p])

    const yAxis = d3.axisLeft(yScale)
      .tickFormat(a => '$' + d3.format('.2s')(a))
      .tickSizeInner(-w + 3 * p)
      .ticks(10)

    svg.appendSelect('g', 'axis x-axis')
      .attr('transform', `translate(${0}, ${h-p})`)
      .call(xAxis)

    svg.appendSelect('g', 'axis y-axis')
      .attr('transform', `translate(${p * 2}, ${0})`)
      .call(yAxis)

    // Add labels
    svg.appendSelect('text', 'label y')
      .attr('x', p)
      .attr('y', 10)
      .text('Annual median wage')

    svg.appendSelect('text', 'label x1')
      .attr('x', 2 * p)
      .attr('y', w > 600 ? h - 10 : h + 5)
      .text("Low amounts of contact")

    svg.appendSelect('text', 'label x2')
      .attr('x', w - p)
      .attr('y', w > 600 ? h - 10 : h + 5)
      .text("High contact")

    // Append circles and data
    const jobs = svg.selectAll('circle.data-point')
      .data(data)

    jobs
      .enter()
      .append('circle')
      .attr('class', d => `data-point id-${d.id} bin-${d.bin} annotated-${d.annotate}`)
      .merge(jobs)
      .attr('cx', d => xScale(d.proximity))
      .attr('cy', d => yScale(d.income))
      .attr('r', d => Math.sqrt(d.population) / m)

    const titleShadow = svg.selectAll('text.shadow')
      .data(data.filter(a => a.annotate))

    titleShadow
      .enter()
      .append('text')
      .attr('class', d => `data-point shadow id-${d.id} bin-${d.bin}`)
      .merge(titleShadow)
      .attr('x', d => xScale(d.proximity))
      .attr('y', d => yScale(d.income) - Math.sqrt(d.population) / m - 5)
      .text(d => d.job.split(', ')[0])
      .call(wrap, w > 600 ? 100 : 80)

    const titles = svg.selectAll('text.top-layer')
      .data(data.filter(a => a.annotate))

    titles
      .enter()
      .append('text')
      .attr('class', d => `top-layer data-point id-${d.id} bin-${d.bin}`)
      .merge(titles)
      .attr('x', d => xScale(d.proximity))
      .attr('y', d => yScale(d.income) - Math.sqrt(d.population) / m - 5)
      .text(d => d.job.split(', ')[0])
      .call(wrap, w > 600 ? 100 : 80)


    svg.selectAll('circle.data-point').on('mousemove', d => {
       ReactDOM.render(
         <Tooltip data={d} />,
         tooltip.node()
       );

       const coordinates = d3.mouse(node);
       const xPos = coordinates[0];
       const yPos = coordinates[1];
       const tooltipWidth = tooltip.node().offsetWidth;
       const tooltipHeight = tooltip.node().offsetHeight;

       const xStyle = xPos > (w * 0.50) ?
         `left:${xPos - tooltipWidth - 15}px;` : `left:${xPos + 15}px;`;
       const yStyle = yPos > (h * 0.55) ?
         `top:${(yPos - tooltipHeight - 15)}px;` : `top:${yPos + 15}px;`;

       tooltip.attr('style', `${xStyle}${yStyle}`)
         .classed('visible', true);

        svg.selectAll('circle.id-' + d.id)
          .classed('selected', true)
       // Show data
     }).on('mouseleave', () => {
       tooltip.classed('visible', false);

       svg.selectAll('circle')
         .classed('selected', false)
     });


    return this;
  }
}

export default Chart;
